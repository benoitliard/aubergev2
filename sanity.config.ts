import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "les-balcons",
  title: "Les Balcons — Auberge & Bistro culturel",

  projectId: "cx8ev1gh",
  dataset: "production",
  basePath: "/studio",

  plugins: [structureTool(), visionTool({ defaultApiVersion: "2025-03-17" })],

  schema: {
    types: schemaTypes,
  },
});
