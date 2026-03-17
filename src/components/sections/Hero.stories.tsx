import type { Meta, StoryObj } from "@storybook/react-vite";
import Hero from "./Hero";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Hero> = {
  title: "Sections/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Section hero pleine largeur pour la page d'accueil. Affiche une image de fond avec un dégradé sombre, le nom de l'établissement, un sous-titre, une accroche et un lien CTA. Conçu comme un island React dans Astro.",
      },
    },
  },
  argTypes: {
    backgroundImage: {
      control: "text",
      description: "URL de l'image de fond.",
    },
    title: {
      control: "text",
      description: "Titre principal (h1). Défaut : « LES BALCONS ».",
    },
    subtitle: {
      control: "text",
      description: "Sous-titre affiché sous le h1.",
    },
    tagline: {
      control: "text",
      description: "Courte accroche affichée sous le sous-titre.",
    },
    ctaLabel: {
      control: "text",
      description: "Texte du lien CTA.",
    },
    ctaHref: {
      control: "text",
      description: "URL cible du lien CTA.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Affichage complet avec tous les éléments : titre, sous-titre, accroche et CTA.
 */
export const Default: Story = {
  name: "Default (complet)",
  args: {
    backgroundImage: "https://picsum.photos/seed/balcons-hero/1440/850",
    title: "LES BALCONS",
    subtitle: "Auberge & Bistro culturel",
    tagline:
      "Votre escapade culturelle à Baie-Saint-Paul, Charlevoix depuis 2017",
    ctaLabel: "Disponibilités et tarifs →",
    ctaHref: "/reservations",
  },
};

/**
 * Version minimale : seulement l'image de fond et le titre par défaut.
 */
export const Minimal: Story = {
  name: "Minimal (titre seul)",
  args: {
    backgroundImage: "https://picsum.photos/seed/balcons-minimal/1440/850",
  },
};

/**
 * Sans lien CTA — utile pour des pages secondaires qui n'ont pas d'appel à l'action.
 */
export const WithoutCTA: Story = {
  name: "Sans CTA",
  args: {
    backgroundImage: "https://picsum.photos/seed/balcons-nocta/1440/850",
    title: "LES BALCONS",
    subtitle: "Auberge & Bistro culturel",
    tagline:
      "Votre escapade culturelle à Baie-Saint-Paul, Charlevoix depuis 2017",
  },
};

/**
 * Titre et sous-titre personnalisés — pour une page secondaire (ex. Le Bistro).
 */
export const CustomContent: Story = {
  name: "Contenu personnalisé",
  args: {
    backgroundImage: "https://picsum.photos/seed/balcons-bistro/1440/850",
    title: "LE BISTRO",
    subtitle: "Gastronomie & culture locale",
    tagline: "Une expérience culinaire unique au cœur de Charlevoix",
    ctaLabel: "Voir le menu →",
    ctaHref: "/bistro/menu",
  },
};
