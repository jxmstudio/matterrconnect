/**
 * The five services from the client's onboarding response, in the order they
 * should be presented. Renovations leads because Jack named residential
 * renovation/maintenance as his ideal job.
 *
 * Each entry drives: the services grid, the /services/[slug] detail page, the
 * quote form's service dropdown, and the sitemap.
 */

export type Service = {
  slug: string;
  title: string;
  /** One line for cards and meta descriptions. */
  summary: string;
  /** Two or three paragraphs for the detail page. */
  body: string[];
  /** Concrete deliverables — reads as competence, and as SEO long-tail. */
  includes: string[];
  /** Featured on the homepage grid above the fold. */
  featured: boolean;
};

export const services: Service[] = [
  {
    slug: "renovations-structural-repairs",
    title: "Renovations & Structural Repairs",
    summary:
      "Kitchens, bathrooms, extensions and the structural work behind them — planned properly and finished to a standard you'd put your name on.",
    body: [
      "Most of the homes we work on in Tauranga were built for a different way of living. Renovation is how you fix that without leaving the street you like. We handle the whole job — from the first walk-through and the consent drawings through to the final coat of paint.",
      "Structural work is where experience shows. Removing a wall, correcting a sagging floor, underpinning a foundation or opening up a room properly means understanding what the building is doing before you touch it. We work to Licensed Building Practitioner standards on every restricted building work item, and the paperwork gets done as carefully as the framing.",
      "You'll get a clear scope and a realistic programme before we start, and you'll know who's on site each day and what they're doing.",
    ],
    includes: [
      "Kitchen and bathroom renovations",
      "Wall removal, beams and structural alterations",
      "Extensions and reconfigured layouts",
      "Subfloor, pile and foundation repairs",
      "Consent documentation and council inspections",
      "Full project coordination of trades",
    ],
    featured: true,
  },
  {
    slug: "leaky-homes-recladding",
    title: "Leaky Homes & Re-cladding",
    summary:
      "Finding the real extent of water damage, repairing the structure underneath, and re-cladding so it stays dry for good.",
    body: [
      "Water damage is almost never as small as it looks. What shows up as a stain on a wall lining usually means the framing behind it has been wet for years. The only honest approach is to open it up and find the actual boundary of the damage before quoting a fix.",
      "We carry out full moisture investigations, targeted or complete re-cladding, and the structural repairs that go with them — replacing rotted framing, installing correct flashings and cavity systems, and rebuilding the weathertightness envelope to current code.",
      "It's disruptive work and it's rarely cheap, so we're direct about what we find. You get photographs of what's behind the wall, a written scope of the repair, and no surprises invoiced at the end.",
    ],
    includes: [
      "Moisture testing and damage investigation",
      "Targeted and full re-cladding",
      "Rotted framing replacement",
      "Cavity systems, flashings and weathertightness detailing",
      "Remediation reporting for insurers and councils",
      "Balcony, deck and joinery leak repairs",
    ],
    featured: true,
  },
  {
    slug: "residential-property-maintenance",
    title: "Residential Property Maintenance",
    summary:
      "The ongoing repairs and small jobs that keep a home sound — done when we say we'll do them.",
    body: [
      "Small jobs get neglected by a lot of builders because they don't pay like a new build does. We take them, because a maintenance call is often how a good long-term client relationship starts — and because deferred maintenance is what turns a $500 problem into a $50,000 one.",
      "Rotten weatherboards, failing decks, sticking doors, damaged joinery, gutter and fascia repairs, general carpentry. If it's timber and it's part of your house, we can put it right.",
      "For rental and investment property owners we can work through a schedule of items on a single visit rather than charging a call-out for each one.",
    ],
    includes: [
      "Weatherboard and cladding repairs",
      "Deck, fence and pergola repair or replacement",
      "Door, window and joinery adjustments",
      "Gutter, fascia and soffit work",
      "Rental property maintenance schedules",
      "General carpentry and handyman work",
    ],
    featured: false,
  },
  {
    slug: "commercial-construction-maintenance",
    title: "Commercial Facilities Construction & Maintenance",
    summary:
      "Fit-outs, alterations and planned maintenance for commercial sites — scheduled around your trading hours, not ours.",
    body: [
      "Commercial work lives or dies on disruption. A retail or hospitality site losing trading days costs more than the build itself, so the programme matters as much as the workmanship.",
      "We carry out fit-outs, alterations, defect rectification and planned maintenance for commercial facilities across the Bay of Plenty, and we're Site Safe certified and comfortable working to a main contractor's health and safety requirements.",
      "Work can be staged after hours or across weekends where that keeps you trading.",
    ],
    includes: [
      "Commercial fit-outs and alterations",
      "Planned and reactive maintenance contracts",
      "Defect rectification",
      "After-hours and staged programmes",
      "Site Safe certified crews",
      "Coordination with facilities managers and main contractors",
    ],
    featured: true,
  },
  {
    slug: "residential-developments",
    title: "Residential Developments",
    summary:
      "Multi-unit and infill residential builds, managed end to end from site works through to code compliance.",
    body: [
      "Tauranga is densifying, and a lot of the region's new housing is coming from infill and multi-unit development on existing sections. That work needs a builder who can hold a programme across several units at once without the quality slipping on the last one.",
      "We take on residential developments end to end — coordinating subtrades, managing the consent and inspection pathway, and running the build through to code compliance certificate.",
      "If you're a developer or a landowner weighing up what a site can carry, we're happy to walk it with you before there are drawings.",
    ],
    includes: [
      "Infill and multi-unit residential builds",
      "Subtrade coordination and programme management",
      "Consent and inspection pathway management",
      "Site works and services coordination",
      "Code compliance certificate handover",
      "Early-stage feasibility walk-throughs",
    ],
    featured: false,
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Values offered in the quote form's service dropdown. */
export const serviceOptions = [
  ...services.map((s) => s.title),
  "Something else",
] as const;
