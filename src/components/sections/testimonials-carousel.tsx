"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import {
  GoogleProfileButton,
  GoogleRatingSummary,
  GoogleReviewCard,
} from "@/components/google-review";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import {
  googleRating,
  googleReviewsUrl,
  testimonials,
} from "@/content/testimonials";

const INTERVAL = 6500;

/**
 * Rotating Google reviews. One card at a time on a sliding track,
 * auto-advancing with pause on hover/focus, prev/next controls and dots.
 * Honours prefers-reduced-motion. All reviews stay mounted so the track height
 * is stable and the controls can page through them.
 */
export function TestimonialsCarousel({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = testimonials.length;
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, paused, count]);

  if (count === 0) return null;

  return (
    <div
      className={className}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <GoogleRatingSummary
        value={googleRating.value}
        count={googleRating.count}
        className="mb-8"
      />

      <div className="overflow-hidden">
        <ul
          className="flex items-stretch motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((item, i) => (
            <li
              key={`${item.author}-${i}`}
              className="w-full shrink-0"
              aria-hidden={i !== index}
              aria-roledescription="slide"
            >
              <GoogleReviewCard item={item} className="mx-auto max-w-2xl" />
            </li>
          ))}
        </ul>
      </div>

      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous review"
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Choose review">
            {testimonials.map((item, i) => (
              <button
                key={`${item.author}-dot-${i}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show review from ${item.author}`}
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 rounded-full bg-ink transition-all duration-500",
                  i === index ? "w-6 opacity-90" : "w-1.5 opacity-30 hover:opacity-60",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next review"
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {googleReviewsUrl && (
        <div className="mt-8 flex justify-center">
          <GoogleProfileButton href={googleReviewsUrl} />
        </div>
      )}
    </div>
  );
}
