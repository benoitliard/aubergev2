import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ServiceCard } from "./ServiceCard";

const meta: Meta<typeof ServiceCard> = {
  title: "UI/ServiceCard",
  component: ServiceCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carte service vert clair avec photo arrondie, titre h5, description, et CTA (lien texte ou bouton pill). Fond vert-light (#d4df90), coins arrondis 48px.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: 490 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const TextLink: Story = {
  name: "With text link CTA",
  args: {
    title: "Coworking",
    description: "Espace coworking ouvert tous les jours de 9h à 17h.",
    image: "https://picsum.photos/seed/cowork/980/700",
    href: "/coworking",
    ctaLabel: "En savoir plus",
    ctaVariant: "link",
  },
};

export const ButtonCTA: Story = {
  name: "With button CTA",
  args: {
    title: "Événements",
    description:
      "Lieu de vie bien ancré dans sa communauté, le Bistro te propose une programmation culturelle variée et une foule d'événements spontanés.",
    image: "https://picsum.photos/seed/events/980/700",
    href: "/evenements",
    ctaLabel: "Découvrir la programmation",
    ctaVariant: "button",
  },
};
