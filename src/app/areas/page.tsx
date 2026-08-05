import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { areas } from "@/content/areas";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Areas we serve",
  description: `Matter Construction works across ${site.location.blurb}, from ${site.location.base} out to the wider ${site.location.region}. See the towns and suburbs we build in.`,
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
        ])}
      />

      <PageHeader
        eyebrow="Service areas"
        title="Where we work."
        intro={`We're based in ${site.location.base} and work across the wider ${site.location.region}. Pick your area for the detail, or just give us a call.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
        ]}
      />

      <section>
        <div className="container-editorial py-16 md:py-24">
          <ul className="grid gap-x-12 md:grid-cols-2">
            {areas.map((area, i) => (
              <Reveal
                as="li"
                key={area.slug}
                delay={(i % 2) * 70}
                className="group border-t border-border"
              >
                <Link
                  href={`/areas/${area.slug}`}
                  className="flex h-full flex-col gap-4 py-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:py-10"
                >
                  <div className="flex items-center justify-between gap-6">
                    <h2 className="text-2xl leading-tight transition-colors group-hover:text-clay md:text-[1.75rem]">
                      Builders in {area.name}
                    </h2>
                    <ArrowRightIcon
                      className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-clay"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {area.blurb}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Not sure if we cover you?"
        body="If you're near the Bay of Plenty and it's the right job, we'll travel. Give us a call and we'll tell you straight."
        location="areas-footer"
      />
    </>
  );
}
