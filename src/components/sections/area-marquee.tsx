"use client";

import Link from "next/link";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { Area } from "@/content/areas";

type Item = Pick<Area, "name" | "slug">;

/**
 * The service-area suburbs as a slow, seamless ticker of links to each area
 * page. The list is rendered twice so the -50% translate loops without a seam;
 * the second copy is aria-hidden so the links aren't announced or focused
 * twice. Pauses on hover; degrades to a static wrapping list under
 * prefers-reduced-motion.
 */
function Chip({
  area,
  className,
  duplicate = false,
}: {
  area: Item;
  className?: string;
  duplicate?: boolean;
}) {
  return (
    <li className={cn("shrink-0", className)} aria-hidden={duplicate || undefined}>
      <Link
        href={`/areas/${area.slug}`}
        tabIndex={duplicate ? -1 : undefined}
        className="inline-block border border-border px-4 py-2 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:border-clay hover:text-clay"
      >
        {area.name}
      </Link>
    </li>
  );
}

export function AreaMarquee({ areas }: { areas: readonly Item[] }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <ul className="flex flex-wrap gap-x-3 gap-y-3">
        {areas.map((area) => (
          <Chip key={area.slug} area={area} />
        ))}
      </ul>
    );
  }

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      {/* Spacing is a right margin on every chip (not flex gap) so the two
          copies tile exactly and the -50% loop is seamless. */}
      <ul className="flex w-max motion-safe:animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
        {areas.map((area) => (
          <Chip key={area.slug} area={area} className="mr-3" />
        ))}
        {areas.map((area) => (
          <Chip key={`dup-${area.slug}`} area={area} className="mr-3" duplicate />
        ))}
      </ul>
    </div>
  );
}
