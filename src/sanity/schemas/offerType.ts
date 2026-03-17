import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./helpers/localizedFields";

export const offerType = defineType({
  name: "offer",
  title: "Offre / Promotion",
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
    { ...localizedText("description", "Description"), group: "content" },
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "validFrom",
      title: "Valide à partir de",
      type: "date",
      group: "settings",
    }),
    defineField({
      name: "validUntil",
      title: "Valide jusqu'au",
      type: "date",
      group: "settings",
    }),
    defineField({
      name: "promoCode",
      title: "Code promo",
      type: "string",
      group: "settings",
    }),
  ],
  preview: {
    select: { title: "title.fr", from: "validFrom", until: "validUntil" },
    prepare({ title, from, until }) {
      return {
        title,
        subtitle: from && until ? `${from} → ${until}` : "Sans dates",
      };
    },
  },
});
