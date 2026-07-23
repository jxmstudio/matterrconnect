"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * GA4, gated behind NEXT_PUBLIC_GA_ID. With no ID set — local dev, and any
 * deploy before the property exists — nothing loads and no requests are made.
 *
 * Also attaches a single delegated listener that reports clicks on elements
 * carrying `data-analytics="call"` or `data-analytics="quote"`, so enquiry
 * intent is measurable per placement (header, hero, mobile bar, footer...).
 * That's what the care plan's monthly reporting is built on.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        "[data-analytics]",
      );
      if (!target) return;

      const action = target.getAttribute("data-analytics");
      const location = target.getAttribute("data-analytics-location") ?? "unknown";

      window.gtag?.("event", action === "call" ? "click_to_call" : "quote_intent", {
        placement: location,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
