import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Brand mark. The client's real logo (a horizontal lockup) is used site-wide;
 * every header/footer usage goes through here, so this is the only place to
 * touch if the asset ever changes.
 *
 * The site is a light base with navy anchor bands, so the logo comes in two
 * finishes: the navy lockup for light surfaces (default) and the reversed
 * white lockup for the navy bands. Pass `onDark` on a navy surface.
 */
export function Wordmark({
  className,
  onDark = false,
}: {
  className?: string;
  /** Use the white lockup — set this on navy surfaces (hero header, footer). */
  onDark?: boolean;
}) {
  return (
    <Image
      src={onDark ? "/images/brand/logo-reversed.png" : "/images/brand/logo.png"}
      alt={site.name}
      width={670}
      height={148}
      className={cn("h-7 w-auto md:h-8", className)}
    />
  );
}
