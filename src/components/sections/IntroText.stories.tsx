import type { Meta, StoryObj } from "@storybook/react-vite";
import IntroText from "./IntroText";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof IntroText> = {
  title: "Sections/IntroText",
  component: IntroText,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Bloc de texte centré pour introduire une page ou une section. Utilise la typographie body-md du design system et respecte une largeur maximale de 900 px pour une lisibilité optimale.",
      },
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "Contenu textuel du paragraphe d'introduction.",
    },
    className: {
      control: "text",
      description: "Classes Tailwind additionnelles appliquées au conteneur.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IntroText>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Affichage par défaut avec un texte représentatif du contenu de l'Auberge.
 */
export const Default: Story = {
  name: "Default",
  args: {
    text: "Niché dans les hauteurs de Baie-Saint-Paul, Les Balcons est une auberge unique alliant hébergement chaleureux et vie culturelle. Ici, l'art, la gastronomie et la nature se rencontrent pour offrir une expérience inoubliable au cœur de Charlevoix.",
  },
};

/**
 * Texte court — vérifie que le composant reste bien centré avec peu de contenu.
 */
export const ShortText: Story = {
  name: "Texte court",
  args: {
    text: "Bienvenue aux Balcons.",
  },
};

/**
 * Texte long — vérifie le comportement sur plusieurs lignes et le plafond à 900 px.
 */
export const LongText: Story = {
  name: "Texte long",
  args: {
    text: "Depuis 2017, Les Balcons accueille les voyageurs en quête d'authenticité et de dépaysement. Notre auberge propose des chambres confortables avec vue panoramique sur les montagnes, un bistro culturel animé par des artistes locaux, et une programmation d'événements qui célèbre le patrimoine vivant de Charlevoix. Que vous veniez pour un week-end de détente, une escapade gastronomique ou une immersion dans la culture québécoise, Les Balcons vous réserve une expérience sur mesure, à la hauteur de vos attentes.",
  },
};

/**
 * Avec className personnalisé — illustre l'extension via la prop className.
 */
export const WithCustomBackground: Story = {
  name: "Fond personnalisé",
  args: {
    text: "Découvrez notre auberge unique, un lieu de vie culturelle et de bien-être.",
    className: "bg-[var(--color-green-light)]",
  },
};
