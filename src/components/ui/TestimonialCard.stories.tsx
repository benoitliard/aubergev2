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
          "Carte de témoignage client avec pill de catégorie (L'Auberge ou Le Bistro), citation et nom de l'auteur. Coins arrondis 32px, fond blanc.",
      },
    },
  },
  argTypes: {
    category: {
      control: "object",
      description: "Catégorie affichée en pill (label + couleur)",
    },
    text: {
      control: "text",
      description: "Contenu du témoignage",
    },
    author: {
      control: "text",
      description: "Nom de l'auteur",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 804, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Auberge: Story = {
  name: "L'Auberge",
  args: {
    category: { label: "L'Auberge", color: "var(--color-yellow-500)" },
    text: "« C'est un endroit fantastique! J'avais une chambre individuelle de belle grandeur et lumineuse. Hyper propre sdb et douche tout est nickel. Cuisine immense et bien équipée. Des balcons partout. Vue imprenable sur un immense jardin. J'ai hâte d'y retourner. »",
    author: "Françoise L.",
  },
};

export const Bistro: Story = {
  name: "Le Bistro",
  args: {
    category: { label: "Le Bistro", color: "var(--color-purple-500)" },
    text: "« Bel endroit avec une super vibe! J'ai adoré le 5@7 avec un DJ. Beau menu, simple mais avec de bonnes options végé. Bons choix de drinks. Super expérience. »",
    author: "Cécile L.",
  },
};
