import React from "react";

export interface ServiceCardProps {
  title: string;
  description?: string;
  image: string;
  href: string;
  className?: string;
}

const baseStyles = [
  "group",
  "relative block overflow-hidden",
  "rounded-2xl",
  "aspect-square",
  "transition-transform duration-300 ease-out",
  "hover:scale-[1.02]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
].join(" ");

export function ServiceCard({
  title,
  description,
  image,
  href,
  className = "",
}: ServiceCardProps) {
  const classes = [baseStyles, className].filter(Boolean).join(" ");

  return (
    <a href={href} className={classes}>
      {/* Background image */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 60%)",
        }}
        aria-hidden="true"
      />

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3
          className="font-[family-name:var(--font-title)] font-extrabold text-[length:var(--text-body-lg)] text-white leading-tight"
        >
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-[length:var(--text-body-xs)] text-white/80 leading-snug">
            {description}
          </p>
        )}
      </div>
    </a>
  );
}

export default ServiceCard;
