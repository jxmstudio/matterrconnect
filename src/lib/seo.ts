import type { Metadata } from "next";
import { isDemoDeployment, site } from "@/content/site";
import { services } from "@/content/services";

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/services". Omit for the homepage. */
  path?: string;
  /** Set false on thin or duplicate pages. */
  index?: boolean;
  /** Headline for the share card, when the page title reads poorly on it. */
  cardTitle?: string;
  /** Small label above the share-card headline. Defaults to the location. */
  cardEyebrow?: string;
};

/**
 * Pads a short meta description with a trailing sentence.
 *
 * Google truncates around 160 characters and gives very short descriptions
 * less to work with, so summaries written for on-page use (often under 120)
 * get a location sentence appended rather than being rewritten twice.
 */
export function fitDescription(
  base: string,
  suffix: string,
  min = 120,
  max = 165,
) {
  if (base.length >= min) return base;
  const padded = `${base} ${suffix}`;
  // Never pad past the truncation point — a description cut off mid-sentence
  // reads worse than a short one.
  return padded.length <= max ? padded : base;
}

/**
 * Share-card URL for a page. Every page gets its own: the card route renders
 * whatever title it's handed, so a shared link never falls back to a generic
 * image (or, as before, to no image at all).
 */
function shareCard(title: string, eyebrow?: string) {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `${site.url}/og?${params.toString()}`;
}

/**
 * Every page's metadata goes through here so titles, canonicals and OG tags
 * stay consistent. The root layout sets `metadataBase`, so relative canonicals
 * resolve correctly.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  index = true,
  cardTitle,
  cardEyebrow,
}: BuildMetadataArgs): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  const image = shareCard(cardTitle ?? title, cardEyebrow);

  return {
    title,
    description,
    alternates: { canonical: url },
    // A demo build is never indexable, whatever the page asks for.
    robots:
      isDemoDeployment || !index
        ? { index: false, follow: !isDemoDeployment }
        : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: "en_NZ",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * LocalBusiness structured data. This is what feeds Google's map pack and the
 * knowledge panel, so it needs to agree exactly with the Google Business
 * Profile once that's set up — same name, same phone, same area served.
 *
 * `GeneralContractor` is a subtype of LocalBusiness and the correct schema.org
 * type for a building company.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    image: shareCard(site.tagline),
    logo: `${site.url}/images/brand/logo.png`,
    priceRange: "$$",
    // No street address or `geo` on purpose: this is a service-area business
    // that works out of clients' properties, and Google's own guidance is to
    // declare the area served rather than publish an address you don't trade
    // from. `areaServed` below carries that.
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.base,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    areaServed: site.location.areasServed.map((name) => ({
      "@type": "City",
      name,
    })),
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: `${site.url}/services/${service.slug}`,
        },
      })),
    },
    sameAs: site.socials.map((s) => s.href),
  };
}

/**
 * FAQ structured data.
 *
 * This is what makes a page eligible for the "People also ask" boxes and for
 * being quoted directly in AI answers — the site had none of it, which was the
 * single biggest gap in how it reads to answer engines.
 *
 * Only mark up questions that are genuinely answered in the visible page text.
 * Marking up answers a visitor can't see is against Google's guidelines.
 */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** Breadcrumbs help Google render the site hierarchy in results. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}
