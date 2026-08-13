/**
 * Service-area pages. One entry per town/suburb Matter Construction targets,
 * driving /areas, /areas/[slug], the homepage service-area strip and the
 * LocalBusiness `areaServed` in structured data.
 *
 * This is the single source of truth for the areas served — `site.ts` derives
 * its `areasServed` list from `areaNames` below, so the map-pack schema, the
 * homepage strip and the location pages can never drift apart.
 *
 * ⚠️ EVERY PAGE MUST READ DIFFERENTLY.
 * These pages exist to rank for "builder in <suburb>". An earlier version
 * shared 68% of its five-word phrases across all eight, which Google treats as
 * templated doorway pages and declines to rank. Each entry now carries its own
 * council, its own conditions, and its own FAQs.
 *
 * Everything here is either a verifiable fact (which council issues consents,
 * whether the area is coastal) or a description of work Matter Construction
 * actually offers. Do NOT add claims about specific jobs unless Jack has
 * confirmed them — `notableWork` is the slot for those once he supplies them.
 */

export type AreaFaq = { q: string; a: string };

export type Area = {
  /** URL slug (ASCII, no macrons), e.g. "papamoa". Keep stable once live. */
  slug: string;
  /** Display name, with macrons where they belong. */
  name: string;
  /** One-line summary for the index page and the page intro. */
  blurb: string;
  /** Territorial authority that issues building consents here. */
  council: string;
  /** Two or three paragraphs specific to this place. */
  body: string[];
  /** Shown as a short list of what this area typically calls for. */
  common: string[];
  /** Distinct per area — these drive the FAQ schema and snippet eligibility. */
  faqs: AreaFaq[];
};

const CONSENT_TCC =
  "Building consents here go through Tauranga City Council. We handle the application and book the inspections, so you're not chasing council yourself.";
const CONSENT_WBOP =
  "Building consents here go through Western Bay of Plenty District Council rather than Tauranga City. The process is much the same, but the forms, fees and inspection booking differ, and knowing which is which saves a fortnight of back-and-forth.";

