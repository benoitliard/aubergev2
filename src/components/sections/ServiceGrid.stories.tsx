import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ServiceGrid } from "./ServiceGrid";

const SAMPLE_SERVICES = [
  {
    title: "Groupes & affaires",
    description: "Séminaires et réunions professionnelles",
    image: "https://picsum.photos/seed/groups/640/640",
    href: "#groupes",
  },
  {
    title: "Coworking",
    description: "Espaces de travail flexibles",
    image: "https://picsum.photos/seed/cowork/640/640",
    href: "#coworking",
  },
  {
    title: "Événements",
    description: "Mariages, séminaires, célébrations",
    image: "https://picsum.photos/seed/events/640/640",
    href: "#evenements",
  },
  {
    title: "Activités outdoor",
    description: "Randonnées, ski, via ferrata",
    image: "https://picsum.photos/seed/outdoor/640/640",
    href: "#activites",
  },
  {
    title: "Bien-être",
    description: "Spa, massages, détente",
    image: "https://picsum.photos/seed/wellness/640/640",
    href: "#bien-etre",
  },
  {
    title: "Gastronomie",
    description: "Saveurs locales et cuisine du terroir",
    image: "https://picsum.photos/seed/gastro/640/640",
    href: "#gastronomie",
  },
];

const meta: Meta<typeof ServiceGrid> = {
  title: "Sections/ServiceGrid",
  component: ServiceGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
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
type Story = StoryObj<typeof ServiceGrid>;

export const FullGrid: Story = {
  name: "Full grid — 6 services",
  args: {
    services: SAMPLE_SERVICES,
  },
};

export const TwoItems: Story = {
  name: "Partial grid — 2 items",
  args: {
    services: SAMPLE_SERVICES.slice(0, 2),
  },
};

export const NoDescriptions: Story = {
  name: "Without descriptions",
  args: {
    services: SAMPLE_SERVICES.map(({ title, image, href }) => ({
      title,
      image,
      href,
    })),
  },
};
