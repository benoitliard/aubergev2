/**
 * ServiceCard — Light green card with photo, title, description, and CTA.
 *
 * Usage:
 * ```tsx
 * <ServiceCard
 *   title="Coworking"
 *   description="Espace coworking ouvert tous les jours de 9h à 17h."
 *   image="/images/coworking.jpg"
 *   href="/coworking"
 *   ctaLabel="En savoir plus"
 * />
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  /** CTA label. Defaults to "En savoir plus". */
  ctaLabel?: string;
  /** "link" renders an underlined text link, "button" renders a charcoal pill. */
  ctaVariant?: "link" | "button";
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ServiceCard({
  title,
  description,
  image,
  href,
  ctaLabel = "En savoir plus",
  ctaVariant = "link",
  className = "",
}: ServiceCardProps) {
  return (
    <article
      className={[
        "flex flex-col gap-8 rounded-[48px] bg-[var(--color-green-light)] p-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Photo */}
      <div className="relative aspect-[490/350] w-full overflow-hidden rounded-[32px]">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-4 px-6">
        <h3
          className={[
            "font-[family-name:var(--font-title)] font-extrabold",
            "text-[length:var(--text-h5)] leading-[1.15]",
            "text-center text-[var(--color-charcoal)]",
          ].join(" ")}
        >
          {title}
        </h3>

        <p
          className={[
            "font-[family-name:var(--font-body)]",
            "text-[length:var(--text-body-md)] leading-[1.5]",
            "text-center text-[var(--color-charcoal)]",
          ].join(" ")}
        >
          {description}
        </p>

        {/* CTA */}
        <div className="py-4">
          {ctaVariant === "button" ? (
            <a
              href={href}
              className={[
                "inline-flex items-center justify-center",
                "rounded-full bg-[var(--color-charcoal)] px-6 py-6",
                "font-[family-name:var(--font-title)] font-extrabold",
                "text-[length:var(--text-body-sm)] leading-[1.5]",
                "text-[var(--color-beige-100)]",
                "transition-opacity hover:opacity-80",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
              ].join(" ")}
            >
              {ctaLabel}
            </a>
          ) : (
            <a
              href={href}
              className={[
                "font-[family-name:var(--font-title)] font-extrabold",
                "text-[length:var(--text-body-sm)] leading-[1.5]",
                "text-[var(--color-green-dark)]",
                "underline",
                "transition-opacity hover:opacity-70",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green-dark)]",
              ].join(" ")}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;
