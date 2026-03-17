import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
  ],

  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [tailwindcss()],
    });
  },

  docs: {
    autodocs: "tag",
  },
};

export default config;
