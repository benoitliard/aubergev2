import { defineField, defineType } from "sanity";
import { localizedString } from "./helpers/localizedFields";

export const homePageType = defineType({
  name: "homePage",
  title: "Page d'accueil",
  type: "document",
  groups: [
    { name: "hero", title: "🎬 Hero (image / vidéo)", default: true },
  ],
  fields: [
    defineField({
      name: "heroImage",
      title: "Image hero",
      description:
        "Image affichée dans l'arche en haut de la page. Sert également de fallback / poster si une vidéo est ajoutée ci-dessous.",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    { ...localizedString("heroImageAlt", "Texte alternatif (image)"), group: "hero" },
    defineField({
      name: "heroVideo",
      title: "Vidéo hero (optionnelle)",
      description:
        "Si une vidéo est fournie, elle remplace l'image. La vidéo est lue en boucle, sans son. Format MP4 ou WebM, ~10-30 Mo recommandé.",
      type: "file",
      group: "hero",
      options: {
        accept: "video/mp4,video/webm",
      },
    }),
  ],
  preview: {
    select: { media: "heroImage" },
    prepare({ media }) {
      return {
        title: "🏠 Page d'accueil",
        subtitle: "Hero de la page d'accueil",
        media,
      };
    },
  },
});
