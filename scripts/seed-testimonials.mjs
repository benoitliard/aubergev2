/**
 * Seed Sanity with homepage testimonials.
 *
 * Usage:
 *   node scripts/seed-testimonials.mjs
 *
 * Requires SANITY_TOKEN env variable with write permissions.
 * Get a token from: https://www.sanity.io/manage/project/cx8ev1gh/api
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cx8ev1gh",
  dataset: "production",
  apiVersion: "2025-03-17",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const testimonials = [
  {
    _type: "testimonial",
    name: "Françoise L.",
    category: "auberge",
    text: {
      fr: "« C'est un endroit fantastique! J'avais une chambre individuelle de belle grandeur et lumineuse. Hyper propre sdb et douche tout est nickel. Cuisine immense et bien équipée. Des balcons partout. Vue imprenable sur un immense jardin. J'ai hâte d'y retourner. »",
      en: '"This is a fantastic place! I had a spacious, bright private room. Super clean bathroom and shower, everything is spotless. Huge well-equipped kitchen. Balconies everywhere. Stunning view of a huge garden. Can\'t wait to go back."',
    },
    source: "google",
    rating: 5,
    featured: true,
  },
  {
    _type: "testimonial",
    name: "Cécile L.",
    category: "bistro",
    text: {
      fr: "« Bel endroit avec une super vibe! J'ai adoré le 5@7 avec un DJ. Beau menu, simple mais avec de bonnes options végé. Bons choix de drinks. Super expérience. »",
      en: '"Great spot with an awesome vibe! I loved the 5@7 with a DJ. Nice menu, simple but with good veggie options. Great drink selection. Super experience."',
    },
    source: "google",
    rating: 5,
    featured: true,
  },
  {
    _type: "testimonial",
    name: "Mercedes G.",
    category: "auberge",
    text: {
      fr: "« Très belle expérience à l'auberge des balcons. J'y suis allée avec mes 2 ados et nous avons tous apprécié! Les employés sont très accueillants et serviables, c'est très propre, tout ce dont on peut avoir besoin s'y trouve. On a loué des vélos à partir de là, c'est proche de tout. »",
      en: '"Great experience at the auberge des balcons. I went with my 2 teens and we all loved it! The staff is very welcoming and helpful, it\'s very clean, everything you could need is there. We rented bikes from there, it\'s close to everything."',
    },
    source: "google",
    rating: 5,
    featured: true,
  },
  {
    _type: "testimonial",
    name: "Jean-Pierre M.",
    category: "bistro",
    text: {
      fr: "« Le meilleur séjour de notre vie. Les balcons avec vue sur les montagnes sont à couper le souffle, et l'auberge propose une atmosphère chaleureuse et conviviale. »",
      en: '"The best stay of our lives. The balconies with mountain views are breathtaking, and the inn offers a warm and friendly atmosphere."',
    },
    source: "tripadvisor",
    rating: 5,
    featured: true,
  },
];

async function seed() {
  console.log("Seeding testimonials...");

  // Delete existing testimonials first
  const existing = await client.fetch('*[_type == "testimonial"]._id');
  if (existing.length > 0) {
    console.log(`Deleting ${existing.length} existing testimonials...`);
    const tx = client.transaction();
    existing.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  // Create new ones
  const tx = client.transaction();
  testimonials.forEach((t) => tx.create(t));
  const result = await tx.commit();
  console.log(`Created ${testimonials.length} testimonials.`);
  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
