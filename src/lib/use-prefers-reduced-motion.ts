"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 *
 * Motion in globals.css is already neutralised via the media query, but any
 * JS-driven motion — auto-advancing a carousel, running a marquee — has to opt
 * out itself. Modelled as an external store: the server snapshot is `false`
 * (matching the first client render, so no hydration mismatch), then it syncs
 * to the real media query and re-renders on change.
 */
function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
