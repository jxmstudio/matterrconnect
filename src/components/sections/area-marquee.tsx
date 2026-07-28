"use client";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The service-area suburbs as a slow, seamless ticker. The list is rendered
 * twice inside the track so the -50% translate loops without a seam; edge masks
 * fade it into the page. Pauses on hover. Under `prefers-reduced-motion` it
 * degrades to the original static, wrapping chip list.
 */
function Chip({ area, className }: { area: string; className?: string }) {
  return (
    <li
      className={cn(
        "shrink-0 border border-border px-4 py-2 text-sm whitespace-nowrap text-muted-foreground",
        className,
      )}
    >
      {area}
    </li>
  );
}

export function AreaMarquee({ areas }: { areas: readonly string[] }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <ul className="flex flex-wrap gap-x-3 gap-y-3">
        {areas.map((area) => (
          <Chip key={area} area={area} />
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
        {[...areas, ...areas].map((area, i) => (
          <Chip key={`${area}-${i}`} area={area} className="mr-3" />
        ))}
      </ul>
    </div>
  );
}
