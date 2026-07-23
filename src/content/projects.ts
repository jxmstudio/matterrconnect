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
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(serviceSlug: string): Project[] {
  return projects.filter((p) => p.serviceSlug === serviceSlug);
}
