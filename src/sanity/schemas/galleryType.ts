import { defineField, defineType } from "sanity";

export const galleryType = defineType({
  name: "gallery",
  title: "Galerie",
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
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Texte alternatif",
              type: "object",
              fields: [
                { name: "fr", title: "Français", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title.fr", media: "images.0" },
  },
});
