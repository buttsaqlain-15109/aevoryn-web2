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
      className={`relative inline-flex items-center justify-between h-9 px-2.5 rounded-sm border border-hairline bg-surface hover:border-cobalt-accent transition-colors duration-200 text-xs font-mono-tech ${className}`}
    >
      <div className="flex items-center gap-2">
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-blue-400" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
        <span className="label-tech text-[10px] text-primary">
          {isDark ? "NIGHT" : "DAY"}
        </span>
      </div>
    </button>
  );
}
