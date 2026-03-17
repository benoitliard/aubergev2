import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Événement",
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
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "Date de fin",
      type: "datetime",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "facebookEventUrl",
      title: "Lien événement Facebook",
      type: "url",
    }),
    defineField({
      name: "ticketUrl",
      title: "Lien billetterie (Le Point de Vente)",
      type: "url",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Musique", value: "musique" },
          { title: "Spectacle", value: "spectacle" },
          { title: "Communautaire", value: "communautaire" },
          { title: "Autre", value: "autre" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title.fr", date: "date", media: "image" },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date
          ? new Date(date).toLocaleDateString("fr-CA")
          : "Sans date",
        media,
      };
    },
  },
});
