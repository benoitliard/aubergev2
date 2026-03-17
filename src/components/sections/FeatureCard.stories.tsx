import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureCard } from "./FeatureCard";

const meta: Meta<typeof FeatureCard> = {
  title: "Sections/FeatureCard",
  component: FeatureCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    universe: {
      control: "radio",
      options: ["auberge", "bistro"],
      description:
        "Universe determines the background color and image/text layout direction",
    },
    title: { control: "text" },
    description: { control: "text" },
    image: { control: "text" },
    imageAlt: { control: "text" },
    ctaLabel: { control: "text" },
    ctaHref: { control: "text" },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="py-12 bg-[var(--color-beige-100)]">
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
      "Nichée au coeur du massif des Belledonne, notre auberge vous accueille dans un cadre authentique et chaleureux. Chambres confortables, cuisine du terroir et panoramas à couper le souffle.",
    image: "https://picsum.photos/seed/auberge/1200/800",
    imageAlt: "Vue intérieure de l'auberge Les Balcons",
    ctaLabel: "Découvrir l'auberge",
    ctaHref: "#auberge",
  },
};

export const Bistro: Story = {
  name: "Le Bistro",
  args: {
    universe: "bistro",
    title: "Le Bistro",
    description:
      "Le Bistro des Balcons vous propose une cuisine généreuse et conviviale, élaborée à partir des produits locaux de la région. Venez vous régaler en famille ou entre amis.",
    image: "https://picsum.photos/seed/bistro/1200/800",
    imageAlt: "Vue de la salle du Bistro Les Balcons",
    ctaLabel: "Découvrir le bistro",
    ctaHref: "#bistro",
  },
};

export const AllVariants: Story = {
  name: "Both variants — side by side",
  render: () => (
    <div className="flex flex-col gap-8 py-8 bg-[var(--color-beige-100)]">
      <FeatureCard
        universe="auberge"
        title="L'Auberge"
        description="Nichée au coeur du massif des Belledonne, notre auberge vous accueille dans un cadre authentique et chaleureux."
        image="https://picsum.photos/seed/auberge/1200/800"
        imageAlt="Vue intérieure de l'auberge Les Balcons"
        ctaLabel="Découvrir l'auberge"
        ctaHref="#auberge"
      />
      <FeatureCard
        universe="bistro"
        title="Le Bistro"
        description="Le Bistro des Balcons vous propose une cuisine généreuse et conviviale, élaborée à partir des produits locaux de la région."
        image="https://picsum.photos/seed/bistro/1200/800"
        imageAlt="Vue de la salle du Bistro Les Balcons"
        ctaLabel="Découvrir le bistro"
        ctaHref="#bistro"
      />
    </div>
  ),
};
