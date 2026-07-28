import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Brand mark. The client's real logo (a horizontal lockup) is used site-wide;
 * every header/footer usage goes through here, so this is the only place to
 * touch if the asset ever changes.
 *
 * The site runs on a deep-navy canvas, so the reversed (white-on-transparent)
 * lockup is the one that reads across the chrome. `stacked` is retained for
 * call-site compatibility but no longer changes the layout — the supplied
 * lockup is a single line.
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
      src="/images/brand/logo-reversed.png"
      alt={site.name}
      width={670}
      height={148}
      className={cn("h-7 w-auto md:h-8", className)}
    />
  );
}
