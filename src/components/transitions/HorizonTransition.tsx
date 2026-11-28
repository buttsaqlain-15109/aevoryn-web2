"use client";

import React, { useEffect, useRef, useState } from "react";

interface HorizonTransitionProps {
  onProgress?: (progress: number) => void;
  children?: React.ReactNode;
}

export function HorizonTransition({ onProgress, children }: HorizonTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When top of container approaches bottom of viewport -> progress begins
      // When container is centered in viewport -> progress reaches 1
      const totalDistance = windowHeight * 1.2;
      const currentScroll = windowHeight - rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalDistance));

      // Ease progress using cubic bezier approximation
      const eased = rawProgress * rawProgress * (3 - 2 * rawProgress);
      setProgress(eased);
      if (onProgress) onProgress(eased);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onProgress]);

  // Interpolated horizon values based on scroll offset
  const arcScaleY = 0.2 + progress * 0.8;
  const glowOpacity = Math.min(1, progress * 1.5);
  const translateY = (1 - progress) * 80;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{ minHeight: "220px", marginTop: "-60px" }}
      aria-hidden="true"
    >
      {/* Planetary Curved Horizon Atmosphere */}
      <div
        className="relative w-full flex items-center justify-center transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(0, ${translateY}px, 0)`,
          opacity: glowOpacity,
        }}
      >
        {/* Deep Curved Horizon SVG */}
        <svg
          viewBox="0 0 1440 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto min-w-[1000px] overflow-visible"
          style={{
            transform: `scaleY(${arcScaleY})`,
            transformOrigin: "bottom center",
          }}
        >
          <defs>
            {/* Multi-stage cobalt planetary glow */}
            <radialGradient
              id="planetaryGlow"
              cx="50%"
              cy="100%"
              r="70%"
              fx="50%"
              fy="100%"
            >
              <stop offset="0%" stopColor="#2F63FF" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#123D70" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#123D70" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#2F63FF" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="horizonLineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2F63FF" stopOpacity="0" />
              <stop offset="30%" stopColor="#2F63FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#6896FF" stopOpacity="1" />
              <stop offset="70%" stopColor="#2F63FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2F63FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Diffuse Atmospheric Glow fill under arc */}
          <path
            d="M -100 260 Q 720 20 1540 260 L 1540 260 L -100 260 Z"
            fill="url(#planetaryGlow)"
          />

          {/* Sharp High-Precision Planetary Horizon Arc */}
          <path
            d="M -100 260 Q 720 20 1540 260"
            stroke="url(#horizonLineGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {children}
    </div>
  );
}
