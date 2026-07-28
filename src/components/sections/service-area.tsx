import { Reveal } from "@/components/reveal";
import { AreaMarquee } from "@/components/sections/area-marquee";
import { site } from "@/content/site";

/**
 * Service-area list. Reads as reassurance to a homeowner ("do they come out
 * here?") and gives Google an unambiguous set of local terms to associate the
 * business with.
 */
export function ServiceArea() {
  return (
    <section className="border-t border-border">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Where we work</p>
            <h2 className="mt-5 text-3xl leading-tight md:text-4xl">
              {site.location.base} and the wider {site.location.region}
            </h2>
          </div>

          <div className="md:col-span-8">
            <Reveal>
              <AreaMarquee areas={site.location.areasServed} />
              <p className="measure mt-8 text-sm leading-relaxed text-muted-foreground">
                Not on the list? We travel for the right job — give us a call
                and we&apos;ll tell you straight whether we&apos;re the right
                people for it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
