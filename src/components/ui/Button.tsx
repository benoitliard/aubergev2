import React from "react";

export type ButtonVariant = "primary" | "outline" | "secondary" | "cta";
export type ButtonSize = "default" | "small";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-charcoal)]",
    "text-[var(--color-beige-100)]",
    "border-2 border-[var(--color-charcoal)]",
    "hover:opacity-80",
  ].join(" "),

  outline: [
    "bg-transparent",
    "text-[var(--color-charcoal)]",
    "border-2 border-[var(--color-charcoal)]",
    "hover:bg-[var(--color-charcoal)]",
    "hover:text-[var(--color-beige-100)]",
  ].join(" "),

  secondary: [
    "bg-transparent",
    "text-[var(--color-charcoal)]",
    "border-2 border-transparent",
    "underline underline-offset-4",
    "hover:opacity-70",
  ].join(" "),

  cta: [
    "bg-[var(--color-green-dark)]",
    "text-[var(--color-beige-100)]",
    "border-2 border-[var(--color-green-dark)]",
    "hover:brightness-90",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-8 py-4 text-[length:var(--text-body-sm)]",
  small: "px-5 py-2.5 text-[length:var(--text-body-xs)]",
};

const baseStyles = [
  "inline-flex items-center justify-center gap-2",
  "rounded-full",
  "font-[family-name:var(--font-title)] font-extrabold",
  "transition-all duration-200",
  "cursor-pointer select-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
  "disabled:opacity-40 disabled:pointer-events-none",
].join(" ");

export function Button({
  variant = "primary",
  size = "default",
  children,
  href,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        onClick={disabled ? undefined : (onClick as React.MouseEventHandler<HTMLAnchorElement>)}
        className={classes}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
