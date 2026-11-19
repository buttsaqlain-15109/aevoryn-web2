"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
      title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
      className={`relative inline-flex items-center h-9 w-18 p-1 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent ${
        isDark
          ? "bg-[#101A28] border border-[#28394E] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.7),inset_-2px_-2px_4px_rgba(40,58,80,0.3)]"
          : "bg-[#EAEFF5] border border-[#CBD5E1] shadow-[inset_2px_2px_4px_rgba(18,61,112,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]"
      } ${className}`}
    >
      {/* Sliding Tactile Knob */}
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300 transform ${
          isDark
            ? "translate-x-9 bg-gradient-to-br from-[#2876BD] to-[#123D70] text-white shadow-[0_2px_8px_rgba(40,118,189,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]"
            : "translate-x-0 bg-gradient-to-br from-[#FFFFFF] to-[#F1F5F9] text-[#123D70] shadow-[0_2px_6px_rgba(18,61,112,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]"
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-blue-200" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </span>

      {/* Background Icons */}
      <span className="absolute left-2 text-amber-500/70 pointer-events-none">
        <Sun className="w-3.5 h-3.5" />
      </span>
      <span className="absolute right-2 text-blue-300/60 pointer-events-none">
        <Moon className="w-3.5 h-3.5" />
      </span>
    </button>
  );
}
