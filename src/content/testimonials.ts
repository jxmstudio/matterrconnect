/**
 * Client testimonials.
 *
 * ⚠️ INTENTIONALLY EMPTY — DO NOT INVENT ENTRIES.
 *
 * Jack's onboarding response says he has good reviews on his Google page, but
 * JXM's pre-proposal research could not verify a Google Business Profile for
 * Matter Construction. Until we have either the GBP URL or written permission
 * to quote named clients, this array stays empty.
 *
 * The Testimonials page and the homepage strip both handle the empty state
 * gracefully — they degrade to a "reviews coming soon" prompt rather than
 * rendering a broken section. A fabricated review on a builder's site is a
 * liability, not a placeholder.
 *
 * TO POPULATE: add entries below. Nothing else needs to change.
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

export const testimonials: Testimonial[] = [];

export const hasTestimonials = testimonials.length > 0;

/**
 * Set this once Jack confirms his Google Business Profile URL — it turns on
 * the "Read our Google reviews" link across the site.
 */
export const googleReviewsUrl: string | null = null;
