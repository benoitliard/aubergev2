/**
 * ServiceGrid — 3-column staggered layout of service cards.
 *
 * The middle column is offset downward (pt-[112px]) to create a masonry effect
 * matching the Figma design.
 *
 * Usage:
 * ```tsx
 * <ServiceGrid services={[...]} />
 * ```
 */

import React from "react";
import { ServiceCard } from "../ui/ServiceCard";
import type { ServiceCardProps } from "../ui/ServiceCard";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ServiceItem = Omit<ServiceCardProps, "className">;

export interface ServiceGridProps {
  services: ServiceItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ServiceGrid({ services, className = "" }: ServiceGridProps) {
  // Split services into 3 columns for the staggered layout
  const columns: ServiceItem[][] = [[], [], []];
  services.forEach((service, i) => {
    columns[i % 3].push(service);
  });

  return (
    <section
      aria-label="Nos services"
      className={[
        "bg-[var(--color-beige-100)]",
        "px-4 py-12 desktop:px-[160px] desktop:py-[88px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Mobile: single column */}
      <div className="flex flex-col gap-8 lg:hidden">
        {services.map((service) => (
          <ServiceCard key={service.href} {...service} />
        ))}
      </div>

      {/* Desktop: 3-column staggered layout */}
      <div className="hidden lg:flex lg:gap-10">
        {columns.map((col, colIndex) => (
          <div
            key={colIndex}
            className={[
              "flex flex-1 flex-col gap-10",
              // Middle column is offset downward
              colIndex === 1 ? "pt-[112px]" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {col.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceGrid;
