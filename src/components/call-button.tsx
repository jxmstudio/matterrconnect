import Link from "next/link";
import { PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

type CallButtonProps = {
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  /** Show the number itself rather than a generic label. */
  showNumber?: boolean;
  label?: string;
  /** Distinguishes which CTA fired, for analytics. */
  location: string;
};

/**
 * Click-to-call. The single most important conversion element on a trades
 * site — most visitors arrive on a phone and want to talk to someone.
 *
 * `data-analytics` attributes are read by the GA4 listener in analytics.tsx.
 */
export function CallButton({
  className,
  variant = "default",
  size = "lg",
  showNumber = true,
  label,
  location,
}: CallButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <a
        href={site.phone.href}
        data-analytics="call"
        data-analytics-location={location}
      >
        <PhoneIcon aria-hidden="true" />
        {label ?? (showNumber ? site.phone.display : "Call us")}
      </a>
    </Button>
  );
}

/** The paired "Request a quote" CTA. Kept alongside so the two stay in sync. */
export function QuoteButton({
  className,
  variant = "outline",
  size = "lg",
  label = "Request a quote",
  location,
}: Omit<CallButtonProps, "showNumber">) {
  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link
        href="/contact"
        data-analytics="quote"
        data-analytics-location={location}
      >
        {label}
      </Link>
    </Button>
  );
}
