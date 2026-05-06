import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const SINGLETON_TYPES = new Set(["homePage"]);
const SINGLETON_ACTIONS = new Set(["unpublish", "delete", "duplicate"]);

export default defineConfig({
  name: "les-balcons",
  title: "Les Balcons — Auberge & Bistro culturel",

  projectId: "cx8ev1gh",
  dataset: "production",
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            S.listItem()
              .title("🏠 Page d'accueil")
              .id("homePage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .title("Page d'accueil")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETON_TYPES.has(item.getId() ?? "")
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2025-03-17" }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) => action && !SINGLETON_ACTIONS.has(action))
        : input,
  },
});
