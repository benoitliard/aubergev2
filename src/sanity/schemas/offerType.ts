import { defineField, defineType } from "sanity";

export const offerType = defineType({
  name: "offer",
  title: "Offre / Promotion",
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
      name: "validFrom",
      title: "Valide à partir de",
      type: "date",
    }),
    defineField({
      name: "validUntil",
      title: "Valide jusqu'au",
      type: "date",
    }),
    defineField({
      name: "promoCode",
      title: "Code promo",
      type: "string",
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
