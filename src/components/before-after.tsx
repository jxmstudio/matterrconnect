"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/content/projects";

const LABELS = ["Before", "After"] as const;

/**
 * Click-through before/after comparison. One photo shows at a time — click
 * the photo, use the arrow buttons, or pick a label to switch — instead of
 * dragging a reveal handle. Simpler to use on both mobile and desktop, and it
 * shows each photo at its full, undistorted size rather than a clipped sliver.
 */
export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: ProjectImage;
  after: ProjectImage;
  className?: string;
}) {
  const images = [before, after];
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => setIndex(((next % images.length) + images.length) % images.length),
    [images.length],
  );

  const active = images[index];

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label={`Show ${LABELS[(index + 1) % 2]} photo`}
        className="group relative block aspect-[3/4] w-full cursor-pointer overflow-hidden bg-stone select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {images.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 36rem, 100vw"
            aria-hidden={i !== index}
            className={cn(
              "object-cover transition-opacity duration-500 ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        <span
          aria-live="polite"
          className={cn(
            "absolute top-4 z-10 bg-ink/85 px-3 py-1 text-xs font-medium tracking-[0.16em] text-[color:var(--canvas)] uppercase",
            index === 0 ? "left-4" : "right-4",
          )}
        >
          {LABELS[index]}
        </span>

        <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/5" />
      </button>

      <div className="mt-4 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Choose photo">
          {LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => go(i)}
              className={cn(
                "px-1 text-xs font-medium tracking-[0.1em] uppercase transition-colors",
                i === index ? "text-clay" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </button>
      </div>

      {active.caption && (
        <figcaption className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
          {active.caption}
        </figcaption>
      )}
    </figure>
  );
}
