import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Brand mark. The client's real logo (a horizontal lockup) is used site-wide;
 * every header/footer usage goes through here, so this is the only place to
 * touch if the asset ever changes.
 *
 * The site is light-only, so the navy-on-transparent logo reads cleanly on
 * every surface it lands on. `stacked` is retained for call-site compatibility
 * but no longer changes the layout — the supplied lockup is a single line.
 */
export function Wordmark({
  className,
  stacked = true,
}: {
  className?: string;
  /** Kept for API compatibility; the supplied logo is a single-line lockup. */
  stacked?: boolean;
}) {
  void stacked;
  return (
    <Image
      src="/images/brand/logo.png"
      alt={site.name}
      width={670}
      height={148}
      className={cn("h-7 w-auto md:h-8", className)}
    />
  );
}
