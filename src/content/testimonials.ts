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
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We couldn't be happier with the work this team did. From start to finish they were professional, reliable, and a pleasure to deal with.",
    author: "Sue Kelly",
    source: "google",
  },
  {
    quote:
      "Jack from Matter Construction built a horse shelter for us and we're delighted with the result. He designed it thoughtfully, taking the time to talk through good options with me.",
    author: "Carmen Montgomerie",
    project: "Horse shelter",
    source: "google",
  },
  {
    quote:
      "Jack has done a few building adjustments around my place. He is responsive, 100% reliable, honest and does a great job every time.",
    author: "Savonne Wadsworth",
    project: "Property maintenance",
    source: "google",
  },
];

export const hasTestimonials = testimonials.length > 0;

/**
 * Matter Construction's Google reviews. Jack's shared profile link — swap for a
 * direct Maps reviews link any time.
 */
export const googleReviewsUrl: string | null =
  "https://share.google/1xDbDE56LHiHA5reE";
