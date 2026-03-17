import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./Footer";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    lang: {
      control: "radio",
      options: ["fr", "en"],
      description: "Language variant for all footer copy.",
      table: {
        defaultValue: { summary: "fr" },
      },
    },
  },
  args: {
    lang: "fr",
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Default desktop story — French copy, full-width footer on a light
 * background so the dark green footer stands out visually.
 */
export const Default: Story = {
  name: "Default (Desktop, FR)",
  args: {
    lang: "fr",
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "Standard desktop layout (≥1024 px). Three-column grid: logo + copyright, nav pills, contact + social.",
      },
    },
  },
};

/**
 * Mobile viewport story — same French copy rendered at 375 px wide so
 * Storybook shows the stacked single-column layout and the rounded top corners.
 */
export const Mobile: Story = {
  name: "Mobile (375px, FR)",
  args: {
    lang: "fr",
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Mobile layout (<1024 px). Single-column stacked layout with rounded-tl-[32px] rounded-tr-[32px] top corners.",
      },
    },
  },
};

/**
 * English variant — identical layout, all copy translated to English.
 */
export const English: Story = {
  name: "English Variant (Desktop, EN)",
  args: {
    lang: "en",
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "English copy variant. All nav links, policy links, and contact labels are rendered in English.",
      },
    },
  },
};
