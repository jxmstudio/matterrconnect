"use client";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { ProjectVideo as ProjectVideoData } from "@/content/projects";

/**
 * A project clip. Short silent clips (`ambient`) play on a muted loop like a
 * moving photo, unless the visitor prefers reduced motion. Longer clips with
 * sound wait for the visitor to press play.
 */
export function ProjectVideo({ video }: { video: ProjectVideoData }) {
  const reduceMotion = usePrefersReducedMotion();
  const autoplay = video.ambient && !reduceMotion;

  return (
    <figure>
      <div className="relative aspect-[3/4] overflow-hidden bg-stone">
        <video
          // Remount when the motion preference resolves so autoplay applies.
          key={autoplay ? "auto" : "manual"}
          src={video.src}
          poster={video.poster}
          aria-label={video.label}
          className="absolute inset-0 size-full object-cover"
          playsInline
          preload="metadata"
          controls={!autoplay}
          autoPlay={autoplay}
          muted={video.ambient}
          loop={video.ambient}
        />
      </div>
      {video.caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {video.caption}
        </figcaption>
      )}
    </figure>
  );
}
