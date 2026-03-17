import type { Meta, StoryObj } from "@storybook/react-vite";
import PhotoGallery from "./PhotoGallery";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof PhotoGallery> = {
  title: "Sections/PhotoGallery",
  component: PhotoGallery,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Grille de 3 photos côte à côte. L'image du milieu utilise un ratio portrait (3/4) tandis que les images latérales utilisent un ratio paysage (4/3), conformément au design Figma. Sur mobile, les images s'empilent verticalement.",
      },
    },
  },
  argTypes: {
    images: {
      description:
        "Tableau de 3 images ({ src, alt }). Les images supplémentaires sont ignorées.",
    },
    className: {
      control: "text",
      description: "Classes Tailwind additionnelles appliquées au conteneur.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PhotoGallery>;

// ---------------------------------------------------------------------------
// Seed helpers (stable picsum seeds for consistent previews)
// ---------------------------------------------------------------------------

const LANDSCAPE_1 = "https://picsum.photos/seed/balcons-g1/800/600";
const PORTRAIT_MID = "https://picsum.photos/seed/balcons-g2/600/800";
const LANDSCAPE_2 = "https://picsum.photos/seed/balcons-g3/800/600";

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Affichage par défaut — 3 photos représentant l'auberge, le bistro et les extérieurs.
 */
export const Default: Story = {
  name: "Default",
  args: {
    images: [
      { src: LANDSCAPE_1, alt: "Chambre avec vue sur la vallée de Charlevoix" },
      { src: PORTRAIT_MID, alt: "Salle à manger du Bistro culturel" },
      { src: LANDSCAPE_2, alt: "Terrasse et jardins en été" },
    ],
  },
};

/**
 * Image unique — vérifie la robustesse lorsque moins de 3 images sont fournies.
 */
export const SingleImage: Story = {
  name: "Image unique",
  args: {
    images: [
      { src: LANDSCAPE_1, alt: "Vue panoramique depuis les Balcons" },
    ],
  },
};

/**
 * Deux images — vérification intermédiaire (2 colonnes sur desktop).
 */
export const TwoImages: Story = {
  name: "Deux images",
  args: {
    images: [
      { src: LANDSCAPE_1, alt: "Chambre avec vue sur la vallée de Charlevoix" },
      { src: PORTRAIT_MID, alt: "Salle à manger du Bistro culturel" },
    ],
  },
};

/**
 * Quatre images fournies — seules les 3 premières sont affichées.
 */
export const FourImagesProvided: Story = {
  name: "4 images (3 affichées)",
  args: {
    images: [
      { src: LANDSCAPE_1, alt: "Chambre avec vue sur la vallée de Charlevoix" },
      { src: PORTRAIT_MID, alt: "Salle à manger du Bistro culturel" },
      { src: LANDSCAPE_2, alt: "Terrasse et jardins en été" },
      { src: "https://picsum.photos/seed/balcons-g4/800/600", alt: "Image ignorée" },
    ],
  },
};

/**
 * Avec className personnalisé — illustre l'ajout d'un fond de couleur via className.
 */
export const WithCustomBackground: Story = {
  name: "Fond personnalisé",
  args: {
    images: [
      { src: LANDSCAPE_1, alt: "Chambre avec vue sur la vallée de Charlevoix" },
      { src: PORTRAIT_MID, alt: "Salle à manger du Bistro culturel" },
      { src: LANDSCAPE_2, alt: "Terrasse et jardins en été" },
    ],
    className: "bg-[var(--color-charcoal)] py-16",
  },
};
