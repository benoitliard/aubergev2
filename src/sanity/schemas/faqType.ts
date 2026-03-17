import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "answer",
      title: "Réponse",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Réservation", value: "reservation" },
          { title: "Hébergement", value: "hebergement" },
          { title: "Bistro", value: "bistro" },
          { title: "Événements", value: "evenements" },
          { title: "Général", value: "general" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "question.fr", subtitle: "category" },
  },
});
