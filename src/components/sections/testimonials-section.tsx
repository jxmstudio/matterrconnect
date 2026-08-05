import {
  GoogleProfileButton,
  GoogleRatingSummary,
  GoogleReviewCard,
} from "@/components/google-review";
import { Reveal } from "@/components/reveal";
import { CallButton } from "@/components/call-button";
import { cn } from "@/lib/utils";
import {
  googleRating,
  googleReviewsUrl,
  testimonials,
} from "@/content/testimonials";

/**
 * Renders whatever testimonials exist, as Google-style review cards matching
 * the homepage carousel.
 *
 * The empty state degrades to an honest prompt rather than a broken or
 * fabricated section — see the note in src/content/testimonials.ts.
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
      <GoogleRatingSummary
        value={googleRating.value}
        count={googleRating.count}
        className="mb-10"
      />

      <ul className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal as="li" key={`${item.author}-${i}`} delay={i * 80}>
            <GoogleReviewCard item={item} />
          </Reveal>
        ))}
      </ul>

      {googleReviewsUrl && (
        <Reveal className="mt-10">
          <GoogleProfileButton href={googleReviewsUrl} />
          <p className="mt-4 text-sm text-muted-foreground">
            These reviews are published on Google, where you can read all{" "}
            {googleRating.count} of them in full.
          </p>
        </Reveal>
      )}
    </div>
  );
}
