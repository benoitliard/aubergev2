import type { Meta, StoryObj } from "@storybook/react-vite";
import { ServiceGrid } from "./ServiceGrid";

const SERVICES = [
  {
    title: "Groupes et affaires",
    description:
      "Conférences, réunions, retraites d'équipe ou activités de team building : une variété d'options pour un service clé en main au cœur de Baie-Saint-Paul.",
    image: "https://picsum.photos/seed/groups/980/700",
    href: "/groupes",
  },
  {
    title: "Coworking",
    description: "Espace coworking ouvert tous les jours de 9h à 17h.",
    image: "https://picsum.photos/seed/cowork/980/700",
    href: "/coworking",
  },
  {
    title: "Événements",
    description:
      "Lieu de vie bien ancré dans sa communauté, le Bistro te propose une programmation culturelle variée et une foule d'événements spontanés.",
    image: "https://picsum.photos/seed/events/980/700",
    href: "/evenements",
    ctaLabel: "Découvrir la programmation",
    ctaVariant: "button" as const,
  },
  {
    title: "Boutique et friperie",
    description:
      "Viens faire un tour à notre boutique à l'accueil. Tu trouveras de tout : une friperie de vêtements, de l'art, du pain de la boulangerie d'à côté et bien plus !",
    image: "https://picsum.photos/seed/boutique/980/700",
    href: "/boutique",
  },
  {
    title: "Promotion et offres partenaires",
    description:
      "On te fait économiser grâce à nos partenariats locaux et à nos promos sur l'hébergement",
    image: "https://picsum.photos/seed/promos/980/700",
    href: "/offres-partenaires",
    ctaLabel: "Voir les offres",
  },
  {
    title: "Quoi faire ?",
    description:
      "Que ce soit aux Balcons, dans Baie-Saint-Paul ou dans Charlevoix : détente, plein air, agrotourisme, art et culture… une foule d'idées pour un séjour inoubliable!",
    image: "https://picsum.photos/seed/quoifaire/980/700",
    href: "/quoi-faire",
    ctaLabel: "Voir les suggestions",
  },
];

const meta: Meta<typeof ServiceGrid> = {
  title: "Sections/ServiceGrid",
  component: ServiceGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Grille de services en 3 colonnes décalées (masonry). Fond beige, cards vert clair avec photo arrondie, titre, description et CTA.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ServiceGrid>;

export const Default: Story = {
  name: "Default — 6 services",
  args: {
    services: SERVICES,
  },
};
