import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/**
 * Shared masthead for every inner page. Keeps the vertical rhythm and the
 * heading scale identical across the site, which is most of what makes an
 * editorial layout feel considered.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("border-b border-border", className)}>
      <div className="container-editorial pt-12 pb-16 md:pt-16 md:pb-24">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              {crumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRightIcon
                      className="size-3 opacity-50"
                      aria-hidden="true"
                    />
                  )}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-foreground">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="transition-colors hover:text-clay"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.03] md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {intro && (
            <p className="measure mt-8 text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
