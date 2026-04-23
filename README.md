# Les Balcons — Auberge & Bistro culturel

Website rebuild for Les Balcons (formerly Auberge des Balcons), located in Baie-Saint-Paul, Charlevoix.

**New domain**: lesbalcons.ca — **Launch**: end of May 2026

## Stack

| Component | Technology |
|-----------|-----------|
| Framework | Astro (SSG/islands architecture) |
| CMS | Sanity (cloud + Studio at `/studio`) |
| Styling | Tailwind CSS |
| Design System | Storybook + Chromatic |
| Deployment | Cloudflare Pages |
| Forms | React Hook Form + API routes + Resend |
| i18n | Bilingual FR/EN (Astro i18n routing) |
| Analytics | Google Analytics / Tag Manager |

## Design System

### Color Palette (by universe)

| Token | Hex | Usage |
|-------|-----|-------|
| `green-dark` | `#056131` | Les Balcons brand — header, hero, footer, CTAs |
| `green-light` | `#d4df90` | L'Auberge sections |
| `purple-500` | `#ff93ff` | Le Bistro sections |
| `yellow-500` | `#ff9425` | Accent |
| `beige-100` | `#f7f5ed` | Page background |
| `charcoal` | `#1d1c17` | Text |

### Typography

- **Titles**: Bricolage Grotesque — ExtraBold (800)
- **Body**: Bricolage Grotesque 24pt SemiCondensed — Regular (400)
- Scale: h1=128px, h2=64px, h4=48px, h5=40px, body-xl=40px, body-lg=24px, body-md=20px, body-sm=18px

### Grid

- 12 columns, 32px gutter, 96px margin
- Breakpoints: 375px (mobile), 1440px (desktop), 1920px (wide)

## Integrations

- **Beds24** — reservation widget (iframe)
- **Le Point de Vente** — external links (ticketing)
- **Facebook Events** — Sanity as source of truth, best-effort push via Graph API
- **Meta Messenger** — chat bubble
- **Google Analytics / Tag Manager**

## Content Strategy

**Dynamic (Sanity)**: Blog, Events, Offers/Promotions, Bistro menu, Testimonials, FAQ, Galleries

**Static (coded)**: Page structure, institutional text, Navigation, Footer

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/           # Design system (Button, Card, etc.)
│   │   ├── layout/       # Menu, Footer, Layout
│   │   ├── sections/     # Hero, Testimonials, Newsletter...
│   │   └── forms/        # Contact, Employment, Group...
│   ├── pages/
│   │   ├── fr/           # French pages
│   │   └── en/           # English pages
│   ├── layouts/          # BaseLayout, PageLayout
│   ├── styles/           # Global CSS, tokens
│   ├── lib/              # Sanity client, utils, i18n
│   └── content/          # Static content
├── sanity/
│   ├── schemas/          # Sanity schemas
│   ├── structure.ts      # Studio structure
│   └── sanity.config.ts
├── .storybook/           # Storybook config
├── public/               # Static assets
├── astro.config.mjs
└── tailwind.config.mjs
```

## Pages

| Page | Sprint | Content Source |
|------|--------|--------------|
| Accueil | 2 | Static + Sanity |
| L'Auberge | 3 | Static + Beds24 widget |
| Le Bistro | 3 | Sanity (menu) |
| À Propos | 3 | Static |
| Événements | 4 | Sanity |
| Groupes & Affaires | 4 | Static + Forms |
| Contact/FAQ | 4 | Sanity (FAQ) + Forms |
| Blog | 4 | Sanity |
| Quoi Faire | 4 | Static |
| Emplois | 4 | Forms |
| Offres & Promotions | 4 | Sanity |
| Médias | 4 | Static |

## Development

```bash
# Install dependencies
pnpm install

# Dev server
pnpm dev

# Storybook
pnpm storybook

# Build
pnpm build

# Preview
pnpm preview
```

## Sprint Plan

### Sprint 0 — Foundations
- Project setup (Astro, Tailwind, Sanity, Storybook, Chromatic)
- Design tokens configuration
- CI/CD pipeline (GitHub → Cloudflare Pages + Chromatic)
- i18n structure (FR/EN)

### Sprint 1 — Design System & Components
- Menu/Navigation (3 breakpoints + mobile menu)
- Footer, Buttons, Hero, Cards, Newsletter, Gallery
- Partners bar, Floating "Je réserve" button

### Sprint 2 — Homepage
- Full homepage assembly from Figma design (3 breakpoints)

### Sprint 3 — Sanity Schemas & Content Pages
- CMS schemas (events, blog, menu, offers, testimonials, FAQ)
- L'Auberge, Le Bistro, À Propos pages

### Sprint 4 — Remaining Pages
- Events, Groups, Contact/FAQ, Blog, Quoi Faire, Employment, Offers, Media

### Sprint 5 — Integrations
- Beds24 widget, Facebook Events webhook, Forms + email, Messenger, Analytics

### Sprint 6 — SEO, Performance & Launch
- SEO optimization, accessibility audit, 301 redirects, documentation

## Design Resources

- [Figma Design](https://www.figma.com/design/lYmCDWr4W6ST1HJr6x6tKW/auberge)
