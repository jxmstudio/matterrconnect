import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/content/services";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Reveal
      as="li"
      delay={index * 70}
      className="group border-t border-border"
    >
      <Link
        href={`/services/${service.slug}`}
        className="flex h-full flex-col gap-5 py-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:py-10"
      >
        <div className="flex items-start justify-between gap-6">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <ArrowUpRightIcon
            className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay"
            aria-hidden="true"
          />
        </div>

        <h3 className="text-2xl leading-tight transition-colors group-hover:text-clay md:text-[1.75rem]">
          {service.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.summary}
        </p>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid({
  services,
  className,
}: {
  services: Service[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-12 md:grid-cols-2 lg:grid-cols-3", className)}>
      {services.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}
    </ul>
  );
}
