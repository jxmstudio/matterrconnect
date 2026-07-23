"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Fade-and-rise entrance on scroll.
 *
 * Progressive by design: the markup renders visible, and the `js-reveal` class
 * that hides it is only added once this effect runs. If JS fails or is
 * disabled, the content is simply there. `prefers-reduced-motion` is honoured
 * in globals.css.
 *
 * Classes are applied straight to the node rather than through React state —
 * this is a DOM side effect, not application state, and routing it through
 * state would cause a cascading re-render on every element on the page.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Milliseconds. Use small increments to stagger a group. */
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
