import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon } from "lucide-react";

import { CheckIcon } from "lucide-react";

import { CallButton } from "@/components/call-button";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { areas, getArea } from "@/content/areas";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

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
      <JsonLd data={faqJsonLd(area.faqs)} />

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

      {/* Area-specific prose. This is the section that makes each location
          page genuinely different from the others — see the note in
          content/areas.ts about why that matters. */}
      <section className="border-b border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Building in {area.name}</p>
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="text-muted-foreground">Consent authority</dt>
                  <dd className="mt-1 font-medium">{area.council}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Based in</dt>
                  <dd className="mt-1 font-medium">{site.location.base}</dd>
                </div>
              </dl>
            </div>

            <Reveal className="md:col-span-8">
              <div className="measure space-y-6 text-base leading-relaxed text-muted-foreground">
                {area.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "text-lg text-foreground" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <h2 className="eyebrow">
                  What we&apos;re usually asked for in {area.name}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {area.common.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed">
                      <CheckIcon
                        className="mt-0.5 size-4 shrink-0 text-clay"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-stone/50">
        <div className="container-editorial py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">What we do here</p>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight md:text-4xl">
              Every service, available in {area.name}
            </h2>
          </Reveal>
          <ServicesGrid services={services} className="mt-14" />
        </div>
      </section>

      <FaqList
        faqs={area.faqs}
        heading={`Building in ${area.name}, answered`}
      />

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
