import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom du client",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Témoignage",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "TripAdvisor", value: "tripadvisor" },
          { title: "Facebook", value: "facebook" },
          { title: "Autre", value: "autre" },
        ],
      },
    }),
    defineField({
      name: "rating",
      title: "Note (sur 5)",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "source" },
  },
});
