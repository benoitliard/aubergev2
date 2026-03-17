import React from "react";
import { ServiceCard } from "../ui/ServiceCard";

export interface ServiceItem {
  title: string;
  description?: string;
  image: string;
  href: string;
}

export interface ServiceGridProps {
  services: ServiceItem[];
  className?: string;
}

export function ServiceGrid({ services, className = "" }: ServiceGridProps) {
  const wrapperClasses = [
    "px-4 md:px-24",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section aria-label="Nos services" className={wrapperClasses}>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0"
        role="list"
      >
        {services.map((service) => (
          <li key={service.href}>
            <ServiceCard
              title={service.title}
              description={service.description}
              image={service.image}
              href={service.href}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ServiceGrid;
