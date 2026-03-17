# Les Balcons — Project Instructions

## Stack
- Astro + Sanity + Tailwind CSS + Storybook + Chromatic
- Deployed on Cloudflare Pages
- Bilingual FR/EN

## Design System
Three color universes:
- **Les Balcons (brand)**: `#056131` (dark green)
- **L'Auberge**: `#d4df90` (light green)
- **Le Bistro**: `#d78dff` (purple)
- **Accent**: `#ffb601` (yellow)
- **Background**: `#f7f5ed` (beige)
- **Text**: `#1d1c17` (charcoal)

Typography: Bricolage Grotesque (titles ExtraBold 800, body SemiCondensed Regular 400)
Grid: 12 columns, 32px gutter, 96px margin. Breakpoints: 375/1440/1920px

## Figma
- File key: `lYmCDWr4W6ST1HJr6x6tKW`
- URL: https://www.figma.com/design/lYmCDWr4W6ST1HJr6x6tKW/auberge

## Content Strategy
- Dynamic (Sanity): Blog, Events, Offers, Bistro menu, Testimonials, FAQ, Galleries
- Static (coded): Page structure, institutional text, Navigation, Footer
- Sanity Studio at `/studio` — must be ultra-simple for non-technical staff

## Conventions
- Components in `src/components/` organized by type (ui/, layout/, sections/, forms/)
- Pages under `src/pages/fr/` and `src/pages/en/`
- Sanity schemas in `sanity/schemas/`
- All components must be responsive (375/1440/1920px)
- Use Tailwind design tokens from tailwind.config.mjs — never hardcode colors
- French is the primary language
- Write all code comments in English

## Integrations
- Beds24: iframe widget for reservations
- Le Point de Vente: external links only
- Facebook Events: Sanity → webhook → Facebook Graph API (best-effort)
- Forms: React Hook Form + Astro API routes + Resend + store in Sanity
