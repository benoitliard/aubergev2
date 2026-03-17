import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ServiceCard } from "./ServiceCard";

const meta: Meta<typeof ServiceCard> = {
  title: "UI/ServiceCard",
  component: ServiceCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Card title displayed at the bottom",
    },
    description: {
      control: "text",
      description: "Optional short description below the title",
    },
    image: {
      control: "text",
      description: "URL of the background image",
    },
    href: {
      control: "text",
      description: "Link destination",
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  name: "Default (title only)",
  args: {
    title: "Groupes & affaires",
    image: "https://picsum.photos/seed/groups/640/640",
    href: "#groupes",
  },
};

export const WithDescription: Story = {
  name: "With description",
  args: {
    title: "Coworking",
    description: "Espaces de travail flexibles au coeur des Alpes",
    image: "https://picsum.photos/seed/cowork/640/640",
    href: "#coworking",
  },
};

export const Evenements: Story = {
  name: "Événements",
  args: {
    title: "Événements",
    description: "Séminaires, mariages, célébrations",
    image: "https://picsum.photos/seed/events/640/640",
    href: "#evenements",
  },
};
