import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Renovations and structural repairs, leaky home re-cladding, residential property maintenance, commercial facilities work and residential developments across Tauranga and the Bay of Plenty.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHeader
        eyebrow="Services"
        title="What we take on."
        intro={`Residential and light commercial building work across ${site.location.blurb}. If it's structural, weathertight or timber, it's our work.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <section>
        <div className="container-editorial py-16 md:py-24">
          <ServicesGrid services={services} />
        </div>
      </section>

      <CtaBand
        heading="Not sure which one you need?"
        body="Most jobs don't fit neatly into a category. Describe what's going on and we'll tell you what's involved."
        location="services-footer"
      />
    </>
  );
}
