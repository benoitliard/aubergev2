import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./helpers/localizedFields";

export const menuItemType = defineType({
  name: "menuItem",
  title: "Item du menu",
  type: "object",
  fields: [
    localizedString("name", "Nom", { required: true }),
    localizedText("description", "Description", { rows: 2 }),
    defineField({
      name: "price",
      title: "Prix",
      type: "string",
    }),
    defineField({
      name: "allergens",
      title: "Allergènes / Régimes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "🌾 Gluten", value: "gluten" },
          { title: "🥛 Lactose", value: "lactose" },
          { title: "🥜 Noix", value: "noix" },
          { title: "🦐 Fruits de mer", value: "fruits-de-mer" },
          { title: "🥬 Végétarien", value: "vegetarien" },
          { title: "🌱 Végan", value: "vegan" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "name.fr", price: "price" },
    prepare({ title, price }) {
      return { title, subtitle: price || "" };
    },
  },
});

export const bistroMenuType = defineType({
  name: "bistroMenu",
  title: "Menu du Bistro",
  type: "document",
  fields: [
    localizedString("category", "Catégorie", { required: true }),
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
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "category.fr", items: "items" },
    prepare({ title, items }) {
      return {
        title,
        subtitle: items ? `${items.length} item(s)` : "Vide",
      };
    },
  },
});
