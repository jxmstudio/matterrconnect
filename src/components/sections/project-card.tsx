import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  index = 0,
  priority = false,
  className,
  description,
}: {
  project: Project;
  index?: number;
  priority?: boolean;
  className?: string;
  /** Overrides the card blurb (e.g. a service-specific relation note). */
  description?: string;
}) {
  return (
    <Reveal as="li" delay={index * 80} className={cn("group", className)}>
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-stone">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <span className="eyebrow">{project.location}</span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {project.year}
          </span>
        </div>

        <h3 className="mt-3 text-xl leading-tight transition-colors group-hover:text-clay md:text-2xl">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description ?? project.summary}
        </p>
      </Link>
    </Reveal>
  );
}