export const areas: Area[] = [
  {
    slug: "tauranga",
    name: "Tauranga",
    blurb:
      "Our home base. Most of our work happens across Tauranga city and its suburbs, from full renovations to structural repairs.",
    council: "Tauranga City Council",
    body: [
      "Tauranga is where we're based, so it's where we do most of our work and where we can usually get to you fastest. That covers the older central suburbs through to the newer subdivisions on the edges of the city.",
      "The city has a wide mix of housing. Post-war weatherboard homes need different work from 2000s-era plaster-clad houses, and both need different work again from a recent build with a warranty still running. We take on renovations, structural alterations, weathertightness repairs and general maintenance across all of it.",
      CONSENT_TCC,
    ],
    common: [
      "Kitchen and bathroom renovations",
      "Removing walls and installing beams",
      "Weathertightness investigation and repair",
      "Decks, joinery and general carpentry",
    ],
    faqs: [
      {
        q: "How quickly can you get to a job in Tauranga?",
        a: "Tauranga is our base, so it's usually the quickest area for us to reach. For a small repair we can often look within the week. For a full renovation the look is quick, but the programme depends on what else we have running.",
      },
      {
        q: "Do you take on small jobs in Tauranga, or only full renovations?",
        a: "Both. A lot of good long-term client relationships start with a small maintenance call, so we don't turn those away. If it's timber and it's part of your house, we can look at it.",
      },
      {
        q: "Who issues building consents in Tauranga?",
        a: "Tauranga City Council. We prepare the application, submit it and book the inspections as part of the job, so you're not managing council yourself.",
      },
    ],
  },
  {
    slug: "mount-maunganui",
    name: "Mount Maunganui",
    blurb:
      "Coastal building at the Mount, where salt air and sun are hard on cladding, joinery and weathertightness.",
    council: "Tauranga City Council",
    body: [
      "The Mount is a coastal environment and it treats buildings accordingly. Salt-laden air corrodes fixings and flashings, UV degrades sealant and paint faster than it does inland, and wind-driven rain finds any gap in the envelope. Work that would last twenty years two suburbs back can fail in half that time here.",
      "That shapes what we specify. Stainless fixings where the exposure warrants it, cavity systems that let the wall dry, flashings detailed for driven rain rather than the minimum, and coatings rated for coastal use. It costs a little more up front and it's the difference between a repair and a re-clad later.",
      "There's also a lot of holiday and rental accommodation here, which brings its own pattern of work: shorter windows between bookings, and maintenance that has to be scheduled around occupancy rather than whenever suits us.",
      CONSENT_TCC,
    ],
    common: [
      "Re-cladding and weathertightness repair",
      "Rotted framing and flashing replacement",
      "Deck and balcony repair",
      "Rental and holiday-home maintenance",
    ],
    faqs: [
      {
        q: "Why does cladding fail faster in Mount Maunganui?",
        a: "Salt in the air corrodes fixings and flashings, and strong UV breaks down sealants and coatings faster than inland. Combined with wind-driven rain, small gaps in the building envelope let water in and it stays there. Coastal exposure is why weathertightness work is so common here.",
      },
      {
        q: "Can you work around holiday-home bookings?",
        a: "Yes. A lot of the properties here are rentals or baches, so we're used to staging work between bookings or over a defined window rather than leaving a house open-ended.",
      },
      {
        q: "How do I know if my place has a weathertightness problem?",
        a: "Staining on linings, a musty smell, swollen skirtings or paint lifting near joinery are common early signs. The only way to know the extent is to open it up and test the framing moisture. We do that investigation before quoting a repair, so the price is based on what's actually there.",
      },
    ],
  },
  {
    slug: "papamoa",
    name: "Pāpāmoa",
    blurb:
      "One of the fastest-growing parts of the Bay, with a mix of newer builds and first-wave homes now due for an update.",
    council: "Tauranga City Council",
    body: [
      "Pāpāmoa has grown quickly, and that shows in the housing. The earlier developments are now old enough to want updating — kitchens, bathrooms, and reconfigured layouts for how families actually use the space — while the newer builds are mostly at the maintenance and small-alteration stage.",
      "It's a coastal strip, so the same salt and wind exposure that affects the Mount applies here, particularly closer to the beach. Sandy ground conditions also matter for anything involving foundations, piles or a deck that needs to stay level.",
      "Because sections here are often long and narrow, extending or opening up a house takes some planning to keep light and outdoor access working. That's worth getting right before consent drawings are finalised rather than after.",
      CONSENT_TCC,
    ],
    common: [
      "Kitchen and bathroom renovations",
      "Extensions and reconfigured layouts",
      "Decks and outdoor living",
      "Coastal weathertightness maintenance",
    ],
    faqs: [
      {
        q: "Do you build decks in Pāpāmoa?",
        a: "Yes. Decks are one of the more common jobs here. On sandy ground the important part is what's underneath — properly founded piles and level bearers — because that's what stops a deck moving or sagging a few years in.",
      },
      {
        q: "We want to extend rather than move. Where do we start?",
        a: "With a look at the house and the section. On the long, narrow sections common in Pāpāmoa, where you add space decides how much light the existing rooms keep. We'd rather walk it with you before drawings than redesign afterwards.",
      },
      {
        q: "Is Pāpāmoa affected by the same coastal issues as the Mount?",
        a: "Closer to the beach, yes. Salt exposure and wind-driven rain are a factor along the coastal strip, so fixings, flashings and coatings should be specified for it. Further back from the dunes it's less severe.",
      },
    ],
  },
  {
    slug: "bethlehem",
    name: "Bethlehem",
    blurb:
      "Established family homes on the western side of Tauranga, mostly at the stage where they want updating or more room.",
    council: "Tauranga City Council",
    body: [
      "Bethlehem is largely settled residential on the western side of Tauranga. The work we're asked for here tends to be improvement rather than repair: kitchens and bathrooms that have dated, layouts that no longer suit the family, and the structural work that goes with opening a house up.",
      "Removing a wall is the request we get most often, and it's the one where the answer depends entirely on what the wall is doing. If it's load-bearing it needs a beam sized for the span and a consent, and the floor and roof structure above have to be supported while it goes in. That's restricted building work, so it has to be done by or under a Licensed Building Practitioner.",
      "Because these are occupied family homes, staging matters. We'll usually plan a renovation so you keep a working kitchen or bathroom for as much of the job as possible.",
      CONSENT_TCC,
    ],
    common: [
      "Kitchen and bathroom renovations",
      "Wall removal, beams and structural alterations",
      "Extensions and reconfigured layouts",
      "General repairs and maintenance",
    ],
    faqs: [
      {
        q: "Can I remove a wall to open up my kitchen and living area?",
        a: "Usually, but it depends what the wall carries. A non-load-bearing wall is straightforward. A load-bearing one needs a beam sized for the span, temporary support while it goes in, and a building consent. It's restricted building work, so a Licensed Building Practitioner has to carry it out or supervise it.",
      },
      {
        q: "Can we stay in the house during a renovation?",
        a: "Most of the time, yes. We stage the work so you keep a functioning kitchen or bathroom for as long as possible, and we'll tell you up front which stretches will be genuinely disruptive.",
      },
      {
        q: "How long does a bathroom renovation take?",
        a: "For a straightforward bathroom, allow two to three weeks on site once materials are on hand. It stretches if we open up the wall and find water damage in the framing, which is why we look properly before quoting.",
      },
    ],
  },
  {
    slug: "omokoroa",
    name: "Ōmokoroa",
    blurb:
      "A fast-growing harbourside peninsula, with new builds alongside established lifestyle properties.",
    council: "Western Bay of Plenty District Council",
    body: [
      "Ōmokoroa has grown a lot in recent years, and the building work reflects that: newer homes needing decks, fences and landscaping structures, alongside older properties on larger sections that want renovating or maintaining.",
      "It sits on a peninsula in the harbour, so parts of it are exposed to wind and salt, and ground conditions vary noticeably across the area. Anything structural — piles, retaining, a deck on a slope — is worth assessing on site rather than assuming what worked on a flat section will work here.",
      CONSENT_WBOP,
      "It's about a twenty-five minute drive from our base in Tauranga, which is well within our normal working area. We schedule Ōmokoroa jobs in decent blocks rather than short visits, so travel doesn't end up on your invoice.",
    ],
    common: [
      "Decks, retaining and outdoor structures",
      "Renovations on established properties",
      "Structural and subfloor repairs",
      "Lifestyle property maintenance",
    ],
    faqs: [
      {
        q: "Do you travel to Ōmokoroa?",
        a: "Yes, regularly. It's about twenty-five minutes from our Tauranga base. We schedule work here in blocks rather than short visits so travel time doesn't end up costing you.",
      },
      {
        q: "Who handles building consents in Ōmokoroa?",
        a: "Western Bay of Plenty District Council, not Tauranga City. The process is similar but the forms, fees and inspection bookings differ, and applying to the wrong one costs weeks.",
      },
      {
        q: "Can you build a deck on a sloping section?",
        a: "Yes. Sloping and varied ground is common on the peninsula, and it changes the pile and bearer design rather than ruling the deck out. Depending on height and how it attaches to the house, it may need a consent — we'll tell you which before we start.",
      },
    ],
  },
  {
    slug: "te-puke",
    name: "Te Puke",
    blurb:
      "Town and orchard country, where lifestyle blocks, sheds and older homes all need work.",
    council: "Western Bay of Plenty District Council",
    body: [
      "Te Puke and the horticultural country around it is a different mix again. Alongside town housing there are lifestyle blocks and working properties, which means sheds, implement bays, packing space and farm buildings as well as houses.",
      "Older homes here are often on larger sections and have been added to over the years, sometimes without consent. Where that's the case, we'll be straight with you about what can be tidied up as maintenance and what genuinely needs to be brought up to code.",
      CONSENT_WBOP,
    ],
    common: [
      "Renovations and repairs to older homes",
      "Sheds, farm buildings and implement bays",
      "Subfloor, pile and foundation repairs",
      "General carpentry and maintenance",
    ],
    faqs: [
      {
        q: "Do you build sheds and farm buildings around Te Puke?",
        a: "Yes. Sheds, implement bays and similar structures are common work out here. Most need a building consent depending on size and use, and we handle that as part of the job.",
      },
      {
        q: "Our house has been added to over the years without consent. Can you help?",
        a: "Usually. We'll look at what's there and tell you honestly which parts are fine to repair as-is and which need to be brought up to code or regularised with council. It's better to know before you sell than during the sale.",
      },
      {
        q: "How far out of Te Puke will you travel?",
        a: "We cover the wider Western Bay, including the rural areas around Te Puke. For anything further out, give us a call and we'll tell you straight whether we're the right people for it.",
      },
    ],
  },
  {
    slug: "katikati",
    name: "Katikati",
    blurb:
      "Lifestyle blocks and small-town housing at the northern end of the Western Bay.",
    council: "Western Bay of Plenty District Council",
    body: [
      "Katikati sits at the northern end of the Western Bay, and the work here leans rural and lifestyle: homes on larger sections, sheds, and outbuildings that have often been standing a while.",
      "Being further from the city, it's worth grouping work rather than calling someone out for one small item at a time. For lifestyle and rental properties we'll happily work through a list of jobs on a single visit instead of charging a call-out for each one.",
      CONSENT_WBOP,
      "It's roughly a forty minute drive from Tauranga. We do travel for the right job, and we'd rather tell you honestly on the phone if it isn't worth either of our time than turn up and pad the quote.",
    ],
    common: [
      "Renovations and repairs on rural properties",
      "Sheds, carports and outbuildings",
      "Weatherboard and cladding repair",
      "Scheduled maintenance visits",
    ],
    faqs: [
      {
        q: "Is Katikati too far for you to work?",
        a: "No. It's about forty minutes from our Tauranga base and we work there. For very small one-off jobs it's worth grouping a few items into one visit so the travel is worth it for both of us.",
      },
      {
        q: "Can you do a list of jobs in one visit?",
        a: "Yes, and out here that's usually the sensible way to do it. Send through everything that needs attention and we'll work through it on a single visit rather than charging a call-out each time.",
      },
      {
        q: "Do you repair old weatherboards?",
        a: "Yes. Rotten or split weatherboards, damaged fascia and soffits, and failing joinery are all standard work for us. Replacing affected boards early is far cheaper than waiting until the framing behind them is wet.",
      },
    ],
  },
  {
    slug: "whakatane",
    name: "Whakatāne",
    blurb:
      "The eastern Bay, and the part of the country Jack grew up in. Renovations, repairs and building work across the town.",
    council: "Whakatāne District Council",
    body: [
      "Jack grew up in Whakatāne, so it's a part of the country we know well and still work in. The town has a good stock of older homes, and older homes are where the interesting structural work tends to be.",
      "Weatherboard houses of a certain age share a set of problems: piles that have settled, floors that have gone out of level, bottom plates and framing that have taken up moisture, and joinery that no longer seals. All of that is fixable, but it needs opening up and assessing properly rather than patching over the symptom.",
      "Consents here go through Whakatāne District Council, a different territorial authority again from both Tauranga City and Western Bay of Plenty. We know the difference and lodge with the right one.",
      "It's a longer run from Tauranga, so we plan eastern Bay work in blocks. Get in touch and we'll tell you honestly what's practical.",
    ],
    common: [
      "Renovations to older weatherboard homes",
      "Subfloor, pile and re-levelling work",
      "Structural repairs and framing replacement",
      "Weatherboard, joinery and cladding repair",
    ],
    faqs: [
      {
        q: "Do you still work in Whakatāne?",
        a: "Yes. Jack grew up here and we still take work in the eastern Bay. It's a longer run from Tauranga, so we plan it in blocks rather than short visits.",
      },
      {
        q: "My floors are uneven. Is that serious?",
        a: "It's common in older homes and usually comes down to piles that have settled or subfloor timber that's decayed. It's fixable by re-levelling and replacing what's failed. Whether it's urgent depends on the cause, which is why it's worth having someone look under the house rather than guessing.",
      },
      {
        q: "Which council handles consents in Whakatāne?",
        a: "Whakatāne District Council, which is a different authority from Tauranga City and Western Bay of Plenty. We lodge with the right one and book the inspections.",
      },
    ],
  },
];

/** Display names in order — `site.ts` uses this for `areasServed`. */
export const areaNames = areas.map((a) => a.name);

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
