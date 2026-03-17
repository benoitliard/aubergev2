import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestimonialCarousel } from "./TestimonialCarousel";

const meta: Meta<typeof TestimonialCarousel> = {
  title: "Sections/TestimonialCarousel",
  component: TestimonialCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Carrousel de témoignages clients. Cards en 804px avec overflow horizontal, pill catégorie (L'Auberge/Le Bistro), navigation compteur + flèches en bas à droite.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Titre de la section",
    },
    testimonials: {
      control: "object",
      description: "Tableau de témoignages avec catégorie",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialCarousel>;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SAMPLE_TESTIMONIALS = [
  {
    category: { label: "L'Auberge", color: "var(--color-yellow-500)" },
    text: "« C'est un endroit fantastique! J'avais une chambre individuelle de belle grandeur et lumineuse. Hyper propre sdb et douche tout est nickel. Cuisine immense et bien équipée. Des balcons partout. Vue imprenable sur un immense jardin. J'ai hâte d'y retourner. »",
    author: "Françoise L.",
  },
  {
    category: { label: "Le Bistro", color: "var(--color-purple-500)" },
    text: "« Bel endroit avec une super vibe! J'ai adoré le 5@7 avec un DJ. Beau menu, simple mais avec de bonnes options végé. Bons choix de drinks. Super expérience. »",
    author: "Cécile L.",
  },
  {
    category: { label: "L'Auberge", color: "var(--color-yellow-500)" },
    text: "« C'est un endroit fantastique! J'avais une chambre individuelle de belle grandeur et lumineuse. Hyper propre sdb et douche tout est nickel. Cuisine immense et bien équipée. Des balcons partout. Vue imprenable sur un immense jardin. J'ai hâte d'y retourner. »",
    author: "Françoise L.",
  },
  {
    category: { label: "Le Bistro", color: "var(--color-purple-500)" },
    text: "« Le meilleur séjour de notre vie. Les balcons avec vue sur les montagnes sont à couper le souffle, et l'auberge propose une atmosphère chaleureuse et conviviale. »",
    author: "Jean-Pierre M.",
  },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default — 4 Testimonials",
  args: {
    testimonials: SAMPLE_TESTIMONIALS,
  },
};

export const TwoTestimonials: Story = {
  name: "Two Testimonials",
  args: {
    testimonials: SAMPLE_TESTIMONIALS.slice(0, 2),
  },
};
