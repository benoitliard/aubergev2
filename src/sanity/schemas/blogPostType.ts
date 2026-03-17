import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Article de blogue",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.fr", maxLength: 96 },
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Actualités", value: "actualites" },
          { title: "Événements", value: "evenements" },
          { title: "Recettes", value: "recettes" },
          { title: "Charlevoix", value: "charlevoix" },
        ],
      },
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Français",
          type: "array",
          of: [{ type: "block" }, { type: "image" }],
        },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }, { type: "image" }],
        },
      ],
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
