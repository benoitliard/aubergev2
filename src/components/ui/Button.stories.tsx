import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "secondary", "cta"],
      description: "Visual style of the button",
    },
    size: {
      control: "radio",
      options: ["default", "small"],
      description: "Size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    href: {
      control: "text",
      description: "When provided, renders as an anchor tag",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// --- Variants ---

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Découvrir",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "En savoir plus",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Voir le menu",
  },
};

export const CTA: Story = {
  name: "CTA (Je réserve)",
  args: {
    variant: "cta",
    children: "Je réserve",
  },
};

// --- Sizes ---

export const SmallPrimary: Story = {
  name: "Small — Primary",
  args: {
    variant: "primary",
    size: "small",
    children: "Découvrir",
  },
};

export const SmallCTA: Story = {
  name: "Small — CTA",
  args: {
    variant: "cta",
    size: "small",
    children: "Je réserve",
  },
};

// --- Link (as anchor) ---

export const WithHref: Story = {
  name: "As Link (href)",
  args: {
    variant: "primary",
    href: "https://example.com",
    children: "Visiter le site",
  },
};

export const OutlineWithHref: Story = {
  name: "Outline As Link (href)",
  args: {
    variant: "outline",
    href: "https://example.com",
    children: "En savoir plus",
  },
};

// --- Disabled states ---

export const DisabledPrimary: Story = {
  name: "Disabled — Primary",
  args: {
    variant: "primary",
    disabled: true,
    children: "Indisponible",
  },
};

export const DisabledCTA: Story = {
  name: "Disabled — CTA",
  args: {
    variant: "cta",
    disabled: true,
    children: "Complet",
  },
};

export const DisabledOutline: Story = {
  name: "Disabled — Outline",
  args: {
    variant: "outline",
    disabled: true,
    children: "Indisponible",
  },
};

// --- All variants overview ---

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="cta">Je réserve</Button>
    </div>
  ),
};
