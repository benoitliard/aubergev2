/**
 * TestimonialCarousel — Horizontal carousel of testimonial cards.
 *
 * Usage:
 * ```tsx
 * <TestimonialCarousel testimonials={[...]} />
 * ```
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowButton } from "../ui/ArrowButton";
import { TestimonialCard } from "../ui/TestimonialCard";
import type { TestimonialCategory } from "../ui/TestimonialCard";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TestimonialItem {
  category: TestimonialCategory;
  text: string;
  author: string;
}

export interface TestimonialCarouselProps {
  title?: string;
  testimonials: TestimonialItem[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TestimonialCarousel({
  title = "Ce que nos clients disent de nous",
  testimonials,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = testimonials.length;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= total - 1;

  // Recalculate pixel offset when index or viewport changes
  const recalcOffset = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return;
    const gap = 24; // gap-6
    const cardWidth = firstCard.offsetWidth;
    setOffset(currentIndex * (cardWidth + gap));
  }, [currentIndex]);

  useEffect(() => {
    recalcOffset();
  }, [recalcOffset]);

  useEffect(() => {
    const observer = new ResizeObserver(() => recalcOffset());
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [recalcOffset]);

  function handlePrev() {
    if (!isAtStart) setCurrentIndex((prev) => prev - 1);
  }

  function handleNext() {
    if (!isAtEnd) setCurrentIndex((prev) => prev + 1);
  }

  return (
    <section
      className={[
        "bg-[var(--color-beige-100)] overflow-hidden",
        "px-4 py-12",
        "desktop:px-24 desktop:py-[88px]",
      ].join(" ")}
      aria-label="Témoignages clients"
    >
      {/* Title — left-aligned */}
      <h4
        className={[
          "font-[family-name:var(--font-title)] font-extrabold",
          "text-[length:var(--text-h4)] leading-[1.2]",
          "text-[var(--color-charcoal)]",
          "mb-10",
        ].join(" ")}
      >
        {title}
      </h4>

      {/* Cards track */}
      <div ref={trackRef} className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${offset}px)` }}
          role="region"
          aria-live="polite"
          aria-label="Carrousel de témoignages"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-card
              className="h-[464px] w-[85vw] shrink-0 desktop:w-[804px]"
              aria-hidden={
                index < currentIndex || index > currentIndex + 1
                  ? true
                  : undefined
              }
            >
              <TestimonialCard
                category={testimonial.category}
                text={testimonial.text}
                author={testimonial.author}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation — bottom right: counter + arrows */}
      <div className="mt-10 flex items-center justify-end gap-8">
        <span
          className={[
            "font-[family-name:var(--font-body)]",
            "text-[length:var(--text-body-sm)] leading-[1.5]",
            "text-[var(--color-charcoal)]",
          ].join(" ")}
        >
          {currentIndex + 1} / {total}
        </span>

        <div className="flex items-center gap-4">
          <ArrowButton
            direction="left"
            state={isAtStart ? "disabled" : "default"}
            onClick={handlePrev}
            aria-label="Témoignage précédent"
          />
          <ArrowButton
            direction="right"
            state={isAtEnd ? "disabled" : "default"}
            onClick={handleNext}
            aria-label="Témoignage suivant"
          />
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
