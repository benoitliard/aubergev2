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
// Placeholder data — logos SVG inline via data URI for Storybook
// ---------------------------------------------------------------------------

function placeholderLogo(label: string, width = 120, height = 40): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" rx="4" fill="%23d1cfc6"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%231d1c17">${label}</text></svg>`;
  return `data:image/svg+xml,${svg}`;
}

const SAMPLE_PARTNERS = [
  {
    name: "Tourisme Québec",
    logo: placeholderLogo("Tourisme Québec", 140, 50),
    url: "https://www.bonjourquebec.com",
  },
  {
    name: "Signature Charlevoix",
    logo: placeholderLogo("Signature Charlevoix", 140, 50),
    url: "https://www.signaturecharlevoix.com",
  },
  {
    name: "Gîtes Canada",
    logo: placeholderLogo("Gîtes Canada", 100, 50),
  },
  {
    name: "TripAdvisor",
    logo: placeholderLogo("TripAdvisor", 120, 50),
    url: "https://www.tripadvisor.com",
  },
  {
    name: "Relais & Châteaux",
    logo: placeholderLogo("Relais & Châteaux", 130, 50),
  },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default — 5 Partners",
  args: {
    partners: SAMPLE_PARTNERS,
  },
};

export const WithLinks: Story = {
  name: "All With Links",
  args: {
    partners: SAMPLE_PARTNERS.map((p) => ({
      ...p,
      url: p.url ?? "https://example.com",
    })),
  },
};

export const FewPartners: Story = {
  name: "Few Partners (2)",
  args: {
    partners: SAMPLE_PARTNERS.slice(0, 2),
  },
};
