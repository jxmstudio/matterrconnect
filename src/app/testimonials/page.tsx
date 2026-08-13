import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { hasTestimonials } from "@/content/testimonials";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials",
  description:
    "Verified Google reviews for Matter Construction, rated 5.0 by clients across Tauranga and the Bay of Plenty. Read what they say about the work.",
  path: "/testimonials",
  cardTitle: "In our clients' words",
  // Don't ask Google to index a page with nothing on it yet. Flip this to true
  // — or just delete the option — once testimonials.ts has entries.
  index: hasTestimonials,
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />

      <PageHeader
        eyebrow="Testimonials"
        title="In our clients' words."
        intro="The best measure of a builder is whether the last client would have them back."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ]}
      />

      <section>
        <div className="container-editorial py-16 md:py-24">
          <TestimonialsSection />
        </div>
      </section>

      <CtaBand location="testimonials-footer" />
    </>
  );
}
