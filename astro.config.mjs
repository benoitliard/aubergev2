import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
      useCdn: false,
      studioBasePath: "/studio",
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
  output: "static",

  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
    fallback: {
      en: "fr",
    },
  },
});
