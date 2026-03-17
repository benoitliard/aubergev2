/**
 * Navigation.tsx
 * Main responsive navigation bar for Les Balcons.
 * Used as an interactive island in the Astro project via client:load.
 *
 * Usage:
 *   import Navigation from '@/components/layout/Navigation';
 *   <Navigation currentPath="/" lang="fr" reservationUrl="https://beds24.com/..." />
 *
 * Uses /logo-dark.svg (green fill #056131) on beige background,
 * and /logo.svg (beige fill #f7f5ed) in the dark mobile overlay.
 */

import React, { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Lang = "fr" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationProps {
  /** Current page path used to highlight the active link */
  currentPath?: string;
  /** Language prefix for internal links */
  lang?: Lang;
  /** Beds24 (or other) booking URL for the CTA button */
  reservationUrl?: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

function buildNavLinks(lang: Lang): NavLink[] {
  const prefix = lang === "en" ? "/en" : "";
  return [
    { label: "L'Auberge", href: `${prefix}/auberge` },
    { label: "Le Bistro", href: `${prefix}/bistro` },
    { label: "Groupes et affaires", href: `${prefix}/groupes` },
    { label: "Événements", href: `${prefix}/evenements` },
    { label: "Contact", href: `${prefix}/contact` },
  ];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Logo component using the dark (green) SVG for beige backgrounds */
function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  const src = variant === "dark" ? "/logo-dark.svg" : "/logo.svg";
  return (
    <a
      href="/"
      aria-label="Les Balcons — Retour à l'accueil"
      className={[
        "inline-flex items-center",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
        className,
      ].filter(Boolean).join(" ")}
    >
      <img
        src={src}
        alt="Les Balcons"
        className="h-full w-auto"
      />
    </a>
  );
}

/** Hamburger icon — three horizontal bars */
function HamburgerIcon() {
  return (
    <svg
      width="32"
      height="25"
      viewBox="0 0 32 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Bar 1 */}
      <rect y="0" width="31.5" height="5" rx="2.5" fill="currentColor" />
      {/* Bar 2 — gap of 4.7px */}
      <rect y="9.7" width="31.5" height="5" rx="2.5" fill="currentColor" />
      {/* Bar 3 — gap of 4.7px */}
      <rect y="19.4" width="31.5" height="5" rx="2.5" fill="currentColor" />
    </svg>
  );
}

/** Close icon — two crossed lines */
function CloseIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="2"
        y1="2"
        x2="26"
        y2="26"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="26"
        y1="2"
        x2="2"
        y2="26"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function Navigation({
  currentPath = "/",
  lang = "fr",
  reservationUrl = "#reserver",
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = buildNavLinks(lang);

  // Close menu on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    currentPath === href || currentPath.startsWith(href + "/");

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Main nav bar                                                         */}
      {/* ------------------------------------------------------------------ */}
      <nav
        aria-label="Navigation principale"
        className={[
          "w-full bg-[var(--color-beige-100)]",
          // Mobile: fixed height 90px
          "h-[90px]",
          // Desktop: taller
          "lg:h-[136px] 2xl:h-[153px]",
          "px-6 lg:px-12 2xl:px-16",
          "flex items-center justify-between",
          "relative z-40",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex-shrink-0 h-[52px] lg:h-[52px] 2xl:h-[73px]">
          <Logo variant="dark" className="h-full" />
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-[40px] 2xl:gap-[56px]">
          <ul className="flex items-center gap-[40px] 2xl:gap-[56px] list-none m-0 p-0" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={[
                    "font-[family-name:var(--font-title)] font-bold",
                    "text-[length:var(--text-body-sm)] 2xl:text-[length:var(--text-body-lg)]",
                    "text-[var(--color-charcoal)]",
                    "no-underline transition-opacity duration-200",
                    "hover:opacity-60",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
                    // Active state: underline
                    isActive(link.href)
                      ? "underline underline-offset-4 decoration-2"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <a
            href={reservationUrl}
            className={[
              "inline-flex items-center justify-center",
              "rounded-full",
              "bg-[var(--color-green-dark)]",
              "text-[var(--color-beige-100)]",
              "font-[family-name:var(--font-title)] font-extrabold",
              "text-[length:var(--text-body-sm)] 2xl:text-[length:var(--text-body-lg)]",
              "px-8 py-4",
              "transition-[filter] duration-200 hover:brightness-90",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
              "whitespace-nowrap",
            ].join(" ")}
          >
            Je réserve
          </a>
        </div>

        {/* Mobile right side: reserve link + hamburger */}
        <div className="flex lg:hidden items-center gap-5">
          <a
            href={reservationUrl}
            className={[
              "font-[family-name:var(--font-title)] font-bold",
              "text-[length:var(--text-body-xs)]",
              "text-[var(--color-charcoal)]",
              "underline underline-offset-4",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
            ].join(" ")}
          >
            Je réserve
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={[
              "text-[var(--color-charcoal)]",
              "flex items-center justify-center",
              "p-1 -mr-1",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
              "transition-opacity duration-200 hover:opacity-60",
            ].join(" ")}
          >
            {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile full-screen overlay menu                                     */}
      {/* ------------------------------------------------------------------ */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={[
          "fixed inset-0 z-50 lg:hidden",
          "bg-[var(--color-charcoal)]",
          "flex flex-col",
          // Transition
          "transition-[opacity,visibility] duration-300 ease-in-out",
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible",
        ].join(" ")}
      >
        {/* Header row inside overlay */}
        <div className="flex items-center justify-between h-[90px] px-6">
          <div className="h-[40px]" onClick={handleLinkClick}>
            <Logo variant="light" className="h-full" />
          </div>

          {/* Close button */}
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className={[
              "text-[var(--color-beige-100)]",
              "flex items-center justify-center p-1 -mr-1",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
              "transition-opacity duration-200 hover:opacity-60",
            ].join(" ")}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Navigation mobile"
          className="flex-1 flex flex-col justify-center px-8"
        >
          <ul className="list-none m-0 p-0 flex flex-col gap-8" role="list">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                style={{
                  // Staggered slide-in animation
                  transitionDelay: menuOpen ? `${index * 60}ms` : "0ms",
                }}
                className={[
                  "transition-[opacity,transform] duration-300 ease-out",
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                ].join(" ")}
              >
                <a
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={handleLinkClick}
                  className={[
                    "font-[family-name:var(--font-title)] font-bold",
                    "text-[length:var(--text-h4)]",
                    "no-underline transition-opacity duration-200",
                    "hover:opacity-60",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
                    isActive(link.href)
                      ? "text-[var(--color-green-light)]"
                      : "text-[var(--color-beige-100)]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA at bottom of overlay */}
        <div className="px-8 pb-12">
          <a
            href={reservationUrl}
            onClick={handleLinkClick}
            className={[
              "inline-flex items-center justify-center w-full",
              "rounded-full",
              "bg-[var(--color-green-dark)]",
              "text-[var(--color-beige-100)]",
              "font-[family-name:var(--font-title)] font-extrabold",
              "text-[length:var(--text-body-sm)]",
              "px-8 py-4",
              "transition-[filter] duration-200 hover:brightness-90",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
            ].join(" ")}
          >
            Je réserve
          </a>
        </div>
      </div>
    </>
  );
}

export default Navigation;
