import type { Meta, StoryObj } from "@storybook/react-vite";
import { PartnersBar } from "./PartnersBar";

const meta: Meta<typeof PartnersBar> = {
  title: "Sections/PartnersBar",
  component: PartnersBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Barre de partenaires/sponsors affichant les logos en niveaux de gris avec transition vers la couleur au survol. Liens optionnels. Responsive : wrap sur mobile, justify-between sur desktop.",
      },
    },
  },
  argTypes: {
    partners: {
      control: "object",
      description: "Liste des partenaires avec nom, logo et URL optionnelle",
    },
    className: {
      control: "text",
      description: "Classes Tailwind supplémentaires",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PartnersBar>;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PARTNERS = [
  {
    name: "SODEC Québec",
    logo: "/partners/sodec-quebec.png",
    url: "https://www.sodec.gouv.qc.ca",
  },
  {
    name: "Desjardins",
    logo: "/partners/desjardins.png",
    url: "https://www.desjardins.com",
  },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default",
  args: {
    partners: PARTNERS,
  },
};

export const Repeated: Story = {
  name: "Repeated (Figma layout)",
  args: {
    partners: [...PARTNERS, ...PARTNERS],
  },
};
