import { defineField, defineType } from "sanity";
import { localizedString } from "./helpers/localizedFields";

export const galleryType = defineType({
  name: "gallery",
  title: "Galerie",
  type: "document",
  fields: [
    localizedString("title", "Titre", { required: true }),
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
                { name: "fr", title: "🇫🇷 Français", type: "string" },
                { name: "en", title: "🇬🇧 English", type: "string" },
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
