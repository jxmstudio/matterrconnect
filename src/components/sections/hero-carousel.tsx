"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

const INTERVAL = 5500;

/**
 * Rotating hero image. Cross-fades through the featured project covers with a
 * slow Ken-Burns drift, so the first thing a visitor sees is the actual work,
 * moving. Falls back to a single static image under `prefers-reduced-motion`.
 *
 * Slide 0 renders eagerly with `priority` — it's the LCP candidate; the rest
 * lazy-load. All slides are always mounted so the cross-fade is a pure opacity
 * transition with no layout work.
 */
export function HeroCarousel({ projects }: { projects: Project[] }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = projects.length;
  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, paused, count]);

  const active = projects[index] ?? projects[0];
  if (!active) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Link
        href={`/projects/${active.slug}`}
        aria-label={`View project: ${active.title}`}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-stone">
          {projects.map((project, i) => (
            <Image
              key={project.slug}
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 40vw, 100vw"
              aria-hidden={i !== index}
              className={cn(
                "object-cover transition-opacity duration-1000 ease-out motion-safe:animate-[kenburns_12s_ease-out_infinite_alternate]",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}

          {/* Dots */}
          {count > 1 && (
            <div className="absolute bottom-4 left-4 z-10 flex gap-2">
              {projects.map((project, i) => (
                <button
                  key={project.slug}
                  type="button"
                  aria-label={`Show ${project.title}`}
                  aria-current={i === index}
                  onClick={(e) => {
                    e.preventDefault();
                    go(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full bg-[color:var(--canvas)] transition-all duration-500",
                    i === index ? "w-6 opacity-95" : "w-1.5 opacity-50 hover:opacity-80",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 flex items-center gap-3 text-sm text-muted-foreground transition-colors group-hover:text-clay">
          <span className="eyebrow">Recent work</span>
          <span className="flex-1 truncate" aria-live="polite">
            {active.title}
          </span>
          <ArrowRightIcon
            className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </p>
      </Link>
    </div>
  );
}
