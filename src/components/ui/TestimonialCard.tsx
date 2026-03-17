import React from "react";

export interface TestimonialCardProps {
  text: string;
  author: string;
  source?: string;
  className?: string;
}

export function TestimonialCard({
  text,
  author,
  source,
  className = "",
}: TestimonialCardProps) {
  const classes = [
    "relative",
    "bg-white",
    "rounded-2xl",
    "p-8",
    "shadow-sm",
    "border border-[var(--color-beige-100)]",
    "border-l-4 border-l-[var(--color-green-dark)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes} aria-label={`Témoignage de ${author}`}>
      <blockquote className="m-0">
        <p
          className="text-[length:var(--text-body-sm)] font-normal text-[var(--color-charcoal)] leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          &laquo;&nbsp;{text}&nbsp;&raquo;
        </p>
        <footer>
          <cite className="not-italic">
            <span
              className="block text-[length:var(--text-body-sm)] font-extrabold text-[var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-title)" }}
            >
              {author}
            </span>
            {source && (
              <span
                className="block text-[14px] text-[var(--color-charcoal)]/60 mt-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {source}
              </span>
            )}
          </cite>
        </footer>
      </blockquote>
    </article>
  );
}

export default TestimonialCard;
