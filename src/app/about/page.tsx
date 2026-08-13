import Image from "next/image";
import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { qualifications } from "@/content/qualifications";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About us",
  description:
    "Matter Construction is a licensed building company in Tauranga, started by Jack and Anna to do renovation and structural work properly.",
  path: "/about",
  cardTitle: "Built on the way we'd want it done for us",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHeader
        eyebrow="About"
        title="Built on the way we'd want it done for us."
        intro={`Matter Construction is a licensed building company based in ${site.location.base}, working across the wider ${site.location.region}.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Company story — Jack's own words, lightly polished. */}
      <section className="border-b border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">The story</p>
              <Reveal className="mt-8">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  <Image
                    src="/images/team/jack.jpg"
                    alt="Jack, founder of Matter Construction, in a branded crew"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Jack, founder of Matter Construction
                </p>
              </Reveal>

              <Reveal className="mt-8" delay={80}>
                <div className="relative aspect-[2/3] overflow-hidden bg-stone">
                  <Image
                    src="/images/team/van.jpg"
                    alt="A Matter Construction team member hopping into the branded work van, ready for the next job"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  On the road to the next job
                </p>
              </Reveal>
            </div>

            <Reveal className="md:col-span-8">
              <div className="measure space-y-6 text-base leading-relaxed">
                <p className="text-2xl leading-[1.35] text-pretty md:text-[1.6rem]">
                  I grew up in Whakatāne and had a very blessed kiwi childhood —
                  full of sport, friends and family.
                </p>
                <p className="text-muted-foreground">
                  I stumbled into the construction industry after a hopeless
                  attempt at university, and I haven&apos;t looked back. In
                  gaining my experience I worked on everything from fences to
                  multi-million-dollar homes, and I&apos;m grateful to all my
                  past employers and workmates for the knowledge and experience
                  they passed down.
                </p>
                <p className="text-muted-foreground">
                  With the help of my partner Anna we started Matter
                  Construction — an opportunity to serve clients the way we
                  wanted to. With respect to the quality of our work, how
                  efficiently we operate and the transparency of our approach,
                  our goal is to not only satisfy but delight every customer. In
                  doing so, we hope we can build something to be proud of.
                </p>
                <p className="pt-2 font-medium">— Jack, Matter Construction</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="border-b border-border bg-stone/50">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Qualifications</p>
              <h2 className="mt-5 text-3xl leading-tight md:text-4xl">
                Licensed, certified, and insured to do the work
              </h2>
            </div>

            <div className="md:col-span-8">
              <ul>
                {qualifications.map((qualification, i) => (
                  <Reveal
                    as="li"
                    key={qualification.name}
                    delay={i * 70}
                    className="border-t border-border py-7"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl leading-tight">
                          {qualification.name}
                        </h3>
                        <p className="measure mt-3 text-sm leading-relaxed text-muted-foreground">
                          {qualification.detail}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">How we work</p>
              <h2 className="mt-5 text-3xl leading-tight md:text-4xl">
                What happens after you call
              </h2>
            </div>

            <div className="md:col-span-8">
              <ol className="space-y-10">
                {[
                  {
                    step: "We come and look",
                    body: "No charge, no obligation. We'd rather spend half an hour on site than guess at a price over the phone — for anything beyond a small repair, a real look is the only way to quote accurately.",
                  },
                  {
                    step: "You get a written scope",
                    body: "Not a number on the back of an envelope. You'll get what's included, what isn't, and what we've assumed — so you can compare us properly against anyone else you're talking to.",
                  },
                  {
                    step: "We agree a programme",
                    body: "Realistic dates, not optimistic ones. If something moves — materials, weather, a subtrade — you hear it from us before you notice it yourself.",
                  },
                  {
                    step: "We build it",
                    body: "You'll know who's on site each day. Variations get agreed before they're carried out, never discovered on the final invoice.",
                  },
                  {
                    step: "We finish properly",
                    body: "The last ten percent is where most builders lose people. We walk the job with you, write down anything that isn't right, and put it right.",
                  },
                ].map((item, i) => (
                  <Reveal as="li" key={item.step} delay={i * 60}>
                    <div className="flex gap-5">
                      <span className="font-mono text-xs text-clay tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl leading-tight">{item.step}</h3>
                        <p className="measure mt-3 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want to talk it through?"
        body="Give us a call, or send through a few details and we'll get back to you."
        location="about-footer"
      />
    </>
  );
}
