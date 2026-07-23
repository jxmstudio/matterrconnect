import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Typeset wordmark, used in place of a logo file.
 *
 * The client has not supplied a logo. Rather than fake one, the brand mark is
 * pure type — which is both honest and consistent with the editorial direction.
 *
 * WHEN THE REAL LOGO ARRIVES: replace the contents of this component with an
 * <Image>. Nothing else in the codebase needs to change; every usage goes
 * through here.
 */
export function Wordmark({
  className,
  stacked = true,
}: {
  className?: string;
  /** Two-line lockup (header/footer) vs single line (tight spaces). */
  stacked?: boolean;
}) {
  return (
    <span
      className={cn("font-heading inline-flex leading-none", className)}
      aria-label={site.name}
    >
      {stacked ? (
        <span className="flex flex-col gap-[0.15em]">
          <span
            className="text-[1.05em] font-semibold"
            style={{ letterSpacing: "-0.04em" }}
          >
            MATTER
          </span>
          <span
            className="text-[0.42em] font-medium opacity-70"
            style={{ letterSpacing: "0.34em" }}
          >
            CONSTRUCTION
          </span>
        </span>
      ) : (
        <span className="font-semibold" style={{ letterSpacing: "-0.03em" }}>
          MATTER
          <span className="ml-[0.4em] font-medium opacity-60">
            CONSTRUCTION
          </span>
        </span>
      )}
    </span>
  );
}
