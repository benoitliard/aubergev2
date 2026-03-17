import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowButton } from "../ui/ArrowButton";
import { TestimonialCard } from "../ui/TestimonialCard";

export interface TestimonialItem {
  text: string;
  author: string;
  source?: string;
}

export interface TestimonialCarouselProps {
  title?: string;
  testimonials: TestimonialItem[];
}

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

  /**
   * Recalculate the pixel offset whenever the current index changes or the
   * viewport resizes. We measure the first card's rendered width (which
   * automatically reflects the responsive CSS) and multiply by the index.
   */
  const recalcOffset = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return;
    const gap = 24; // matches gap-6 (1.5rem = 24px)
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
      className="bg-white py-16 px-4 md:px-24 overflow-hidden"
      aria-label="Témoignages clients"
    >
      {/* Title */}
      <h4
        className="text-center text-[var(--color-charcoal)] mb-10 md:mb-14"
        style={{ fontFamily: "var(--font-title)" }}
      >
        {title}
      </h4>

      {/* Carousel wrapper */}
      <div className="relative flex items-center gap-4">
        {/* Left arrow */}
        <div className="shrink-0">
          <ArrowButton
            direction="left"
            state={isAtStart ? "disabled" : "default"}
            onClick={handlePrev}
            aria-label="Témoignage précédent"
          />
        </div>

        {/* Cards viewport */}
        <div className="flex-1 overflow-hidden" ref={trackRef}>
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
                className="shrink-0 w-full md:w-[calc(50%-12px)]"
                aria-hidden={
                  index < currentIndex || index > currentIndex + 1
                    ? true
                    : undefined
                }
              >
                <TestimonialCard
                  text={testimonial.text}
                  author={testimonial.author}
                  source={testimonial.source}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <div className="shrink-0">
          <ArrowButton
            direction="right"
            state={isAtEnd ? "disabled" : "default"}
            onClick={handleNext}
            aria-label="Témoignage suivant"
          />
        </div>
      </div>

      {/* Dot indicators */}
      <div
        className="flex justify-center gap-2 mt-8"
        role="tablist"
        aria-label="Navigation du carrousel"
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Témoignage ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={[
              "h-2 rounded-full transition-all duration-200 border-0 cursor-pointer",
              index === currentIndex
                ? "bg-[var(--color-green-dark)] w-4"
                : "bg-[var(--color-charcoal)]/20 w-2",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}

export default TestimonialCarousel;
