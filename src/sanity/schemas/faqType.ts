import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./helpers/localizedFields";

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  groups: [
    { name: "content", title: "📝 Contenu", default: true },
    { name: "settings", title: "⚙️ Paramètres" },
  ],
  fields: [
    { ...localizedString("question", "Question", { required: true }), group: "content" },
    { ...localizedText("answer", "Réponse", { required: true }), group: "content" },
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      group: "settings",
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
      group: "settings",
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question.fr", subtitle: "category" },
  },
});
