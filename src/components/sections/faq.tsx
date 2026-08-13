import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type Faq = { q: string; a: string };

/**
 * Question-and-answer block.
 *
 * Rendered as plain, always-visible text rather than a collapsible accordion:
 * the answers are short, and search engines and AI assistants quote visible
 * copy far more reliably than content hidden behind a toggle. The questions are
 * real headings so they can be picked up as featured snippets.
 *
 * Pair every use with faqJsonLd() from lib/seo so the markup matches what's on
 * the page.
 */
export function FaqList({
  faqs,
  heading = "Common questions",
  className,
}: {
  faqs: Faq[];
  heading?: string;
  className?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section className={cn("border-b border-border", className)}>
      <div className="container-editorial py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-5 text-3xl leading-tight md:text-4xl">
              {heading}
            </h2>
          </div>

          <div className="md:col-span-8">
            <dl>
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 60} className="border-t border-border py-7">
                  <dt className="text-xl leading-tight">{faq.q}</dt>
                  <dd className="measure mt-3 text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
