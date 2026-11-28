"use client";

import React, { useEffect, useRef, useState } from "react";
import { generateGlobePoints, getRiyadhCoordinates, GlobePoint } from "@/lib/globe-engine";
import { useTheme } from "@/context/ThemeContext";

interface GlobeCanvasProps {
  className?: string;
  size?: number;
}

export function GlobeCanvas({ className = "", size = 560 }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [points, setPoints] = useState<GlobePoint[]>([]);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.0035, y: 0 });
  const rotationRef = useRef({ x: -0.32, y: 0.8 }); // Initial tilt and view oriented toward Arabia
  const isVisibleRef = useRef(true);

  // Generate points on mount
  useEffect(() => {
    setPoints(generateGlobePoints(2900));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Setup intersection observer to pause loop when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let animationFrameId: number;
    let pulseProgress = 0;
    const riyadhBase = getRiyadhCoordinates();

    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Handle continuous rotation
      if (!isDraggingRef.current && !prefersReducedMotion) {
        rotationRef.current.y += velocityRef.current.x;
        rotationRef.current.x += velocityRef.current.y;
        // Dampen any drag inertia towards standard base speed
        velocityRef.current.x += (0.0035 - velocityRef.current.x) * 0.04;
        velocityRef.current.y *= 0.95;
      }

      // Smooth pulse for Riyadh beacon
      pulseProgress = (pulseProgress + 0.02) % 1;

      // Handle Canvas Sizing with capped DPR
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width || size;
      const height = rect.height || size;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const globeRadius = Math.min(width, height) * 0.44;

      // Rotations
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      // 1. Atmospheric edge glow / rim lighting
      const rimGradient = ctx.createRadialGradient(
        cx,
        cy,
        globeRadius * 0.88,
        cx,
        cy,
        globeRadius * 1.06
      );
      if (isDark) {
        rimGradient.addColorStop(0, "rgba(47, 99, 255, 0)");
        rimGradient.addColorStop(0.85, "rgba(47, 99, 255, 0.18)");
        rimGradient.addColorStop(1, "rgba(47, 99, 255, 0)");
      } else {
        rimGradient.addColorStop(0, "rgba(18, 61, 112, 0)");
        rimGradient.addColorStop(0.85, "rgba(47, 99, 255, 0.12)");
        rimGradient.addColorStop(1, "rgba(47, 99, 255, 0)");
      }
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.06, 0, Math.PI * 2);
      ctx.fillStyle = rimGradient;
      ctx.fill();

      // Subtle globe horizon outline
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(47, 99, 255, 0.22)" : "rgba(217, 219, 224, 0.8)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Render 3D Dotted Matrix
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Rotate Y (Longitude)
        const x1 = pt.x * cosY + pt.z * sinY;
        const z1 = -pt.x * sinY + pt.z * cosY;

        // Rotate X (Latitude/Tilt)
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        // 3D Projection to Screen Space
        const screenX = cx + x1 * globeRadius;
        const screenY = cy - y2 * globeRadius;

        // Depth perspective
        const depth = z2; // -1 to 1

        if (depth > -0.2) {
          // Front hemisphere
          const alpha = Math.max(0.08, (depth + 0.2) / 1.2);
          const dotRadius = pt.isLand ? pt.size * (0.8 + 0.4 * depth) : pt.size * 0.7;

          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0.5, dotRadius), 0, Math.PI * 2);

          if (pt.isLand) {
            ctx.fillStyle = isDark
              ? `rgba(75, 135, 255, ${alpha * 0.95})`
              : `rgba(18, 61, 112, ${alpha * 0.85})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(75, 135, 255, ${alpha * 0.15})`
              : `rgba(180, 190, 205, ${alpha * 0.25})`;
          }
          ctx.fill();
        } else {
          // Back hemisphere (subtle faint dots for spherical translucency)
          if (pt.isLand) {
            const backAlpha = Math.max(0.03, (depth + 1) * 0.08);
            ctx.beginPath();
            ctx.arc(screenX, screenY, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(47, 99, 255, ${backAlpha})`
              : `rgba(160, 175, 195, ${backAlpha})`;
            ctx.fill();
          }
        }
      }

      // 3. Render Riyadh Primary Geographic Marker
      const rx1 = riyadhBase.x * cosY + riyadhBase.z * sinY;
      const rz1 = -riyadhBase.x * sinY + riyadhBase.z * cosY;
      const ry2 = riyadhBase.y * cosX - rz1 * sinX;
      const rz2 = riyadhBase.y * sinX + rz1 * cosX;

      if (rz2 > -0.05) {
        // Riyadh is visible on front hemisphere
        const riyadhScreenX = cx + rx1 * globeRadius;
        const riyadhScreenY = cy - ry2 * globeRadius;
        const markerAlpha = Math.max(0.3, (rz2 + 0.05) / 1.05);

        // Expanding pulse ring
        ctx.beginPath();
        ctx.arc(riyadhScreenX, riyadhScreenY, 4 + pulseProgress * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(47, 99, 255, ${(1 - pulseProgress) * markerAlpha * 0.9})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Solid beacon center
        ctx.beginPath();
        ctx.arc(riyadhScreenX, riyadhScreenY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#2F63FF";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(riyadhScreenX, riyadhScreenY, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        // Technical callout leader line & HUD Pill
        const lineEndX = riyadhScreenX + 42;
        const lineEndY = riyadhScreenY - 32;

        ctx.beginPath();
        ctx.moveTo(riyadhScreenX, riyadhScreenY);
        ctx.lineTo(riyadhScreenX + 16, lineEndY);
        ctx.lineTo(lineEndX + 70, lineEndY);
        ctx.strokeStyle = `rgba(47, 99, 255, ${markerAlpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Callout text
        ctx.font = '500 10px var(--font-jetbrains-mono), monospace';
        ctx.fillStyle = isDark ? `rgba(244, 245, 248, ${markerAlpha})` : `rgba(17, 17, 17, ${markerAlpha})`;
        ctx.fillText("SAUDI ARABIA • OPERATIONS", riyadhScreenX + 20, lineEndY - 6);
        ctx.font = '400 9px var(--font-jetbrains-mono), monospace';
        ctx.fillStyle = `rgba(47, 99, 255, ${markerAlpha * 0.9})`;
        ctx.fillText("24.71° N, 46.68° E", riyadhScreenX + 20, lineEndY + 12);
      }

      ctx.restore();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [points, isDark, size]);

  // Mouse & Touch Drag Interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    rotationRef.current.y += deltaX * 0.005;
    rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x + deltaY * 0.005));

    velocityRef.current = {
      x: deltaX * 0.0015,
      y: deltaY * 0.001,
    };

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMousePosRef.current.x;
    const deltaY = e.touches[0].clientY - lastMousePosRef.current.y;

    rotationRef.current.y += deltaX * 0.006;
    rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x + deltaY * 0.006));

    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ width: "100%", maxWidth: `${size}px`, aspectRatio: "1 / 1" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="img"
      aria-label="Interactive 3D Dotted Earth Globe featuring Riyadh Headquarters coordinates"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
