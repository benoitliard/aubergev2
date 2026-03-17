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
        "px-4 py-12 desktop:p-24",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p
        className={[
          "mx-auto max-w-[1102px]",
          "font-[family-name:var(--font-body)] font-semibold",
          "text-[length:var(--text-body-lg)] desktop:text-[length:var(--text-body-xl)]",
          "text-[var(--color-charcoal)]",
          "leading-[1.3]",
          "text-center",
        ].join(" ")}
      >
        {text}
      </p>
    </section>
  );
}
