import { defineField, defineType } from "sanity";
import { localizedText } from "./helpers/localizedFields";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  groups: [
    { name: "content", title: "📝 Contenu", default: true },
    { name: "settings", title: "⚙️ Paramètres" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nom du client",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    {
      ...localizedText("text", "Témoignage", { required: true }),
      group: "content",
    },
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "L'Auberge", value: "auberge" },
          { title: "Le Bistro", value: "bistro" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "TripAdvisor", value: "tripadvisor" },
          { title: "Facebook", value: "facebook" },
          { title: "Autre", value: "autre" },
        ],
      },
    }),
    defineField({
      name: "rating",
      title: "Note (sur 5)",
      type: "number",
      group: "settings",
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "featured",
      title: "⭐ Afficher sur la page d'accueil",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", featured: "featured" },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: subtitle === "auberge" ? "L'Auberge" : "Le Bistro",
      };
    },
  },
});
