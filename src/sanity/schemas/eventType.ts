import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./helpers/localizedFields";

export const eventType = defineType({
  name: "event",
  title: "Événement",
  type: "document",
  groups: [
    { name: "content", title: "📝 Contenu", default: true },
    { name: "details", title: "📅 Détails" },
    { name: "links", title: "🔗 Liens" },
  ],
  fields: [
    { ...localizedString("title", "Titre", { required: true }), group: "content" },
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title.fr", maxLength: 96 },
    }),
    { ...localizedText("description", "Description"), group: "content" },
    defineField({
      name: "image",
      title: "Affiche / Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Date et heure de début",
      type: "datetime",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Date et heure de fin",
      type: "datetime",
      group: "details",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "🎵 Musique", value: "musique" },
          { title: "🎭 Spectacle", value: "spectacle" },
          { title: "🤝 Communautaire", value: "communautaire" },
          { title: "📌 Autre", value: "autre" },
        ],
      },
    }),
    defineField({
      name: "facebookEventUrl",
      title: "Lien événement Facebook",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "ticketUrl",
      title: "Lien billetterie (Le Point de Vente)",
      type: "url",
      group: "links",
    }),
  ],
  orderings: [
    {
      title: "Date (prochain d'abord)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.fr", date: "date", media: "image", category: "category" },
    prepare({ title, date, media, category }) {
      const emoji = category === "musique" ? "🎵" : category === "spectacle" ? "🎭" : category === "communautaire" ? "🤝" : "📌";
      return {
        title: `${emoji} ${title}`,
        subtitle: date
          ? new Date(date).toLocaleDateString("fr-CA", { weekday: "short", day: "numeric", month: "short" })
          : "Sans date",
        media,
      };
    },
  },
});
