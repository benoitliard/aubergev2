import React from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FooterLang = "fr" | "en";

export interface FooterProps {
  /** Language variant — controls copy language. Defaults to "fr". */
  lang?: FooterLang;
}

// ---------------------------------------------------------------------------
// Copy / i18n
// ---------------------------------------------------------------------------

interface FooterCopy {
  copyright: string;
  navLinks: Array<{ label: string; href: string; external?: boolean }>;
  cancellationPolicy: { label: string; href: string };
  address: string;
  phone: { display: string; href: string };
  email: { display: string; href: string };
  privacyPolicy: { label: string; href: string };
  socialAriaLabels: {
    facebook: string;
    instagram: string;
    linkedin: string;
    tiktok: string;
  };
}

const copy: Record<FooterLang, FooterCopy> = {
  fr: {
    copyright: "Tous droits réservés \u00A9 Les Balcons",
    navLinks: [
      { label: "À propos", href: "/a-propos" },
      { label: "Offres d'emploi", href: "/offres-emploi" },
      { label: "Blogue", href: "/blogue" },
      { label: "Contact", href: "/contact" },
      { label: "Médias", href: "/medias" },
      {
        label: "Offres partenaires & Promotions",
        href: "/offres-partenaires",
      },
      { label: "Cartes-cadeaux", href: "/cartes-cadeaux", external: true },
    ],
    cancellationPolicy: {
      label: "Politique d'annulation",
      href: "/politique-annulation",
    },
    address: "63 Rue Ambroise Fafard, Baie-Saint-Paul, QC G3Z 2J7",
    phone: { display: "+1 581-705-2176", href: "tel:+15817052176" },
    email: { display: "info@lesbalcons.ca", href: "mailto:info@lesbalcons.ca" },
    privacyPolicy: {
      label: "Politique de confidentialité",
      href: "/politique-confidentialite",
    },
    socialAriaLabels: {
      facebook: "Visitez notre page Facebook",
      instagram: "Visitez notre compte Instagram",
      linkedin: "Visitez notre page LinkedIn",
      tiktok: "Visitez notre compte TikTok",
    },
  },
  en: {
    copyright: "All rights reserved \u00A9 Les Balcons",
    navLinks: [
      { label: "About", href: "/en/about" },
      { label: "Job offers", href: "/en/careers" },
      { label: "Blog", href: "/en/blog" },
      { label: "Contact", href: "/en/contact" },
      { label: "Media", href: "/en/media" },
      { label: "Partner offers & Promotions", href: "/en/partners" },
      { label: "Gift cards", href: "/en/gift-cards", external: true },
    ],
    cancellationPolicy: {
      label: "Cancellation policy",
      href: "/en/cancellation-policy",
    },
    address: "63 Ambroise Fafard Street, Baie-Saint-Paul, QC G3Z 2J7",
    phone: { display: "+1 581-705-2176", href: "tel:+15817052176" },
    email: { display: "info@lesbalcons.ca", href: "mailto:info@lesbalcons.ca" },
    privacyPolicy: {
      label: "Privacy policy",
      href: "/en/privacy-policy",
    },
    socialAriaLabels: {
      facebook: "Visit our Facebook page",
      instagram: "Visit our Instagram account",
      linkedin: "Visit our LinkedIn page",
      tiktok: "Visit our TikTok account",
    },
  },
};

// ---------------------------------------------------------------------------
// Social icons — simple inline SVGs (recognisable brand shapes, no fill lib)
// ---------------------------------------------------------------------------

const FacebookIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TikTokIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.01-8.34a8.14 8.14 0 0 0 4.77 1.52V5.04a4.86 4.86 0 0 1-1-.35z" />
  </svg>
);

const ExternalLinkIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
    <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface SocialButtonProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  ariaLabel,
  children,
}) => (
  <a
    href={href}
    aria-label={ariaLabel}
    target="_blank"
    rel="noopener noreferrer"
    className={[
      "flex items-center justify-center",
      "w-12 h-12 rounded-full",
      "bg-[var(--color-beige-100)] text-[var(--color-green-dark)]",
      "transition-opacity duration-200 hover:opacity-80",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
    ].join(" ")}
  >
    {children}
  </a>
);

interface NavPillProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

const NavPill: React.FC<NavPillProps> = ({ href, external, children }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={[
      "inline-flex items-center gap-1.5",
      "bg-[var(--color-beige-100)] text-[var(--color-green-dark)]",
      "font-[family-name:var(--font-title)] font-extrabold",
      "text-[length:var(--text-body-sm)]",
      "rounded-full px-4 py-4",
      "transition-opacity duration-200 hover:opacity-80",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
      "whitespace-nowrap",
    ].join(" ")}
  >
    {children}
    {external && <ExternalLinkIcon />}
  </a>
);

const PolicyLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className={[
      "text-[var(--color-beige-100)]",
      "text-[length:var(--text-body-xs)] font-semibold",
      "underline underline-offset-2",
      "transition-opacity duration-200 hover:opacity-70",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
    ].join(" ")}
  >
    {children}
  </a>
);

// ---------------------------------------------------------------------------
// Logo — inlined SVG (white/beige fill, perfect for dark background)
// ---------------------------------------------------------------------------

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <img
    src="/logo.svg"
    alt="Les Balcons"
    className={className}
    width={523}
    height={102}
    loading="lazy"
    decoding="async"
  />
);

// ---------------------------------------------------------------------------
// Social row
// ---------------------------------------------------------------------------

interface SocialRowProps {
  ariaLabels: FooterCopy["socialAriaLabels"];
}

