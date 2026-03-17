/**
 * IntroText — Centered text paragraph section for Les Balcons pages.
 *
 * Usage:
 * ```tsx
 * import IntroText from '@/components/sections/IntroText';
 *
 * <IntroText text="Niché dans les hauteurs de Baie-Saint-Paul, Les Balcons vous accueille..." />
 *
 * // With custom className
 * <IntroText
 *   text="Découvrez notre auberge unique en son genre."
 *   className="bg-[var(--color-green-light)]"
 * />
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface IntroTextProps {
  /** The paragraph text to display. */
  text: string;
  /** Optional extra classes applied to the outer section element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IntroText({ text, className = "" }: IntroTextProps) {
  return (
    <section
      className={[
        // Vertical padding: 64px top/bottom on both mobile and desktop
        "py-16",
        // Horizontal padding: 16px mobile, 96px desktop
        "px-4 desktop:px-24",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p
        className={[
          "mx-auto max-w-[900px]",
          "font-[family-name:var(--font-body)]",
          "text-[length:var(--text-body-md)]",
          "text-[var(--color-charcoal)]",
          "leading-[1.5]",
          "text-center",
        ].join(" ")}
      >
        {text}
      </p>
    </section>
  );
}
