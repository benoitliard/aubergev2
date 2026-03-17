/**
 * Hero — Homepage hero section for Les Balcons.
 *
 * Green background with display title, subtitle, description, Beds24 booking
 * widget, and a hero photo revealed through a decorative double-arch mask
 * (same silhouette as the brand mascot).
 *
 * Usage:
 * ```tsx
 * import Hero from '@/components/sections/Hero';
 *
 * <Hero heroImage="/images/hero.jpg" />
 * <Hero heroImage="/images/hero.jpg" bookingUrl="https://beds24.com/..." />
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HeroProps {
  /** URL of the hero photo shown through the arch mask. */
  heroImage: string;
  /** Alt text for the hero image. */
  heroImageAlt?: string;
  /** Beds24 iframe booking widget URL. When omitted the widget is hidden. */
  bookingUrl?: string;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/**
 * SVG overlay that creates a green frame with mascot-shaped arch cutouts.
 * The photo underneath shows through the transparent arch openings.
 * Uses fill-rule="evenodd" so the inner mascot path acts as a hole.
 */
function ArchMask() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 -4 160.501 88"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        fill="var(--color-green-dark, #056131)"
        d={[
          // Outer rectangle (green frame)
          "M0 -4 h160.501 v88 h-160.501 z",
          // Inner mascot silhouette (cutout)
          "M160.439 40.002C160.996 29.5907 157.327 18.9884 149.419 11.0805",
          "C134.645 -3.69349 110.47 -3.69349 95.6963 11.0805",
          "L80.1893 26.5875",
          "L64.9444 11.3426",
          "C50.6191 -2.98045 27.493 -3.86231 12.4325 9.68328",
          "C5.31757 16.0807 1.23924 24.5306 0.170783 33.2848",
          "H0.164119V33.3403",
          "C-0.133538 35.7993 0.0486102 64.5098 0.130799 75.6408",
          "C0.148569 78.0598 2.11443 80.0102 4.53567 80.0102",
          "H156.096",
          "C158.528 80.0102 160.501 78.0376 160.501 75.6075",
          "V40.0065H160.441L160.439 40.002Z",
        ].join(" ")}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Hero({
  heroImage,
  heroImageAlt = "L'Auberge Les Balcons à Baie-Saint-Paul",
  bookingUrl,
}: HeroProps) {
  return (
    <section aria-label="Les Balcons" className="w-full bg-[var(--color-green-dark)]">
      {/* ── Text content ───────────────────────────────────────────────── */}
      <div
        className={[
          "flex flex-col items-center gap-6 text-center",
          "px-4 pt-12 pb-8",
          "desktop:gap-10 desktop:px-14 desktop:pt-[88px] desktop:pb-[56px]",
        ].join(" ")}
      >
        {/* Title block */}
        <div className="flex flex-col items-center gap-2 text-[var(--color-beige-100)]">
          <h1
            className={[
              "font-[family-name:var(--font-display)]",
              "uppercase leading-[1.05]",
              "text-5xl desktop:text-[length:var(--text-h1)]",
            ].join(" ")}
          >
            Les Balcons
          </h1>
          <p
            className={[
              "font-[family-name:var(--font-title)] font-extrabold",
              "leading-[1.2]",
              "text-2xl desktop:text-[length:var(--text-h4)]",
            ].join(" ")}
          >
            Auberge &amp; Bistro culturel
          </p>
        </div>

        {/* Description */}
        <p
          className={[
            "mx-auto max-w-[906px]",
            "font-[family-name:var(--font-body)]",
            "text-[var(--color-beige-100)]",
            "text-[length:var(--text-body-sm)] desktop:text-[length:var(--text-body-md)]",
            "leading-[1.5]",
          ].join(" ")}
        >
          Pour un séjour convivial et abordable à Baie-Saint-Paul dans la
          magnifique région de Charlevoix.
        </p>

        {/* Booking widget (Beds24 iframe) */}
        {bookingUrl && (
          <div className="mx-auto w-full max-w-[900px]">
            <iframe
              src={bookingUrl}
              title="Réservation"
              className="h-[107px] w-full rounded-lg border-0 bg-white"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* ── Hero photo with arch mask ──────────────────────────────────── */}
      <div className="relative w-full" style={{ aspectRatio: "1936 / 1038" }}>
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <ArchMask />
      </div>
    </section>
  );
}
