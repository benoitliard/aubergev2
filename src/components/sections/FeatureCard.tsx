import React from "react";

export type FeatureCardUniverse = "auberge" | "bistro";

export interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  universe: FeatureCardUniverse;
  className?: string;
}

const universeConfig: Record<
  FeatureCardUniverse,
  { bgColor: string; focusColor: string; reversed: boolean }
> = {
  auberge: {
    bgColor: "var(--color-green-light)",
    focusColor: "var(--color-green-dark)",
    reversed: false,
  },
  bistro: {
    bgColor: "var(--color-purple-500)",
    focusColor: "var(--color-charcoal)",
    reversed: true,
  },
};

export function FeatureCard({
  title,
  description,
  image,
  imageAlt,
  ctaLabel,
  ctaHref,
  universe,
  className = "",
}: FeatureCardProps) {
  const config = universeConfig[universe];

  const wrapperClasses = [
    "mx-4 md:mx-24",
    "rounded-[32px] overflow-hidden",
    "flex flex-col md:flex-row",
    config.reversed ? "md:flex-row-reverse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={wrapperClasses}
      style={{ backgroundColor: config.bgColor }}
      aria-label={title}
    >
      {/* Colored panel with text */}
      <div
        className="flex flex-col justify-center gap-6 p-6 md:p-12 md:basis-1/2 md:shrink-0"
      >
        <h2
          className="font-[family-name:var(--font-title)] font-extrabold text-[length:var(--text-h2)] text-[var(--color-charcoal)] leading-[1.1] m-0"
        >
          {title}
        </h2>

        <p
          className="text-[length:var(--text-body-md)] text-[var(--color-charcoal)] leading-relaxed"
        >
          {description}
        </p>

        <a
          href={ctaHref}
          className={[
            "inline-flex items-center self-start",
            "font-[family-name:var(--font-title)] font-extrabold",
            "text-[length:var(--text-body-sm)]",
            "underline underline-offset-4",
            "transition-opacity duration-200 hover:opacity-70",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:rounded-sm",
          ].join(" ")}
          style={{ color: config.focusColor }}
        >
          {ctaLabel}
        </a>
      </div>

      {/* Image panel */}
      <div className="relative md:basis-1/2 md:shrink-0 aspect-[4/3] md:aspect-auto min-h-[260px]">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </article>
  );
}

export default FeatureCard;
