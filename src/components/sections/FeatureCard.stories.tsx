import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureCard } from "./FeatureCard";

const meta: Meta<typeof FeatureCard> = {
  title: "Sections/FeatureCard",
  component: FeatureCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Grande carte vitrine pour L'Auberge (jaune, texte à gauche) ou Le Bistro (violet, texte à droite). Photo masquée en silhouette de mascotte. Deux CTAs : bouton pill charcoal + lien texte souligné.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="py-14 px-6 bg-[var(--color-beige-100)]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const Auberge: Story = {
  name: "L'Auberge",
  args: {
    universe: "auberge",
    title: "L'Auberge",
    description:
      "L'auberge propose une expérience d'hébergement abordable et conviviale. Des chambres privées (individuelles, doubles ou triples), des dortoirs, une suite avec salon, cuisine et salle-de-bain pouvant accueillir jusqu'à 4 personnes, sans oublier nos grands espaces communs offrant une vue imprenable sur le fleuve et les montagnes environnantes.",
    image: "https://picsum.photos/seed/auberge/1200/800",
    primaryCta: { label: "Je découvre les chambres", href: "/auberge" },
    secondaryCta: { label: "Je réserve une chambre", href: "/reservations" },
  },
};

export const Bistro: Story = {
  name: "Le Bistro",
  args: {
    universe: "bistro",
    title: "Le Bistro",
    description:
      "Ouvert à l'année en soirée le bistro te propose une cuisine savoureuse et réconfortante et plusieurs produits québécois à découvrir en fût ou en bouteilles! C'est aussi un lieu de vie bien ancré dans sa communauté avec une programmation culturelle variée et une foule d'événements spontanés à chaque semaine.",
    image: "https://picsum.photos/seed/bistro/1200/800",
    primaryCta: { label: "Je découvre le bistro", href: "/bistro" },
    secondaryCta: { label: "Voir le menu", href: "/bistro/menu" },
  },
};

export const BothVariants: Story = {
  name: "Both — stacked (homepage layout)",
  render: () => (
    <div className="flex flex-col gap-6">
      <FeatureCard
        universe="auberge"
        title="L'Auberge"
        description="L'auberge propose une expérience d'hébergement abordable et conviviale. Des chambres privées, des dortoirs, une suite, et nos grands espaces communs offrant une vue imprenable."
        image="https://picsum.photos/seed/auberge/1200/800"
        primaryCta={{ label: "Je découvre les chambres", href: "/auberge" }}
        secondaryCta={{ label: "Je réserve une chambre", href: "/reservations" }}
      />
      <FeatureCard
        universe="bistro"
        title="Le Bistro"
        description="Ouvert à l'année en soirée, le bistro te propose une cuisine savoureuse et une programmation culturelle variée."
        image="https://picsum.photos/seed/bistro/1200/800"
        primaryCta={{ label: "Je découvre le bistro", href: "/bistro" }}
        secondaryCta={{ label: "Voir le menu", href: "/bistro/menu" }}
      />
    </div>
  ),
};
