import { defineField, defineType } from "sanity";
import { localizedString, localizedRichText } from "./helpers/localizedFields";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Article de blogue",
  type: "document",
  groups: [
    { name: "content", title: "📝 Contenu", default: true },
    { name: "settings", title: "⚙️ Paramètres" },
  ],
  fields: [
    { ...localizedString("title", "Titre", { required: true }), group: "content" },
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "settings",
      options: { source: "title.fr", maxLength: 96 },
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    { ...localizedRichText("body", "Contenu de l'article"), group: "content" },
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      group: "settings",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Actualités", value: "actualites" },
          { title: "Événements", value: "evenements" },
          { title: "Recettes", value: "recettes" },
          { title: "Charlevoix", value: "charlevoix" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title.fr", date: "publishedAt", media: "mainImage" },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date
          ? new Date(date).toLocaleDateString("fr-CA")
          : "Brouillon",
        media,
      };
    },
  },
});
