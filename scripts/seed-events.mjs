/**
 * Seed Sanity with sample events for the Événements page.
 *
 * Usage:
 *   SANITY_TOKEN=sk... node scripts/seed-events.mjs
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cx8ev1gh",
  dataset: "production",
  apiVersion: "2025-03-17",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Helper to create dates relative to today
function futureDate(daysFromNow, hour = 20, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function pastDate(daysAgo, hour = 20, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

const events = [
  // === UPCOMING EVENTS ===
  {
    _type: "event",
    title: {
      fr: "Soirée acoustique avec Marie-Ève Trudel",
      en: "Acoustic evening with Marie-Ève Trudel",
    },
    slug: { current: "soiree-acoustique-marie-eve-trudel" },
    date: futureDate(3),
    description: {
      fr: "Une soirée intime de chanson québécoise folk et acoustique. Marie-Ève Trudel nous offre ses compositions originales inspirées de Charlevoix. Entrée libre, consommation suggérée.",
      en: "An intimate evening of Quebec folk and acoustic song. Marie-Ève Trudel performs her original compositions inspired by Charlevoix. Free entry, suggested consumption.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: {
      fr: "DJ set — Jeudi tropical",
      en: "DJ set — Tropical Thursday",
    },
    slug: { current: "dj-set-jeudi-tropical" },
    date: futureDate(5, 21, 0),
    description: {
      fr: "DJ Rémi aux platines pour une soirée aux rythmes tropicaux et ensoleillés. Cocktails spéciaux et bières locales. Terrasse ouverte si la météo le permet!",
      en: "DJ Rémi on the decks for an evening of tropical and sunny rhythms. Special cocktails and local beers. Terrace open weather permitting!",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: {
      fr: "Spectacle d'humour — Les Imprévus",
      en: "Comedy show — Les Imprévus",
    },
    slug: { current: "spectacle-humour-les-imprevus" },
    date: futureDate(10),
    description: {
      fr: "La troupe d'improvisation Les Imprévus débarque au Bistro pour une soirée de rire garantie. Participation du public encouragée! 10$ à la porte.",
      en: "The improv troupe Les Imprévus takes over the Bistro for a guaranteed night of laughs. Audience participation encouraged! $10 at the door.",
    },
    category: "spectacle",
  },
  {
    _type: "event",
    title: {
      fr: "Marché des artisans locaux",
      en: "Local artisans market",
    },
    slug: { current: "marche-artisans-locaux" },
    date: futureDate(14, 10, 0),
    endDate: futureDate(14, 17, 0),
    description: {
      fr: "Les artisans de Charlevoix s'installent aux Balcons pour une journée de découvertes! Bijoux, poterie, savons artisanaux, produits du terroir et bien plus. Entrée libre.",
      en: "Charlevoix artisans set up at Les Balcons for a day of discovery! Jewelry, pottery, handmade soaps, local products and more. Free entry.",
    },
    category: "communautaire",
  },
  {
    _type: "event",
    title: {
      fr: "Jam session — Micro ouvert",
      en: "Jam session — Open mic",
    },
    slug: { current: "jam-session-micro-ouvert" },
    date: futureDate(19, 20, 0),
    description: {
      fr: "Musiciens, poètes, humoristes : le micro est à vous! Inscriptions sur place dès 19h, spectacle à 20h. Ambiance décontractée et bienveillante.",
      en: "Musicians, poets, comedians: the mic is yours! Sign up on site from 7pm, show at 8pm. Relaxed and welcoming atmosphere.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: {
      fr: "Soirée quiz & trivia",
      en: "Quiz & trivia night",
    },
    slug: { current: "soiree-quiz-trivia" },
    date: futureDate(24, 19, 30),
    description: {
      fr: "Forme ton équipe (2-6 joueurs) et viens tester tes connaissances! Prix pour les gagnants, ambiance compétitive mais décontractée. Bières et bouchées disponibles.",
      en: "Form your team (2-6 players) and come test your knowledge! Prizes for winners, competitive but relaxed atmosphere. Beers and bites available.",
    },
    category: "communautaire",
  },

  // === PAST EVENTS (should NOT display on the page) ===
  {
    _type: "event",
    title: {
      fr: "Concert — Les Bardes du Fleuve",
      en: "Concert — Les Bardes du Fleuve",
    },
    slug: { current: "concert-bardes-du-fleuve" },
    date: pastDate(7),
    description: {
      fr: "Un concert folk-rock mémorable avec Les Bardes du Fleuve.",
      en: "A memorable folk-rock concert with Les Bardes du Fleuve.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: {
      fr: "Atelier de peinture communautaire",
      en: "Community painting workshop",
    },
    slug: { current: "atelier-peinture-communautaire" },
    date: pastDate(14, 14, 0),
    description: {
      fr: "Un atelier de peinture ouvert à tous dans la grande salle.",
      en: "A painting workshop open to all in the main hall.",
    },
    category: "communautaire",
  },
];

async function seed() {
  console.log("Seeding events...");

  // Delete existing events
  const existing = await client.fetch('*[_type == "event"]._id');
  if (existing.length > 0) {
    console.log(`Deleting ${existing.length} existing events...`);
    const tx = client.transaction();
    existing.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  // Create new ones
  const tx = client.transaction();
  events.forEach((e) => tx.create(e));
  await tx.commit();
  console.log(`Created ${events.length} events (${events.filter((e) => !e.date.includes(new Date().getFullYear() + "")).length || events.length} total, some past).`);
  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
