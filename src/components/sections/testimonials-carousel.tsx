"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, QuoteIcon } from "lucide-react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { googleReviewsUrl, testimonials } from "@/content/testimonials";

const INTERVAL = 6500;

/**
 * Rotating testimonials. One review at a time on a sliding track, auto-advancing
 * with pause-on-hover, prev/next controls and dots. Honours
 * prefers-reduced-motion (no auto-advance, instant slide). All reviews stay
 * mounted so the track height is stable and the controls can page through them.
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
      <div className="overflow-hidden">
        <ul
          className="flex motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((item, i) => (
            <li
              key={`${item.author}-${i}`}
              className="w-full shrink-0"
              aria-hidden={i !== index}
              aria-roledescription="slide"
            >
              <figure className="max-w-3xl">
                <QuoteIcon className="size-7 text-clay" aria-hidden="true" />
                <blockquote className="mt-6 text-2xl leading-[1.4] text-balance md:text-[1.75rem]">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="font-medium">{item.author}</span>
                  {item.location && (
                    <span className="text-muted-foreground"> · {item.location}</span>
                  )}
                  {item.project && (
                    <span className="text-muted-foreground"> · {item.project}</span>
                  )}
                  {item.source === "google" && (
                    <span className="mt-1 block text-xs text-muted-foreground">
                      via Google Reviews
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {(count > 1 || googleReviewsUrl) && (
        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-6">
          {count > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {count > 1 && (
            <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((item, i) => (
                <button
                  key={`${item.author}-dot-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial from ${item.author}`}
                  onClick={() => go(i)}
                  className={cn(
                    "h-1.5 rounded-full bg-ink transition-all duration-500",
                    i === index ? "w-6 opacity-90" : "w-1.5 opacity-30 hover:opacity-60",
                  )}
                />
              ))}
            </div>
          )}

          {googleReviewsUrl && (
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-sm font-medium text-clay underline-offset-4 hover:underline"
            >
              Read all our Google reviews →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
