import React from "react";

export type ArrowDirection = "left" | "right";
export type ArrowButtonState = "default" | "hover" | "disabled";

export interface ArrowButtonProps {
  direction?: ArrowDirection;
  state?: ArrowButtonState;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

interface ArrowIconProps {
  state: ArrowButtonState;
}

function ArrowIcon({ state }: ArrowIconProps) {
  const strokeColor =
    state === "disabled"
      ? "var(--color-charcoal)"
      : state === "hover"
        ? "var(--color-charcoal)"
        : "var(--color-beige-100)";

  const opacity = state === "disabled" ? 0.4 : 1;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stateStyles: Record<ArrowButtonState, string> = {
  default: "bg-[var(--color-charcoal)] border-2 border-[var(--color-charcoal)]",
  hover: "bg-transparent border-2 border-[var(--color-charcoal)]",
  disabled: "bg-[var(--color-charcoal)]/10 border-2 border-transparent",
};

export function ArrowButton({
  direction = "right",
  state = "default",
  onClick,
  className = "",
}: ArrowButtonProps) {
  const isDisabled = state === "disabled";

  const classes = [
    "inline-flex items-center justify-center",
    "w-16 h-16 rounded-full",
    "transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
    stateStyles[state],
    isDisabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const arrowTransform = direction === "left" ? "rotate(180deg)" : undefined;

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={classes}
      aria-label={direction === "left" ? "Previous" : "Next"}
      aria-disabled={isDisabled}
    >
      <span
        style={{ display: "inline-flex", transform: arrowTransform }}
        aria-hidden="true"
      >
        <ArrowIcon state={state} />
      </span>
    </button>
  );
}

export default ArrowButton;
