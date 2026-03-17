/**
 * TestimonialCard — Single testimonial card with category pill.
 *
 * Usage:
 * ```tsx
 * <TestimonialCard
 *   category={{ label: "L'Auberge", color: "var(--color-yellow-500)" }}
 *   text="C'est un endroit fantastique!"
 *   author="Françoise L."
 * />
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TestimonialCategory {
  label: string;
  /** CSS color value, e.g. "var(--color-yellow-500)" */
  color: string;
}

export interface TestimonialCardProps {
  /** Category pill displayed at the top of the card. */
  category: TestimonialCategory;
  /** Testimonial quote text. */
  text: string;
  /** Author name. */
  author: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TestimonialCard({
  category,
  text,
  author,
  className = "",
}: TestimonialCardProps) {
  return (
    <article
      aria-label={`Témoignage de ${author}`}
      className={[
        "flex h-full flex-col gap-4 rounded-[32px] bg-white p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Category pill */}
      <span
        className={[
          "inline-flex w-fit items-center justify-center",
          "rounded-full px-4 py-4",
          "font-[family-name:var(--font-title)] font-extrabold",
          "text-[length:var(--text-body-md)] leading-[1.5]",
          "text-[var(--color-charcoal)]",
        ].join(" ")}
        style={{ backgroundColor: category.color }}
      >
        {category.label}
      </span>

      {/* Quote + author */}
      <blockquote className="m-0 flex flex-1 flex-col gap-4 p-6">
        <p
          className={[
            "font-[family-name:var(--font-body)]",
            "text-[length:var(--text-body-lg)] leading-[1.5]",
            "text-[var(--color-charcoal)]",
          ].join(" ")}
        >
          {text}
        </p>
        <footer>
          <cite
            className={[
              "not-italic",
              "font-[family-name:var(--font-body)] font-extrabold",
              "text-[length:var(--text-body-lg)] leading-[1.5]",
              "text-[var(--color-charcoal)]",
            ].join(" ")}
          >
            {author}
          </cite>
        </footer>
      </blockquote>
    </article>
  );
}

export default TestimonialCard;
