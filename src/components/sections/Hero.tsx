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
 * <Hero heroImage="/images/hero.jpg" showBooking />
 * <Hero heroImage="/images/hero.jpg" showBooking lang="en" />
 * ```
 */

import { BookingWidget } from "../ui/BookingWidget";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HeroProps {
  /** URL of the hero photo shown through the arch mask. Also used as poster when a video is provided. */
  heroImage: string;
  /** Alt text for the hero image. */
  heroImageAlt?: string;
  /** Optional URL of a hero video. When provided, replaces the image (autoplay, muted, looped). */
  heroVideo?: string | null;
  /** MIME type of the hero video (e.g. "video/mp4"). Defaults to "video/mp4". */
  heroVideoMime?: string | null;
  /** Show the Beds24 booking widget. Defaults to true. */
  showBooking?: boolean;
  /** Language for the booking widget. */
  lang?: "fr" | "en";
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
  // The outer rectangle is drawn clockwise and the inner mascot path is also
  // clockwise. With fill-rule="evenodd", the overlapping region (the mascot
  // shape) becomes transparent, revealing the photo underneath.
  const outerRect = "M0,-5 H161 V80 H0 Z";
  // Side edges go straight down to the baseline (no rounded corners) so the
  // green frame doesn't intrude on the photo at the bottom-left/right.
  const mascotCutout = [
    "M160.439,40.002 C160.996,29.591 157.327,18.988 149.419,11.081",
    "C134.645,-3.693 110.47,-3.693 95.696,11.081",
    "L80.189,26.588 L64.944,11.343",
    "C50.619,-2.98 27.493,-3.862 12.433,9.683",
    "C5.318,16.081 1.239,24.531 0.171,33.285",
    "L0,33.285 L0,80 L161,80 L161,40.002 Z",
  ].join(" ");

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 z-10 h-full w-full pointer-events-none"
      viewBox="0 -5 161 85"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        fill="#056131"
        d={`${outerRect} ${mascotCutout}`}
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
  heroVideo,
  heroVideoMime,
  showBooking = true,
  lang = "fr",
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

        {/* Booking widget (Beds24 form) */}
        {showBooking && <BookingWidget lang={lang} />}
      </div>

      {/* ── Hero photo or video with arch mask ─────────────────────────── */}
      {/* aspectRatio matches the SVG mask viewBox (161 / 85 ≈ 1.894) so the arch baseline lands exactly at the bottom edge — no green strip below. */}
      <div className="relative w-full" style={{ aspectRatio: "161 / 85" }}>
        {heroVideo ? (
          <video
            src={heroVideo}
            poster={heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={heroImageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={heroVideo} type={heroVideoMime ?? "video/mp4"} />
            <img
              src={heroImage}
              alt={heroImageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </video>
        ) : (
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <ArchMask />
      </div>
    </section>
  );
}
