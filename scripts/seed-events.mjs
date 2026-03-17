/**
 * Seed Sanity with real events from aubergedesbalcons.com/les-evenements/
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

const events = [
  {
    _type: "event",
    title: { fr: "Jeudi 5@7 DJ avec MAUDE ARSENAULT", en: "Thursday 5@7 DJ with MAUDE ARSENAULT" },
    slug: { current: "5a7-dj-maude-arsenault" },
    date: "2026-03-12T17:00:00-04:00",
    description: {
      fr: "Soirée DJ au Bistro des Balcons avec planche de charcuteries d'un fournisseur de viande local.",
      en: "DJ evening at Bistro des Balcons with charcuterie board from local meat supplier.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "Charlotte Brousseau au Bistro des Balcons", en: "Charlotte Brousseau at Bistro des Balcons" },
    slug: { current: "charlotte-brousseau" },
    date: "2026-03-14T20:00:00-04:00",
    description: {
      fr: "Folk francophone avec une voix feutrée, la guitare classique et le piano.",
      en: "Francophone folk with a velvety voice, classical guitar and piano.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "Saint-Patrick au Bistro des Balcons", en: "St. Patrick's Day at Bistro des Balcons" },
    slug: { current: "saint-patrick" },
    date: "2026-03-17T17:00:00-04:00",
    description: {
      fr: "Célébration festive avec menu et boissons thématiques : pinte à 7.50$, Irish Car Bomb à 5$, Irish Stew.",
      en: "Festive celebration with themed food and drinks: $7.50 pint, $5 Irish Car Bomb, Irish Stew.",
    },
    category: "communautaire",
  },
  {
    _type: "event",
    title: { fr: "Soirée Swing au Bistro des Balcons", en: "Swing Night at Bistro des Balcons" },
    slug: { current: "soiree-swing-mars" },
    date: "2026-03-18T19:00:00-04:00",
    description: {
      fr: "Soirée danse avec Geneviève Boily — chaque pas devient une célébration!",
      en: "Dance evening with Geneviève Boily — every step becomes a celebration!",
    },
    category: "spectacle",
  },
  {
    _type: "event",
    title: { fr: "Sunset club avec CYR", en: "Sunset club with CYR" },
    slug: { current: "sunset-club-cyr" },
    date: "2026-03-19T19:00:00-04:00",
    description: {
      fr: "DJ set de 19h à 22h+ avec CYR. Privatisation avant 19h.",
      en: "DJ set from 7pm to 10pm+ with CYR. Private event before 7pm.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "La Fuite au Bistro des Balcons", en: "La Fuite at Bistro des Balcons" },
    slug: { current: "la-fuite" },
    date: "2026-03-20T20:00:00-04:00",
    description: {
      fr: "Groupe folk-rock indie — un mélange unique de folk et rock indie.",
      en: "Indie folk-rock band — a unique blend of folk and indie rock.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "Les afters party du Cabaret Festif! - La finale", en: "Cabaret Festif! After Party - The Finale" },
    slug: { current: "afters-cabaret-festif" },
    date: "2026-03-21T22:30:00-04:00",
    description: {
      fr: "After party GRATUIT! DJs RiRi & Foin (22h30-minuit), Mike Clay (minuit-2h).",
      en: "FREE after party! DJs RiRi & Foin (10:30pm-midnight), Mike Clay (midnight-2am).",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "Félixe au Bistro des Balcons", en: "Félixe at Bistro des Balcons" },
    slug: { current: "felixe" },
    date: "2026-03-27T20:00:00-04:00",
    description: {
      fr: "Musique sensible et actuelle, où les émotions prennent toute la place.",
      en: "Sensitive and contemporary music where emotions take center stage.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "5@7 DJ au Bistro des Balcons - SLIM TONY", en: "5@7 DJ at Bistro des Balcons - SLIM TONY" },
    slug: { current: "5a7-slim-tony" },
    date: "2026-04-02T17:00:00-04:00",
    description: {
      fr: "DJ set avec SLIM TONY en partenariat avec Café Charlevoix.",
      en: "DJ set with SLIM TONY in partnership with Café Charlevoix.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "BLAMM & Sandra Contour au Bistro des Balcons", en: "BLAMM & Sandra Contour at Bistro des Balcons" },
    slug: { current: "blamm-sandra-contour" },
    date: "2026-04-04T20:00:00-04:00",
    description: {
      fr: "Soirée double : BLAMM (solo) + Sandra Contour (duo) — folk et jazz New Orleans.",
      en: "Double bill: BLAMM (solo) + Sandra Contour (duo) — folk and New Orleans jazz.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "Soirée Swing au Bistro des Balcons", en: "Swing Night at Bistro des Balcons" },
    slug: { current: "soiree-swing-avril" },
    date: "2026-04-15T19:00:00-04:00",
    description: {
      fr: "Soirée danse avec Geneviève Boily.",
      en: "Dance evening with Geneviève Boily.",
    },
    category: "spectacle",
  },
  {
    _type: "event",
    title: { fr: "Roméo Rhubarbe au Bistro des Balcons", en: "Roméo Rhubarbe at Bistro des Balcons" },
    slug: { current: "romeo-rhubarbe" },
    date: "2026-04-17T20:00:00-04:00",
    description: {
      fr: "Sélections éclectiques et énergie contagieuse.",
      en: "Eclectic selections and contagious energy.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "Fred Péloquin & Andrea Gozzi au Bistro des Balcons", en: "Fred Péloquin & Andrea Gozzi at Bistro des Balcons" },
    slug: { current: "fred-peloquin-andrea-gozzi" },
    date: "2026-05-01T20:00:00-04:00",
    description: {
      fr: "Duo folk-punk — un mélange unique de folk italiano et de punk.",
      en: "Folk-punk duo — a unique blend of Italian folk and punk.",
    },
    category: "musique",
  },
  {
    _type: "event",
    title: { fr: "La Tête de l'Art : Cabaret légumes au Bistro des Balcons", en: "La Tête de l'Art: Vegetable Cabaret at Bistro des Balcons" },
    slug: { current: "cabaret-legumes" },
    date: "2026-05-15T20:00:00-04:00",
    description: {
      fr: "Cabaret de marionnettes, théâtre et numéros burlesques. Comédie absurde (16+).",
      en: "Puppet cabaret, theater and burlesque acts. Absurdist comedy (16+).",
    },
    category: "spectacle",
  },
  {
    _type: "event",
    title: { fr: "Léa Jarry trio au Bistro des Balcons", en: "Léa Jarry trio at Bistro des Balcons" },
    slug: { current: "lea-jarry-trio" },
    date: "2026-06-13T20:00:00-04:00",
    description: {
      fr: "L'une des figures marquantes du new country francophone.",
      en: "One of the prominent figures of French-speaking new country.",
    },
    category: "musique",
  },
];

async function seed() {
  console.log("Seeding real events...");

  const existing = await client.fetch('*[_type == "event"]._id');
  if (existing.length > 0) {
    console.log(`Deleting ${existing.length} existing events...`);
    const tx = client.transaction();
    existing.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  const tx = client.transaction();
  events.forEach((e) => tx.create(e));
  await tx.commit();
  console.log(`Created ${events.length} events.`);
  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
