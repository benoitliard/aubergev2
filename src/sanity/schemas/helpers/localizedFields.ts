/**
 * Helper functions for bilingual (FR/EN) fields in Sanity schemas.
 *
 * Creates consistent localized fields with flag emojis and proper
 * validation. Used across all content types.
 */

import { defineField } from "sanity";

/** Localized short text (string) */
export function localizedString(
  name: string,
  title: string,
  options?: { required?: boolean }
) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      {
        name: "fr",
        title: "🇫🇷 Français",
        type: "string",
        validation: options?.required
          ? (rule: any) => rule.required().error("Le champ français est requis")
          : undefined,
      },
      {
        name: "en",
        title: "🇬🇧 English",
        type: "string",
      },
    ],
    options: {
      columns: 1,
    },
    ...(options?.required
      ? { validation: (rule: any) => rule.required() }
      : {}),
  });
}

/** Localized long text (textarea) */
export function localizedText(
  name: string,
  title: string,
  options?: { required?: boolean; rows?: number }
) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      {
        name: "fr",
        title: "🇫🇷 Français",
        type: "text",
        rows: options?.rows || 4,
        validation: options?.required
          ? (rule: any) => rule.required().error("Le champ français est requis")
          : undefined,
      },
      {
        name: "en",
        title: "🇬🇧 English",
        type: "text",
        rows: options?.rows || 4,
      },
    ],
    ...(options?.required
      ? { validation: (rule: any) => rule.required() }
      : {}),
  });
}

/** Localized rich text (Portable Text block array) */
export function localizedRichText(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      {
        name: "fr",
        title: "🇫🇷 Français",
        type: "array",
        of: [{ type: "block" }, { type: "image" }],
      },
      {
        name: "en",
        title: "🇬🇧 English",
        type: "array",
        of: [{ type: "block" }, { type: "image" }],
      },
    ],
  });
}