const SocialRow: React.FC<SocialRowProps> = ({ ariaLabels }) => (
  <div className="flex items-center gap-3" role="list" aria-label="Réseaux sociaux">
    <div role="listitem">
      <SocialButton href="https://www.facebook.com/lesbalcons" ariaLabel={ariaLabels.facebook}>
        <FacebookIcon />
      </SocialButton>
    </div>
    <div role="listitem">
      <SocialButton href="https://www.instagram.com/lesbalcons" ariaLabel={ariaLabels.instagram}>
        <InstagramIcon />
      </SocialButton>
    </div>
    <div role="listitem">
      <SocialButton href="https://www.linkedin.com/company/lesbalcons" ariaLabel={ariaLabels.linkedin}>
        <LinkedInIcon />
      </SocialButton>
    </div>
    <div role="listitem">
      <SocialButton href="https://www.tiktok.com/@lesbalcons" ariaLabel={ariaLabels.tiktok}>
        <TikTokIcon />
      </SocialButton>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

/**
 * Footer — interactive island for the Les Balcons Astro project.
 *
 * Usage in an Astro page:
 * ```astro
 * ---
 * import { Footer } from '../components/layout/Footer';
 * ---
 * <Footer client:load lang="fr" />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({ lang = "fr" }) => {
  const t = copy[lang];

  return (
    <footer
      className={[
        "bg-[var(--color-green-dark)]",
        // Mobile: rounded top corners
        "rounded-tl-[32px] rounded-tr-[32px]",
        // Desktop: no rounding (full-width sits at page bottom)
        "lg:rounded-none",
        "w-full",
      ].join(" ")}
      aria-label="Pied de page"
    >
      {/* ------------------------------------------------------------------ */}
      {/* DESKTOP layout (≥1024px)                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="hidden lg:flex lg:flex-col px-24 pt-20 pb-8">
        {/* Top section — 3 columns */}
        <div className="grid grid-cols-[280px_1fr_280px] gap-12">
          {/* Column 1 — Logo */}
          <div className="flex flex-col">
            <Logo className="w-full max-w-[523px]" />
          </div>

          {/* Column 2 — Nav pills */}
          <nav aria-label="Navigation secondaire">
            <ul className="flex flex-wrap gap-3">
              {t.navLinks.map((link) => (
                <li key={link.href}>
                  <NavPill href={link.href} external={link.external}>
                    {link.label}
                  </NavPill>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact + social */}
          <div className="flex flex-col gap-8">
            <address className="not-italic flex flex-col gap-2">
              <span
                className={[
                  "text-[var(--color-beige-100)]",
                  "text-[length:var(--text-body-xs)]",
                ].join(" ")}
              >
                {t.address}
              </span>
              <a
                href={t.phone.href}
                className={[
                  "text-[var(--color-beige-100)] font-bold",
                  "text-[length:var(--text-body-xs)]",
                  "underline underline-offset-2",
                  "transition-opacity duration-200 hover:opacity-70",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
                ].join(" ")}
              >
                {t.phone.display}
              </a>
              <a
                href={t.email.href}
                className={[
                  "text-[var(--color-beige-100)] font-bold",
                  "text-[length:var(--text-body-xs)]",
                  "underline underline-offset-2",
                  "transition-opacity duration-200 hover:opacity-70",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
                ].join(" ")}
              >
                {t.email.display}
              </a>
            </address>

            <SocialRow ariaLabels={t.socialAriaLabels} />
          </div>
        </div>

        {/* Bottom row — copyright + policy links */}
        <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-8">
          <p
            className={[
              "text-[var(--color-beige-100)]",
              "text-[length:var(--text-body-xs)] font-semibold",
            ].join(" ")}
          >
            {t.copyright}
          </p>
          <PolicyLink href={t.cancellationPolicy.href}>
            {t.cancellationPolicy.label}
          </PolicyLink>
          <PolicyLink href={t.privacyPolicy.href}>
            {t.privacyPolicy.label}
          </PolicyLink>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE layout (<1024px) — stacked vertically                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="lg:hidden flex flex-col gap-10 px-4 pt-12 pb-8">
        {/* Nav pills */}
        <nav aria-label="Navigation secondaire">
          <ul className="flex flex-wrap gap-3">
            {t.navLinks.map((link) => (
              <li key={link.href}>
                <NavPill href={link.href} external={link.external}>
                  {link.label}
                </NavPill>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <address className="not-italic flex flex-col gap-2">
          <span
            className={[
              "text-[var(--color-beige-100)]",
              "text-[length:var(--text-body-xs)]",
            ].join(" ")}
          >
            {t.address}
          </span>
          <a
            href={t.phone.href}
            className={[
              "text-[var(--color-beige-100)] font-bold",
              "text-[length:var(--text-body-xs)]",
              "underline underline-offset-2",
              "transition-opacity duration-200 hover:opacity-70",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
            ].join(" ")}
          >
            {t.phone.display}
          </a>
          <a
            href={t.email.href}
            className={[
              "text-[var(--color-beige-100)] font-bold",
              "text-[length:var(--text-body-xs)]",
              "underline underline-offset-2",
              "transition-opacity duration-200 hover:opacity-70",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-beige-100)]",
            ].join(" ")}
          >
            {t.email.display}
          </a>
        </address>

        {/* Social icons */}
        <SocialRow ariaLabels={t.socialAriaLabels} />

        {/* Logo — full width on mobile */}
        <Logo className="w-full" />

        {/* Policy links */}
        <div className="flex flex-col gap-3">
          <PolicyLink href={t.cancellationPolicy.href}>
            {t.cancellationPolicy.label}
          </PolicyLink>
          <PolicyLink href={t.privacyPolicy.href}>
            {t.privacyPolicy.label}
          </PolicyLink>
        </div>

        {/* Copyright */}
        <p
          className={[
            "text-[var(--color-beige-100)]",
            "text-[length:var(--text-body-xs)] font-semibold",
          ].join(" ")}
        >
          {t.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
