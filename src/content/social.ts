/**
 * Instagram grid shown on the homepage.
 *
 * ⚠️ SNAPSHOT, NOT A LIVE FEED. Instagram's CDN URLs are signed and expire
 * within hours, so the images can't be hotlinked — they're copied into
 * public/images/social by scripts/fetch-social.mjs and served from here.
 *
 * TO REFRESH: open the profile, grab the current post URLs and image URLs,
 * update scripts/fetch-social.mjs, re-run it, then update this list. A live
 * feed would need the Instagram Basic Display API and a long-lived token.
 *
 * Every entry links back to the real post. Captions are written here rather
 * than copied verbatim, so they read as site copy rather than social captions.
 */

export type SocialPost = {
  /** Local image, already square-cropped. */
  src: string;
  alt: string;
  /** Permalink to the post on Instagram. */
  href: string;
  /** Posted date, for ordering and the caption line. */
  date: string;
  caption: string;
};

export const instagramPosts: SocialPost[] = [
  {
    src: "/images/social/instagram-1.jpg",
    alt: "Roofline of a house showing new fascia, exposed rafters and weatherboard cladding against a blue sky",
    href: "https://www.instagram.com/matter.construction/p/DbhInknkjVI/",
    date: "2026-08-01",
    caption: "Fascia and roofline work",
  },
  {
    src: "/images/social/instagram-2.jpg",
    alt: "Finished garden studio interior with lined walls, recessed lighting, bookshelves and armchairs",
    href: "https://www.instagram.com/matter.construction/p/DbAePe3FRyk/",
    date: "2026-07-20",
    caption: "Garden studio, finished",
  },
  {
    src: "/images/social/instagram-3.jpg",
    alt: "New timber deck and wide timber steps leading up a bush-covered bank",
    href: "https://www.instagram.com/matter.construction/p/DaHnMEjEv5P/",
    date: "2026-06-27",
    caption: "Deck and steps through the bank",
  },
];

/** Profile handle, shown as the section's byline. */
export const instagramHandle = "@matter.construction";
