import type { Meta, StoryObj } from "@storybook/react-vite";
import PhotoGallery from "./PhotoGallery";

const meta: Meta<typeof PhotoGallery> = {
  title: "Sections/PhotoGallery",
  component: PhotoGallery,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Carrousel horizontal de photos. Images rectangulaires (positions 0, 2) avec rounded-[32px] et image en arche (position 1) avec pill-top. Navigation compteur + flèches en bas à droite.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhotoGallery>;

const IMAGES = [
  { src: "https://picsum.photos/seed/balcons-g1/1400/1056", alt: "Spectacle au Bistro" },
  { src: "https://picsum.photos/seed/balcons-g2/742/1056", alt: "L'auberge en automne" },
  { src: "https://picsum.photos/seed/balcons-g3/1400/1056", alt: "Chambre dortoir" },
  { src: "https://picsum.photos/seed/balcons-g4/1400/1056", alt: "Terrasse été" },
  { src: "https://picsum.photos/seed/balcons-g5/742/1056", alt: "Vue sur le fleuve" },
  { src: "https://picsum.photos/seed/balcons-g6/1400/1056", alt: "Cuisine commune" },
];

export const Default: Story = {
  name: "Default — 6 photos",
  args: {
    images: IMAGES,
  },
};

export const ThreePhotos: Story = {
  name: "3 photos",
  args: {
    images: IMAGES.slice(0, 3),
  },
};
