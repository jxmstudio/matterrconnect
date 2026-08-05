/**
 * Portfolio entries.
 *
 * ADDING A PROJECT
 * 1. Drop web-sized photos into public/images/projects/ (see prep-images.mjs
 *    for the sizing recipe — 1400px wide, quality 82, EXIF stripped).
 * 2. Add an entry below. `slug` becomes the URL, so keep it stable once live.
 * 3. That's it — the grid, the detail page, the homepage feature and the
 *    sitemap all read from this array.
 *
 * Only add projects whose photos we actually have. An empty gallery is better
 * than a stock-photo gallery on a builder's site — clients can tell.
 */

import type { Service } from "./services";

export type ProjectImage = {
  src: string;
  alt: string;
  /** Shown as a caption under the image on the detail page. */
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Suburb or town — doubles as local SEO signal. */
  location: string;
  /** Matches a Service slug so the detail page can cross-link. */
  serviceSlug: Service["slug"];
  year: string;
  summary: string;
  /**
   * Short note on how this job relates to its service, shown in place of the
   * summary in the "related work" strip on the matching service page. Written
   * per-job by the client; when absent the card falls back to `summary`.
   */
  relation?: string;
  body: string[];
  /** Card and hero image for the project. */
  cover: ProjectImage;
  before?: ProjectImage;
  after?: ProjectImage;
  gallery?: ProjectImage[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "opening-up-to-the-view",
    title: "Opening up to the view",
    location: "Bay of Plenty",
    serviceSlug: "renovations-structural-repairs",
    year: "2026",
    summary:
      "We reworked an existing door and window into one large opening, so the room now looks straight out to the sea.",
    relation:
      "Structural changes to the existing door and window to take advantage of the view.",
    body: [
      "The room looked out over the coast, but the original door and window openings didn't make the most of it.",
      "We made the structural changes to turn them into one large opening. Now the view is the first thing you see when you walk in.",
    ],
    cover: {
      src: "/images/projects/door-window-after.jpg",
      alt: "Bedroom with a large sliding door opening onto a deck and a wide sea view with an island and a tree",
    },
    before: {
      src: "/images/projects/door-window-before.jpg",
      alt: "The room before, with a smaller window and separate French doors beside a solid wall",
      caption: "The original window and French doors.",
    },
    after: {
      src: "/images/projects/door-window-after.jpg",
      alt: "The same wall reworked into one large sliding opening framing the sea view",
      caption: "Opened up to take in the view.",
    },
    featured: true,
  },
  {
    slug: "pole-shed-bathroom",
    title: "Pole shed bathroom",
    location: "Bay of Plenty",
    serviceSlug: "renovations-structural-repairs",
    year: "2026",
    summary:
      "A working pole shed that needed a proper bathroom, fitted out with modern gear that still suits the shed's timber.",
    relation:
      "Client had an existing pole shed that needed a bathroom. We came in and made it happen. Modern amenities that still fit the rustic theme of the shed.",
    body: [
      "The client had a pole shed and wanted a bathroom put into it, so we fitted one out from scratch.",
      "The fittings are modern. A glass shower, a wall-hung vanity, a round mirror and a pendant light. They all sit against the shed's original ply lining, so it still feels like part of the shed rather than a box dropped inside it.",
    ],
    cover: {
      src: "/images/projects/pole-shed-bathroom.jpg",
      alt: "Bathroom built inside a pole shed, with plywood walls, a glass shower, white vanity and round mirror",
    },
    gallery: [
      {
        src: "/images/projects/pole-shed-bathroom-shower.jpg",
        alt: "Corner glass shower in the pole shed bathroom, with ply-lined walls and a small window",
      },
      {
        src: "/images/projects/pole-shed-bathroom-vanity.jpg",
        alt: "Wall-hung vanity, round mirror and toilet against the shed's plywood lining",
      },
    ],
    featured: true,
  },
  {
    slug: "bathroom-rebuild-water-damage",
    title: "Bathroom rebuild after water damage",
    location: "Tauranga",
    serviceSlug: "leaky-homes-recladding",
    year: "2026",
    summary:
      "A bathroom that looked like it needed a tidy-up turned out to have mould through the linings and wet framing behind them. Stripped back, repaired and rebuilt.",
    body: [
      "The owners called us about a bathroom that felt damp and smelled worse. From the room it looked like a cosmetic problem — some staining, some lifting vinyl.",
      "Once the linings came off, the actual extent was obvious. Mould had spread across the full height of the wall behind the shower and into the bottom plate. There's no cosmetic fix for that. The linings came out, the affected framing was cut back to sound timber and replaced, and the wall was rebuilt with the right substrate and waterproofing before anything went back over it.",
      "The finished room is a straightforward, hard-wearing bathroom — new vanity, new floor, new shower — but the part that matters is behind the wall, where it will now stay dry.",
    ],
    cover: {
      src: "/images/projects/bathroom-rebuild-after.jpg",
      alt: "Completed bathroom renovation with a white vanity, round mirror and grey timber-look flooring",
    },
    before: {
      src: "/images/projects/bathroom-rebuild-before.jpg",
      alt: "Bathroom wall stripped back to reveal extensive black mould across the wall lining and framing",
      caption:
        "Wall linings removed — mould through the full wall height and into the bottom plate.",
    },
    after: {
      src: "/images/projects/bathroom-rebuild-after.jpg",
      alt: "The same bathroom completed, with new vanity, mirror, toilet, shower and flooring",
      caption: "Rebuilt, waterproofed and finished.",
    },
    featured: true,
  },
  {
    slug: "timber-entrance-deck",
    title: "Timber entrance deck",
    location: "Bay of Plenty",
    serviceSlug: "residential-property-maintenance",
    year: "2026",
    summary:
      "A hardwood entrance deck built to wrap the corner of the house and sit flush with the door threshold — a level, square approach where there was bare ground before.",
    body: [
      "A hardwood deck built across the entrance of a home, stepping down to ground level and turning the corner to meet the front door. The boards are laid to a consistent gap with a clean picture-frame edge, and the platform sits square to the brickwork.",
      "A deck like this is as much about what you can't see — level bearers, properly spaced joists, fixings that won't lift or rust — as the finish on top. Get that right and it stays flat and quiet underfoot for years.",
    ],
    cover: {
      src: "/images/projects/timber-entrance-deck.jpg",
      alt: "Hardwood timber entrance deck wrapping the corner of a white-brick house and meeting a black front door",
    },
    featured: true,
  },
  {
    slug: "garden-studio-fitout",
    title: "Garden studio fit-out",
    location: "Bay of Plenty",
    serviceSlug: "renovations-structural-repairs",
    year: "2026",
    summary:
      "A standalone garden room lined, finished and fitted out as a calm retreat — recessed lighting, fresh linings and a floor that ties the space together.",
    body: [
      "Not every job is a repair. This is a standalone garden room finished as a quiet retreat — somewhere to read, sit and listen to music away from the main house.",
      "The walls and ceiling are lined and painted, the lighting is recessed for an even, soft wash, and the flooring runs the length of the room. A small footprint made to feel considered rather than cramped.",
    ],
    cover: {
      src: "/images/projects/garden-studio-fitout.jpg",
      alt: "Finished garden studio interior with lined walls, recessed ceiling lighting, armchairs, bookshelves and a tapestry",
    },
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(serviceSlug: string): Project[] {
  return projects.filter((p) => p.serviceSlug === serviceSlug);
}
