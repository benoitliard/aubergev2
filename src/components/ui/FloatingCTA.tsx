import React from "react";

export interface FloatingCTAProps {
  label?: string;
  href: string;
  className?: string;
}

export function FloatingCTA({
  label = "Je réserve",
  href,
  className = "",
}: FloatingCTAProps) {
  const classes = [
    // Position
    "fixed bottom-8 right-14",
    // Shape & size
    "inline-flex items-center justify-center",
    "rounded-full",
    "px-8 py-8",
    // Colors
    "bg-[var(--color-yellow-500)]",
    "text-[var(--color-charcoal)]",
    // Typography
    "font-[family-name:var(--font-title)] font-extrabold",
    "text-[length:var(--text-body-sm)]",
    // Elevation
    "shadow-xl",
    "z-50",
    // Interaction
    "transition-all duration-200",
    "hover:scale-105 hover:brightness-105",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
    // Mobile: full width fixed at bottom on very small screens
    "max-sm:left-4 max-sm:right-4 max-sm:bottom-4 max-sm:rounded-full max-sm:px-6 max-sm:py-5",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      className={classes}
      aria-label={label}
    >
      {label}
    </a>
  );
}

export default FloatingCTA;
