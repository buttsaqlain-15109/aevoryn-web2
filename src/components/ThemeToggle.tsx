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
      className={`inline-flex items-center justify-center gap-1.5 h-9 w-9 sm:w-auto px-0 sm:px-3 rounded-lg border border-hairline bg-surface hover:border-cobalt-accent text-primary transition-all duration-200 font-body text-xs font-semibold shadow-1 hover:shadow-2 flex-shrink-0 cursor-pointer ${className}`}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-blue-400 flex-shrink-0" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
      )}
      <span className="hidden sm:inline text-[11px] font-bold tracking-wider">
        {isDark ? "NIGHT" : "DAY"}
      </span>
    </button>
  );
}
