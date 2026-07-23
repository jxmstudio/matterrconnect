"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardListIcon, PhoneIcon } from "lucide-react";

import { site } from "@/content/site";

/**
 * Fixed Call / Quote bar pinned to the bottom of the viewport on phones.
 *
 * This is the highest-leverage conversion element on the site: it guarantees
 * the plan's requirement that a visitor is never more than one tap from
 * contacting Jack, on any page, without scrolling.
 *
 * Hidden on /contact, where the form and phone number are already the page.
 * The body reserves space for it via `pb-16 lg:pb-0` in the layout, so it
 * never covers footer content.
 */
export function MobileCtaBar() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-2 gap-px bg-border">
        <a
          href={site.phone.href}
          data-analytics="call"
          data-analytics-location="mobile-bar"
          className="flex h-16 flex-col items-center justify-center gap-1 bg-background text-sm font-medium transition-colors active:bg-stone"
        >
          <PhoneIcon className="size-[1.15rem] text-clay" aria-hidden="true" />
          Call now
        </a>
        <Link
          href="/contact"
          data-analytics="quote"
          data-analytics-location="mobile-bar"
          className="flex h-16 flex-col items-center justify-center gap-1 bg-clay text-sm font-medium text-primary-foreground transition-colors active:bg-clay-dark"
        >
          <ClipboardListIcon className="size-[1.15rem]" aria-hidden="true" />
          Request a quote
        </Link>
      </div>
    </div>
  );
}
