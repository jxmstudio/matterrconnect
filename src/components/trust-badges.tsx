import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { qualifications } from "@/content/qualifications";

/**
 * Licensing and certification badges.
 *
 * These render as type, not images, because we do not have the official
 * Licensed Building Practitioner, Site Safe or St John trademark files and
 * will not approximate them. Once the real assets are supplied, set `logo` on
 * the relevant entry in src/content/qualifications.ts and swap the <span> for
 * an <Image> here.
 */
export function TrustBadges({
  className,
  variant = "row",
}: {
  className?: string;
  variant?: "row" | "stack";
}) {
  return (
    <ul
      className={cn(
        "flex gap-x-6 gap-y-3",
        variant === "row" ? "flex-wrap items-center" : "flex-col",
        className,
      )}
    >
      {qualifications.map((q) => (
        <li
          key={q.name}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <CheckIcon
            className="size-3.5 shrink-0 text-clay"
            aria-hidden="true"
          />
          <span>{q.short}</span>
        </li>
      ))}
    </ul>
  );
}
