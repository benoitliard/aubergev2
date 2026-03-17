import type { Meta, StoryObj } from "@storybook/react-vite";
import Newsletter from "./Newsletter";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Newsletter> = {
  title: "Sections/Newsletter",
  component: Newsletter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Section d'abonnement à l'infolettre de L'Auberge. Utilisé comme island React dans Astro. Inclut une validation courriel côté client et une gestion d'état du formulaire.",
      },
    },
  },
  argTypes: {
    onSubmit: {
      description:
        "Callback déclenché avec les données validées lors de la soumission du formulaire.",
      action: "submitted",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Newsletter>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * État par défaut : aucun gestionnaire de soumission externe.
 * La section affiche le formulaire complet avec logo, titre et champs.
 */
export const Default: Story = {
  name: "Default",
  args: {},
};

/**
 * Avec gestionnaire `onSubmit` : simule une intégration réelle.
 * Ouvrez l'onglet "Actions" dans Storybook pour voir les données soumises.
 */
export const WithSubmitHandler: Story = {
  name: "With onSubmit handler",
  args: {
    onSubmit: (data) => {
      console.log("[Newsletter] Form submitted:", data);
    },
  },
};
