import type { Meta, StoryObj } from "@storybook/react-vite";
import { FloatingCTA } from "./FloatingCTA";

const meta: Meta<typeof FloatingCTA> = {
  title: "UI/FloatingCTA",
  component: FloatingCTA,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Bouton flottant fixe en bas à droite de l'écran. Fond jaune (#ffb601), texte charcoal, forme pill. Sur mobile, s'étend en bas de l'écran. Utilisé comme raccourci de réservation persistant.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Texte du bouton",
    },
    href: {
      control: "text",
      description: "URL de destination",
    },
    className: {
      control: "text",
      description: "Classes Tailwind supplémentaires",
    },
  },
  // Decorator to give the button a realistic fixed-position context
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "60vh", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FloatingCTA>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default — Je réserve",
  args: {
    href: "/reservation",
    label: "Je réserve",
  },
};

export const CustomLabel: Story = {
  name: "Custom Label",
  args: {
    href: "/reservation",
    label: "Réserver maintenant",
  },
};

export const BookTable: Story = {
  name: "Book a Table",
  args: {
    href: "/bistro/reservation",
    label: "Réserver une table",
  },
};
