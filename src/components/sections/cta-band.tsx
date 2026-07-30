import { CallButton, QuoteButton } from "@/components/call-button";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

/**
 * The closing call to action. Every page ends with one of these — a visitor
 * who has read to the bottom of a page is the warmest lead on the site.
 */
export function CtaBand({
  heading = "Got a job in mind?",
  body = "Tell us what you're planning and we'll come and take a look. No obligation, and no pressure if the numbers don't work for you.",
  location,
}: {
  heading?: string;
  body?: string;
  /** Analytics label for this placement. */
  location: string;
}) {
  return (
    <section className="dark bg-background text-foreground">
      <div className="container-editorial py-20 md:py-28">
        <Reveal className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">Free, no-obligation quote</p>
            <h2 className="mt-5 text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="measure mt-6 text-base leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
            <CallButton size="xl" location={location} />
            <QuoteButton
              size="xl"
              location={location}
              className="border-foreground/25 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground"
            />
          </div>
        </Reveal>

        <p className="mt-12 border-t border-foreground/15 pt-8 text-sm text-muted-foreground">
          Serving {site.location.blurb} · Licensed Building Practitioner
        </p>
      </div>
    </section>
  );
}
