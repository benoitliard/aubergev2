import React from "react";

export interface PartnerItem {
  name: string;
  logo: string;
  url?: string;
}

export interface PartnersBarProps {
  partners: PartnerItem[];
  className?: string;
}

function PartnerLogo({ partner }: { partner: PartnerItem }) {
  const image = (
    <img
      src={partner.logo}
      alt={partner.name}
      className="max-h-[78px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
    />
  );

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visiter le site de ${partner.name}`}
        className="inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-charcoal)] rounded"
      >
        {image}
      </a>
    );
  }

  return <span className="inline-flex items-center justify-center">{image}</span>;
}

export function PartnersBar({ partners, className = "" }: PartnersBarProps) {
  const classes = [
    "w-full",
    "bg-[var(--color-beige-100)]",
    "py-8",
    "px-4 md:px-14",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} aria-label="Nos partenaires">
      <ul
        className="flex flex-row flex-wrap items-center justify-center md:justify-between gap-8 md:gap-4 list-none m-0 p-0"
        role="list"
      >
        {partners.map((partner) => (
          <li key={partner.name} className="flex items-center justify-center">
            <PartnerLogo partner={partner} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PartnersBar;
