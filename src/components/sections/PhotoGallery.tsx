/**
 * PhotoGallery — Three-photo grid section for Les Balcons pages.
 *
 * The middle image uses a portrait aspect ratio (3/4) while the outer two
 * use a landscape ratio (4/3), creating the Figma-specified visual rhythm.
 *
 * Usage:
 * ```tsx
 * import PhotoGallery from '@/components/sections/PhotoGallery';
 *
 * <PhotoGallery
 *   images={[
 *     { src: '/images/room.jpg',    alt: 'Chambre avec vue sur la vallée' },
 *     { src: '/images/bistro.jpg',  alt: 'Salle du Bistro culturel' },
 *     { src: '/images/garden.jpg',  alt: 'Terrasse et jardins' },
 *   ]}
 * />
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GalleryImage {
  /** Image URL. */
  src: string;
  /** Descriptive alt text for accessibility. */
  alt: string;
}

export interface PhotoGalleryProps {
  /** Exactly 3 images. Extra images are silently ignored. */
  images: GalleryImage[];
  /** Optional extra classes applied to the outer section element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns the aspect-ratio class for each grid position.
 * Position 1 (middle) uses portrait 3/4; positions 0 and 2 use landscape 4/3.
 */
function aspectRatioClass(index: number): string {
  return index === 1 ? "aspect-[3/4]" : "aspect-[4/3]";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PhotoGallery({ images, className = "" }: PhotoGalleryProps) {
  // Limit to 3 images per the design spec
  const visibleImages = images.slice(0, 3);

  return (
    <section
      aria-label="Galerie de photos"
      className={[
        // Horizontal padding: 16px mobile, 96px desktop
        "px-4 desktop:px-24",
        // Vertical padding
        "py-8 desktop:py-12",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/*
       * Desktop: 3-column grid, images align at their tops so the taller
       * portrait middle image naturally extends below the landscape ones.
       * Mobile: stack vertically (flex-col).
       * The outer container scrolls horizontally on narrow viewports when
       * set to row layout — we go with vertical stack for simplicity and
       * full accessibility (no overflow hidden on content).
       */}
      <ul
        role="list"
        className={[
          "flex flex-col gap-4",
          "desktop:flex-row desktop:items-start",
        ].join(" ")}
      >
        {visibleImages.map((image, index) => (
          <li
            key={image.src}
            className="flex-1"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className={[
                "w-full object-cover",
                // Rounded corners: 16px (rounded-2xl)
                "rounded-2xl",
                // Aspect ratio per position
                aspectRatioClass(index),
              ].join(" ")}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
