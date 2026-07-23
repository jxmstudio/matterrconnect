import { QuoteIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { CallButton } from "@/components/call-button";
import { cn } from "@/lib/utils";
import {
  googleReviewsUrl,
  testimonials,
  type Testimonial,
} from "@/content/testimonials";

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <Reveal
      as="figure"
      delay={index * 80}
      className="flex flex-col border-t border-border pt-8"
    >
      <QuoteIcon className="size-5 text-clay" aria-hidden="true" />
      <blockquote className="mt-5 text-lg leading-relaxed text-pretty">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-medium">{item.author}</span>
        {item.location && (
          <span className="text-muted-foreground"> · {item.location}</span>
        )}
        {item.project && (
          <span className="mt-1 block text-muted-foreground">
            {item.project}
          </span>
        )}
        {item.source === "google" && (
          <span className="mt-1 block text-xs text-muted-foreground">
            via Google Reviews
          </span>
        )}
      </figcaption>
    </Reveal>
  );
}

/**
 * Renders whatever testimonials exist.
 *
 * The empty state is the expected state right now — see the note in
 * src/content/testimonials.ts. It degrades to an honest prompt rather than a
 * broken or fabricated section.
 */
export function TestimonialsSection({
  className,
  /** Compact variant for the homepage. */
  limit,
}: {
  className?: string;
  limit?: number;
}) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  if (items.length === 0) {
    return (
      <div className={cn("border-t border-border pt-10", className)}>
        <Reveal className="measure">
          <p className="text-lg leading-relaxed text-muted-foreground">
            We&apos;re collecting written reviews from recent clients and
            they&apos;ll appear here shortly. In the meantime, we&apos;re happy
            to put you in touch with people we&apos;ve built for — just ask.
          </p>
          <CallButton
            className="mt-8"
            variant="outline"
            size="lg"
            label="Ask for a reference"
            location="testimonials-empty"
          />
        </Reveal>
      </div>
    );
  }

  return (
    <div className={className}>
      <ul className="grid gap-10 md:grid-cols-2 lg:gap-14">
        {items.map((item, i) => (
          <li key={`${item.author}-${i}`}>
            <TestimonialCard item={item} index={i} />
          </li>
        ))}
      </ul>

      {googleReviewsUrl && (
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-block text-sm font-medium text-clay underline-offset-4 hover:underline"
        >
          Read all our Google reviews →
        </a>
      )}
    </div>
  );
}
