import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon } from "lucide-react";

import { CallButton } from "@/components/call-button";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { areas, getArea } from "@/content/areas";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area)
    return buildMetadata({ title: "Not found", description: "", index: false });

  return buildMetadata({
    title: `Builders in ${area.name}`,
    // Kept clear of 165 characters for the longest suburb names — repeating
    // the name twice pushed Mount Maunganui's description to 175 and Google
    // cut it off mid-sentence.
    description: `Licensed builders serving ${area.name}. Renovations, structural repairs, re-cladding and property maintenance across the ${site.location.region}.`,
    path: `/areas/${area.slug}`,
    cardEyebrow: `Service area · ${site.location.region}`,
  });
}

export default async function AreaPage({ params }: Params) {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) notFound();

  const others = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: area.name, path: `/areas/${area.slug}` },
        ])}
      />
      {/* Ties this page to the one business record and names the served city, so
          Google can associate the LBP with the local query. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Building and renovation in ${area.name}`,
          serviceType: "Building, renovation and structural repair",
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "City", name: area.name },
          url: `${site.url}/areas/${area.slug}`,
        }}
      />

      <PageHeader
        eyebrow={`Service area · ${site.location.region}`}
        title={`Builders in ${area.name}`}
        intro={area.blurb}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: area.name, path: `/areas/${area.slug}` },
        ]}
      >
        <CallButton className="mt-10" size="xl" location={`area-${area.slug}`} />
      </PageHeader>

      <section className="border-b border-border">
        <div className="container-editorial py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">What we do here</p>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight md:text-4xl">
              The work we take on in {area.name}
            </h2>
          </Reveal>
          <ServicesGrid services={services} className="mt-14" />
        </div>
      </section>

      <section className="border-b border-border bg-stone/50">
        <div className="container-editorial py-16 md:py-20">
          <p className="eyebrow">Other areas we serve</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/areas/${other.slug}`}
                  className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-clay hover:underline"
                >
                  {other.name}
                  <ArrowRightIcon
                    className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading={`Planning something in ${area.name}?`}
        body={`Tell us what you've got in mind and we'll come out and take a look. We work across ${area.name} and the wider ${site.location.region}.`}
        location={`area-${area.slug}`}
      />
    </>
  );
}
