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
};

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
}: BuildMetadataArgs): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
    image: `${site.url}/opengraph-image`,
    priceRange: "$$",
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
