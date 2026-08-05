/**
 * Client testimonials.
 *
 * These are real reviews from Matter Construction's Google Business Profile
 * (5.0 from 8 reviews at the time of writing). They're shown as short,
 * attributed excerpts with each reviewer's name and a link back to the full
 * reviews on Google — never edited to change their meaning, and never invented.
 * If you're adding more, copy them faithfully from the Google profile.
 *
 * `googleReviewsUrl` powers the "Read all our Google reviews" link across the
 * site and the rotating carousel on the homepage.
 */

export type Testimonial = {
  quote: string;
  author: string;
  /** e.g. "Bethlehem, Tauranga" — optional, adds credibility and local SEO. */
  location?: string;
  /** e.g. "Bathroom renovation" */
  project?: string;
  /** "google" renders the Google attribution line. */
  source?: "google" | "direct";
  /** Stars left by the reviewer, out of 5. */
  rating?: number;
  /**
   * Approximate month the review was posted, "YYYY-MM". Google only shows a
   * relative age ("7 months ago"), so this is that age resolved to a month —
   * storing it this way lets the site recompute the label instead of going
   * stale the way a hardcoded string would.
   */
  date?: string;
  /** How many reviews the author has written on Google. */
  authorReviewCount?: number;
  /** Jack's public reply, copied from the profile. */
  ownerResponse?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We couldn't be happier with the work this team did. From start to finish they were professional, reliable, and a pleasure to deal with. Their communication was outstanding, they kept us informed every step of the way.",
    author: "Sue Kelly",
    source: "google",
    rating: 5,
    date: "2026-07",
    authorReviewCount: 7,
    ownerResponse: "Thank you Sue. Pleasure to work with you.",
  },
  {
    quote:
      "Jack from Matter Construction built a horse shelter for us and we're delighted with the result. He designed it thoughtfully, taking the time to talk through good options with me. He had clearly checked out other shelters in detail.",
    author: "Carmen Montgomerie",
    project: "Horse shelter",
    source: "google",
    rating: 5,
    date: "2026-01",
    authorReviewCount: 6,
    ownerResponse:
      "Thank you Carmen. Grateful for the opportunity to work with you in this!",
  },
  {
    quote:
      "I don't usually post reviews, but Jack has done a few building adjustments around my place and I highly recommend utilizing his skills. He is responsive, 100% reliable, honest and does a great job every time.",
    author: "Savonne Wadsworth",
    project: "Property maintenance",
    source: "google",
    rating: 5,
    date: "2026-01",
    authorReviewCount: 3,
    ownerResponse: "Thanks Savonne pleasure working with you",
  },
];

export const hasTestimonials = testimonials.length > 0;

/** The headline rating on the Google Business Profile. */
export const googleRating = { value: 5, count: 8 };

/**
 * Matter Construction's Google reviews. Jack's shared profile link — swap for a
 * direct Maps reviews link any time.
 */
export const googleReviewsUrl: string | null =
  "https://share.google/1xDbDE56LHiHA5reE";
