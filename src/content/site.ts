/**
 * Single source of truth for every business detail on the site.
 *
 * Nothing here should ever be hardcoded into a component. If Jack changes his
 * phone number, this is the only file that needs to change.
 *
 * Source: client onboarding response ("website information.pdf", July 2026).
 */

export const site = {
  /**
   * The trading name as it appears on the site. Note the onboarding form gives
   * the business name as "Matter Construction" while the domain and the JXM
   * proposal both say "Matter Connect" — brand follows the client's own
   * spelling, domain stays as registered.
   */
  name: "Matter Construction",
  shortName: "Matter",
  legalName: "Matter Construction",
  domain: "matterconnect.net",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://matterconnect.net",

  tagline: "Builders in Tauranga & the wider Bay of Plenty",
  description:
    "Licensed building practitioners in Tauranga. Renovations, structural repairs, leaky home re-cladding and property maintenance across the wider Bay of Plenty.",

  /** Raw digits for tel: links, plus the formatted version for display. */
  phone: {
    display: "027 597 1725",
    href: "tel:+64275971725",
    e164: "+64275971725",
  },

  email: "info@matterconnect.net",

  location: {
    base: "Tauranga",
    region: "Bay of Plenty",
    country: "New Zealand",
    countryCode: "NZ",
    /** Used for the service-area section and LocalBusiness `areaServed`. */
    areasServed: [
      "Tauranga",
      "Mount Maunganui",
      "Pāpāmoa",
      "Bethlehem",
      "Ōmokoroa",
      "Te Puke",
      "Katikati",
      "Whakatāne",
    ],
    blurb: "Tauranga and the wider Bay of Plenty",
  },

  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/matter.construction/",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61555880107022",
    },
  ],

  nav: [
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],

  /** Founders, per the onboarding notes. */
  founders: ["Jack", "Anna"],
} as const;

export type Site = typeof site;

/**
 * The canonical production origin. Anything else — a vercel.app demo, a
 * preview branch, localhost — is treated as a non-public build.
 */
export const PRODUCTION_URL = "https://matterconnect.net";

/**
 * True whenever the site is running somewhere other than the real domain.
 *
 * Demo and preview deployments must not be indexed: Google would otherwise
 * pick up the vercel.app URL as duplicate content, or follow canonicals to a
 * domain that isn't live yet. `robots.ts` and `buildMetadata()` both read this,
 * so indexing switches itself on the moment NEXT_PUBLIC_SITE_URL is set to
 * matterconnect.net at go-live. Nothing to remember to flip.
 */
export const isDemoDeployment = site.url !== PRODUCTION_URL;
