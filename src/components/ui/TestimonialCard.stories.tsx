import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestimonialCard } from "./TestimonialCard";

const meta: Meta<typeof TestimonialCard> = {
  title: "UI/TestimonialCard",
  component: TestimonialCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carte de témoignage client avec accent vert sur le côté gauche, guillemets français, nom de l'auteur et source optionnelle.",
      },
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "Contenu du témoignage",
    },
    author: {
      control: "text",
      description: "Nom de l'auteur du témoignage",
    },
    source: {
      control: "text",
      description: "Plateforme ou source du témoignage (ex: Google, TripAdvisor)",
    },
    className: {
      control: "text",
      description: "Classes Tailwind supplémentaires",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default",
  args: {
    text: "Un endroit absolument magnifique. Le personnel est aux petits soins et la cuisine est exceptionnelle. Nous reviendrons sans hésiter.",
    author: "Marie-Claire Dupont",
    source: "Google",
  },
};

export const WithoutSource: Story = {
  name: "Without Source",
  args: {
    text: "Une expérience inoubliable au cœur de la nature. Les balcons avec vue sur les montagnes sont à couper le souffle.",
    author: "Jean-Pierre Martin",
  },
};

export const LongText: Story = {
  name: "Long Text",
  args: {
    text: "Nous avons séjourné aux Balcons pendant notre voyage de noces et ce fut une expérience extraordinaire. La chambre était décorée avec goût, le petit-déjeuner servi en terrasse avec vue sur les sommets était un moment de pur bonheur. L'équipe, toujours disponible et attentionnée, a su rendre chaque instant magique. Le bistro propose une cuisine raffinée mettant en valeur les produits locaux. Une adresse que nous recommandons chaleureusement à tous ceux qui cherchent une escapade hors du commun.",
    author: "Sophie et Thomas Berger",
    source: "TripAdvisor",
  },
};

export const TripAdvisor: Story = {
  name: "TripAdvisor Review",
  args: {
    text: "Le meilleur hôtel que j'ai visité dans la région. Cadre naturel exceptionnel, accueil chaleureux et cuisine délicieuse.",
    author: "Luc Fontaine",
    source: "TripAdvisor",
  },
};
