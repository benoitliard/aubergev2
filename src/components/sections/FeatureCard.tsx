/**
 * FeatureCard — Large showcase card for L'Auberge or Le Bistro.
 *
 * Two-panel layout: text on one side, mascot-silhouette-masked photo on the
 * other. Auberge is yellow (text left), Bistro is purple (text right).
 *
 * Usage:
 * ```tsx
 * <FeatureCard
 *   universe="auberge"
 *   title="L'Auberge"
 *   description="..."
 *   image="/images/auberge.jpg"
 *   primaryCta={{ label: "Je découvre les chambres", href: "/auberge" }}
 *   secondaryCta={{ label: "Je réserve une chambre", href: "/reservations" }}
 * />
 * ```
 */

import React from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FeatureCardUniverse = "auberge" | "bistro";

export interface FeatureCardCta {
  label: string;
  href: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  /** Primary CTA rendered as a charcoal pill button. */
  primaryCta: FeatureCardCta;
  /** Secondary CTA rendered as an underlined text link. */
  secondaryCta?: FeatureCardCta;
  universe: FeatureCardUniverse;
  className?: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const universeConfig: Record<
  FeatureCardUniverse,
  { bgColor: string; reversed: boolean }
> = {
  auberge: {
    bgColor: "var(--color-yellow-500)",
    reversed: false,
  },
  bistro: {
    bgColor: "var(--color-purple-500)",
    reversed: true,
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FeatureCard({
  title,
  description,
  image,
  imageAlt = "",
  primaryCta,
  secondaryCta,
  universe,
  className = "",
}: FeatureCardProps) {
  const config = universeConfig[universe];

  return (
    <article
      aria-label={title}
      className={[
        "overflow-hidden rounded-[32px] lg:rounded-[64px]",
        "flex flex-col lg:h-[800px]",
        config.reversed ? "lg:flex-row-reverse" : "lg:flex-row",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundColor: config.bgColor }}
    >
      {/* Text panel */}
      <div
        className={[
          "flex flex-col justify-center gap-8",
          "p-8 lg:basis-1/2 lg:shrink-0",
          config.reversed ? "lg:pr-[128px]" : "lg:pl-[128px]",
        ].join(" ")}
      >
        <h2
          className={[
            "font-[family-name:var(--font-title)] font-extrabold",
            "text-3xl lg:text-[length:var(--text-h2)] leading-[1.1]",
            "text-[var(--color-charcoal)]",
          ].join(" ")}
        >
          {title}
        </h2>

        <p
          className={[
            "font-[family-name:var(--font-body)]",
            "text-[length:var(--text-body-md)] leading-[1.5]",
            "text-[var(--color-charcoal)]",
          ].join(" ")}
        >
          {description}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={primaryCta.href}
            className={[
              "inline-flex items-center justify-center",
              "rounded-full bg-[var(--color-charcoal)] px-8 py-8",
              "font-[family-name:var(--font-title)] font-extrabold",
              "text-[length:var(--text-body-sm)] leading-[1.5]",
              "text-[var(--color-beige-100)]",
              "transition-opacity hover:opacity-80",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
            ].join(" ")}
          >
            {primaryCta.label}
          </a>

          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className={[
                "font-[family-name:var(--font-title)] font-extrabold",
                "text-[length:var(--text-body-sm)] leading-[1.5]",
                "text-[var(--color-charcoal)]",
                "underline",
                "transition-opacity hover:opacity-70",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
              ].join(" ")}
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>

      {/* Photo panel with mascot silhouette mask */}
      <div
        className={[
          "relative lg:basis-1/2 lg:shrink-0",
          "min-h-[300px] lg:min-h-0",
          "flex items-center justify-center overflow-hidden",
        ].join(" ")}
      >
        <div
          className="relative h-full w-full"
          style={{
            WebkitMaskImage: "url(/mascot-silhouette.svg)",
            maskImage: "url(/mascot-silhouette.svg)",
            WebkitMaskSize: "contain",
            maskSize: "contain" as string,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat" as string,
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}

export default FeatureCard;
