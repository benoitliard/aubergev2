/**
 * Hero — Full-width hero section for the Les Balcons homepage.
 *
 * Usage:
 * ```tsx
 * import Hero from '@/components/sections/Hero';
 *
 * // Minimal (background image required)
 * <Hero backgroundImage="/images/hero.jpg" />
 *
 * // With all props
 * <Hero
 *   backgroundImage="/images/hero.jpg"
 *   title="LES BALCONS"
 *   subtitle="Auberge & Bistro culturel"
 *   tagline="Votre escapade culturelle à Baie-Saint-Paul, Charlevoix depuis 2017"
 *   ctaLabel="Disponibilités et tarifs →"
 *   ctaHref="/reservations"
 * />
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HeroProps {
  /** URL of the background image. Required. */
  backgroundImage: string;
  /** Main heading. Defaults to "LES BALCONS". */
  title?: string;
  /** Sub-heading displayed below the title. */
  subtitle?: string;
  /** Short tagline displayed below the subtitle. */
  tagline?: string;
  /** Label for the CTA link. */
  ctaLabel?: string;
  /** href for the CTA link. */
  ctaHref?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_TITLE = "LES BALCONS";
const DEFAULT_SUBTITLE = "Auberge & Bistro culturel";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Hero({
  backgroundImage,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  tagline,
  ctaLabel,
  ctaHref,
}: HeroProps) {
  return (
    <section
      aria-label={title}
      className={[
        "relative w-full overflow-hidden",
        // Height: ~500px mobile, ~850px desktop
        "h-[500px] desktop:h-[850px]",
        // Ensure text sits above the overlay
        "flex items-center justify-center",
      ].join(" ")}
    >
      {/* Background image */}
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark gradient overlay: transparent at top → black/50 at bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      />

      {/* Content */}
      <div
        className={[
          "relative z-10 flex flex-col items-center gap-4 text-center",
          // Horizontal padding: 16px mobile, 96px desktop
          "px-4 desktop:px-24",
        ].join(" ")}
      >
        {/* H1 — "LES BALCONS" */}
        <h1
          className={[
            "font-[family-name:var(--font-title)] font-extrabold",
            "text-[var(--color-beige-100)]",
            "tracking-tight leading-none",
            // Responsive: 48px mobile → 128px desktop
            "text-5xl desktop:text-[length:var(--text-h1)]",
          ].join(" ")}
        >
          {title}
        </h1>

        {/* Subtitle — styled as a large heading */}
        {subtitle && (
          <p
            className={[
              "font-[family-name:var(--font-title)] font-extrabold",
              "text-[var(--color-beige-100)]",
              "leading-tight",
              // Responsive: 24px mobile → 40px desktop (--text-h5)
              "text-2xl desktop:text-[length:var(--text-h5)]",
            ].join(" ")}
          >
            {subtitle}
          </p>
        )}

        {/* Tagline */}
        {tagline && (
          <p
            className={[
              "font-[family-name:var(--font-body)]",
              "text-[var(--color-beige-100)]",
              "text-[length:var(--text-body-sm)] desktop:text-[length:var(--text-body-md)]",
              "mt-1",
            ].join(" ")}
          >
            {tagline}
          </p>
        )}

        {/* CTA link */}
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className={[
              "mt-2",
              "font-[family-name:var(--font-body)]",
              "text-[var(--color-beige-100)]",
              "text-[length:var(--text-body-sm)] desktop:text-[length:var(--text-body-md)]",
              "underline underline-offset-4",
              "transition-opacity duration-200 hover:opacity-75",
              "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-beige-100)]",
            ].join(" ")}
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
