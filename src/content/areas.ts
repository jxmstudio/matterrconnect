/**
 * Service-area pages. One entry per town/suburb Matter Construction targets,
 * driving /areas, /areas/[slug], the homepage service-area strip and the
 * LocalBusiness `areaServed` in structured data.
 *
 * This is the single source of truth for the areas served — `site.ts` derives
 * its `areasServed` list from `areaNames` below, so the map-pack schema, the
 * homepage strip and the location pages can never drift apart.
 *
 * Blurbs are deliberately area-specific but factual. They speak to the kind of
 * work common in each place; they never claim a specific job we can't back up.
 */

export type Area = {
  /** URL slug (ASCII, no macrons), e.g. "papamoa". Keep stable once live. */
  slug: string;
  /** Display name, with macrons where they belong. */
  name: string;
  /** Short, honest, area-specific intro shown on the page and the index. */
  blurb: string;
};

export const areas: Area[] = [
  {
    slug: "tauranga",
    name: "Tauranga",
    blurb:
      "Tauranga is our home base, so most of our work happens right here across the city and its suburbs. From renovating older homes to structural repairs and new bathrooms and kitchens, it's the work we do day in and day out.",
  },
  {
    slug: "mount-maunganui",
    name: "Mount Maunganui",
    blurb:
      "The Mount takes a beating from the salt air and the sun, which is hard on cladding, joinery and weathertightness. We handle renovations, re-cladding and repairs on everything from older baches to newer homes near the beach.",
  },
  {
    slug: "papamoa",
    name: "Pāpāmoa",
    blurb:
      "Pāpāmoa has grown fast, with a mix of newer homes and established places that are ready for an update. We take on renovations, extensions and property maintenance right along the coast.",
  },
  {
    slug: "bethlehem",
    name: "Bethlehem",
    blurb:
      "Bethlehem is full of family homes that are due for a refresh or a bit more room. We handle kitchen and bathroom renovations, structural changes and the repairs that keep a home sound.",
  },
  {
    slug: "omokoroa",
    name: "Ōmokoroa",
    blurb:
      "Ōmokoroa is one of the fastest growing spots in the Bay, with plenty of new builds and lifestyle properties. We travel out here regularly for renovations, decks and property maintenance.",
  },
  {
    slug: "te-puke",
    name: "Te Puke",
    blurb:
      "Te Puke and the orchard country around it is lifestyle and rural living, where sheds, decks and older homes all need work. We come out for renovations, repairs and general building.",
  },
  {
    slug: "katikati",
    name: "Katikati",
    blurb:
      "Katikati and its lifestyle blocks are a bit further out, but we're happy to travel for the right job. Renovations, structural repairs and maintenance on homes, sheds and rural buildings.",
  },
  {
    slug: "whakatane",
    name: "Whakatāne",
    blurb:
      "Whakatāne is where Jack grew up, so it's a part of the country we know well. We take on renovations, repairs and building work across the town and the wider eastern Bay of Plenty.",
  },
];

/** Display names in order — `site.ts` uses this for `areasServed`. */
export const areaNames = areas.map((a) => a.name);

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
