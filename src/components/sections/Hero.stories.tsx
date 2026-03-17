import type { Meta, StoryObj } from "@storybook/react-vite";
import Hero from "./Hero";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Hero> = {
  title: "Sections/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Section hero de la page d'accueil. Fond vert foncé avec titre display, sous-titre, description, widget de réservation Beds24, et photo avec masque en double arche (silhouette mascotte).",
      },
    },
  },
  argTypes: {
    heroImage: {
      control: "text",
      description: "URL de la photo hero affichée dans le masque en arche.",
    },
    heroImageAlt: {
      control: "text",
      description: "Texte alternatif pour la photo hero.",
    },
    bookingUrl: {
      control: "text",
      description: "URL du widget iframe Beds24. Masqué si omis.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Affichage complet avec photo et widget de réservation.
 */
export const Default: Story = {
  name: "Default (complet)",
  args: {
    heroImage: "https://picsum.photos/seed/balcons-hero/1920/1038",
    bookingUrl: "https://beds24.com/booking2.php?propid=example",
  },
};

/**
 * Version minimale : seulement la photo, sans widget de réservation.
 */
export const WithoutBooking: Story = {
  name: "Sans widget réservation",
  args: {
    heroImage: "https://picsum.photos/seed/balcons-hero/1920/1038",
  },
};
