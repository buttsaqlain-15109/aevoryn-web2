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
      className={`inline-flex items-center justify-center gap-2 h-12 px-3.5 rounded-xl border border-hairline bg-surface hover:border-cobalt-accent text-primary transition-all duration-200 font-body text-[13px] font-medium shadow-sm hover:shadow-subtle ${className}`}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-blue-400 flex-shrink-0" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
      )}
      <span className="font-semibold text-xs tracking-wider">
        {isDark ? "NIGHT" : "DAY"}
      </span>
    </button>
  );
}
