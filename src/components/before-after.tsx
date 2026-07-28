"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/content/projects";

/**
 * Draggable before/after comparison. The finished shot sits underneath; the
 * "before" is clipped to the handle position with `clip-path`, so both images
 * stay full-size and undistorted — only the reveal width changes.
 *
 * Pointer, touch and keyboard driven (the handle is a real ARIA slider). It's
 * entirely user-initiated, so there's no motion to suppress for reduced-motion.
 */
export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: ProjectImage;
  after: ProjectImage;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
    setTouched(true);
  }, []);

  return (
    <figure className={className}>
      <div
        ref={containerRef}
        className={cn(
          "relative aspect-[3/4] w-full touch-none overflow-hidden bg-stone select-none",
          dragging ? "cursor-grabbing" : "cursor-ew-resize",
        )}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setDragging(true);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging) setFromClientX(e.clientX);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {/* After (base layer) */}
        <Image
          src={after.src}
          alt={after.alt}
          fill
          priority
          sizes="(min-width: 768px) 36rem, 100vw"
          className="object-cover"
        />
        <span className="absolute top-4 right-4 z-10 bg-ink/85 px-3 py-1 text-xs font-medium tracking-[0.16em] text-[color:var(--canvas)] uppercase">
          After
        </span>

        {/* Before (clipped to the handle) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(min-width: 768px) 36rem, 100vw"
            className="object-cover"
          />
          <span className="absolute top-4 left-4 z-10 bg-ink/85 px-3 py-1 text-xs font-medium tracking-[0.16em] text-[color:var(--canvas)] uppercase">
            Before
          </span>
        </div>

        {/* Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-[color:var(--canvas)]"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label="Reveal more of the before or after photo"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% before revealed`}
            onKeyDown={(e) => {
              const step = e.shiftKey ? 10 : 4;
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
              else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
              else if (e.key === "Home") setPos(0);
              else if (e.key === "End") setPos(100);
              else return;
              e.preventDefault();
              setTouched(true);
            }}
            className="pointer-events-auto absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-[color:var(--canvas)] text-ink shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* One-time hint */}
        <div
          className={cn(
            "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-ink/85 px-4 py-1.5 text-xs font-medium tracking-wide text-[color:var(--canvas)] transition-opacity duration-500",
            touched ? "opacity-0" : "opacity-100",
          )}
        >
          Drag to compare
        </div>
      </div>

      {after.caption && (
        <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {after.caption}
        </figcaption>
      )}
    </figure>
  );
}
