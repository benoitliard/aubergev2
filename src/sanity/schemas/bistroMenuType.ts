import { defineField, defineType } from "sanity";

export const menuItemType = defineType({
  name: "menuItem",
  title: "Item du menu",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "text", rows: 2 },
        { name: "en", title: "English", type: "text", rows: 2 },
      ],
    }),
    defineField({
      name: "price",
      title: "Prix",
      type: "string",
    }),
    defineField({
      name: "allergens",
      title: "Allergènes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Gluten", value: "gluten" },
          { title: "Lactose", value: "lactose" },
          { title: "Noix", value: "noix" },
          { title: "Fruits de mer", value: "fruits-de-mer" },
          { title: "Végétarien", value: "vegetarien" },
          { title: "Végan", value: "vegan" },
        ],
      },
    }),
  ],
});

export const bistroMenuType = defineType({
  name: "bistroMenu",
  title: "Menu du Bistro",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Catégorie",
      type: "object",
      fields: [
        { name: "fr", title: "Français", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "menuItem" }],
    }),
  ],
  preview: {
    select: { title: "category.fr" },
  },
});
