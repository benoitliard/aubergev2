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
          "Section carrousel de témoignages clients. Affiche 2 cartes côte à côte sur desktop, 1 sur mobile. Navigation avec ArrowButton et indicateurs visuels.",
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
      description: "Tableau de témoignages",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialCarousel>;

// ---------------------------------------------------------------------------
// Placeholder data
// ---------------------------------------------------------------------------

const SAMPLE_TESTIMONIALS = [
  {
    text: "Un endroit absolument magnifique. Le personnel est aux petits soins et la cuisine est exceptionnelle. Nous reviendrons sans hésiter.",
    author: "Marie-Claire Dupont",
    source: "Google",
  },
  {
    text: "Le meilleur séjour de notre vie. Les balcons avec vue sur les montagnes sont à couper le souffle, et l'auberge propose une atmosphère chaleureuse et conviviale.",
    author: "Jean-Pierre Martin",
    source: "TripAdvisor",
  },
  {
    text: "Une expérience gastronomique inoubliable au Bistro. Les produits locaux mis en valeur avec talent, dans un cadre naturel exceptionnel.",
    author: "Sophie Leroux",
    source: "Google",
  },
  {
    text: "Accueil chaleureux, chambre confortable et petit-déjeuner délicieux en terrasse avec panorama sur les sommets. Une adresse que nous recommandons à tous.",
    author: "Thomas et Isabelle Berger",
    source: "Booking",
  },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default — 4 Testimonials",
  args: {
    title: "Ce que nos clients disent de nous",
    testimonials: SAMPLE_TESTIMONIALS,
  },
};

export const TwoTestimonials: Story = {
  name: "Two Testimonials",
  args: {
    title: "Ce que nos clients disent de nous",
    testimonials: SAMPLE_TESTIMONIALS.slice(0, 2),
  },
};

export const CustomTitle: Story = {
  name: "Custom Title",
  args: {
    title: "Ils nous font confiance",
    testimonials: SAMPLE_TESTIMONIALS,
  },
};
