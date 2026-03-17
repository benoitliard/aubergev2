import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: "cx8ev1gh",
      dataset: "production",
      useCdn: false,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),

  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    fallback: {
      en: "fr",
    },
  },
});
