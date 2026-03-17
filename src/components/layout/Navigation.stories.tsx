import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navigation } from "./Navigation";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Navigation> = {
  title: "Layout/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    // Override the default "centered" layout from preview.ts so the nav
    // stretches edge-to-edge as it would in production.
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "Responsive navigation bar for Les Balcons.",
          "",
          "- **Desktop (≥1024px):** Logo left, nav links + CTA right. Height 136px (1440px) / 153px (1920px).",
          "- **Mobile (<1024px):** Logo left, inline reserve link + hamburger right. Height 90px.",
          "  Hamburger opens a full-screen dark overlay with vertical nav links and a close button.",
          "",
          "> **TODO:** Replace the text logo placeholder with a proper dark SVG variant for the beige background.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    currentPath: {
      control: "text",
      description: "Current page path — used to highlight the active nav link.",
    },
    lang: {
      control: "radio",
      options: ["fr", "en"],
      description: "Language prefix applied to internal links.",
    },
    reservationUrl: {
      control: "text",
      description: 'Booking URL for the "Je reserve" CTA button.',
    },
  },
  args: {
    currentPath: "/",
    lang: "fr",
    reservationUrl: "#reserver",
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Default desktop view at 1440px width.
 * Shows the full horizontal layout with logo, nav links and CTA.
 */
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop1440",
      viewports: {
        desktop1440: {
          name: "Desktop 1440px",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
    docs: {
      description: {
        story: "Full desktop layout at 1440px. Nav links are displayed inline with the CTA button.",
      },
    },
  },
};

/**
 * Wide desktop view at 1920px.
 * Larger text and wider gaps kick in via the `2xl:` Tailwind breakpoint.
 */
export const DesktopWide: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop1920",
      viewports: {
        desktop1920: {
          name: "Desktop 1920px",
          styles: { width: "1920px", height: "1080px" },
          type: "desktop",
        },
      },
    },
    docs: {
      description: {
        story: "Wide desktop layout at 1920px — larger font sizes and increased gap between links.",
      },
    },
  },
};

/**
 * Mobile view at 375px.
 * Shows the compact bar with the hamburger button (not open by default).
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile375",
      viewports: {
        mobile375: {
          name: "Mobile 375px",
          styles: { width: "375px", height: "812px" },
          type: "mobile",
        },
      },
    },
    docs: {
      description: {
        story:
          "Mobile layout at 375px. The hamburger button is visible. Click it inside Storybook to see the overlay menu open.",
      },
    },
  },
};

/**
 * Desktop with an active link highlighted (Le Bistro).
 * The active link receives an underline decoration.
 */
export const WithActiveLink: Story = {
  args: {
    currentPath: "/bistro",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop1440",
      viewports: {
        desktop1440: {
          name: "Desktop 1440px",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
    docs: {
      description: {
        story:
          'Active link state: "Le Bistro" is highlighted with an underline when `currentPath` matches `/bistro`.',
      },
    },
  },
};

/**
 * Mobile with an active link (Événements).
 * Active links in the mobile overlay are tinted with the brand green-light color.
 */
export const MobileWithActiveLink: Story = {
  args: {
    currentPath: "/evenements",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile375",
      viewports: {
        mobile375: {
          name: "Mobile 375px",
          styles: { width: "375px", height: "812px" },
          type: "mobile",
        },
      },
    },
    docs: {
      description: {
        story:
          'Mobile view with an active link. Open the overlay menu to see "Evenements" tinted in green-light.',
      },
    },
  },
};

/**
 * English language variant — links include the `/en` prefix.
 */
export const EnglishLanguage: Story = {
  args: {
    lang: "en",
    currentPath: "/en/bistro",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop1440",
      viewports: {
        desktop1440: {
          name: "Desktop 1440px",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
    docs: {
      description: {
        story: "English language variant. All internal links are prefixed with `/en`.",
      },
    },
  },
};
