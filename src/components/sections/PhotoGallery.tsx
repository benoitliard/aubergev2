/**
 * PhotoGallery — Horizontal photo carousel with mixed image shapes.
 *
 * Shows 3 visible photos at a time:
 * - Position 0 & 2: rectangular with rounded-[32px] corners
 * - Position 1: arch-top shape (pill top, rounded bottom)
 *
 * Navigation with arrow buttons and "1 / N" counter, bottom-right aligned.
 *
 * Usage:
 * ```tsx
 * <PhotoGallery images={[{ src: '/img/1.jpg', alt: 'Room' }, ...]} />
 * ```
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowButton } from "../ui/ArrowButton";
import { useSwipe } from "../../hooks/useSwipe";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface PhotoGalleryProps {
  images: GalleryImage[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns border-radius classes based on position within the visible set of 3 */
function imageClasses(indexInGroup: number): string {
  if (indexInGroup === 1) {
    // Middle image: arch/pill top, rounded bottom
    return "rounded-t-[999px] rounded-b-[40px]";
  }
  // Outer images: uniform rounded
  return "rounded-[32px]";
}

/** Returns width class based on position (middle is narrower) */
function widthClass(indexInGroup: number): string {
  if (indexInGroup === 1) return "w-[35vw] desktop:w-[371px]";
  return "w-[65vw] desktop:w-[702px]";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PhotoGallery({ images, className = "" }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= total - 1;

  const recalcOffset = useCallback(() => {
    if (!trackRef.current) return;
    const firstItem = trackRef.current.querySelector<HTMLElement>("[data-photo]");
    if (!firstItem) return;
    const gap = 24;
    const itemWidth = firstItem.offsetWidth;
    setOffset(currentIndex * (itemWidth + gap));
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

  const swipe = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handlePrev });

  return (
    <section
      aria-label="Galerie de photos"
      className={[
        "bg-[var(--color-beige-100)] overflow-hidden",
        "px-4 py-8 desktop:px-6 desktop:py-14",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Photos track */}
      <div
        ref={trackRef}
        className="overflow-hidden touch-pan-y"
        {...swipe}
      >
        <div
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${offset}px)` }}
          aria-live="polite"
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              data-photo
              className={[
                "h-[300px] desktop:h-[528px] shrink-0 overflow-hidden",
                widthClass(index % 3),
                imageClasses(index % 3),
              ].join(" ")}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation — bottom right */}
      <div className="mt-10 flex items-center justify-end gap-8 px-8">
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
            aria-label="Photo précédente"
          />
          <ArrowButton
            direction="right"
            state={isAtEnd ? "disabled" : "default"}
            onClick={handleNext}
            aria-label="Photo suivante"
          />
        </div>
      </div>
    </section>
  );
}
