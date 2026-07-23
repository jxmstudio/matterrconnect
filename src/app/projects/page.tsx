import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CallButton } from "@/components/call-button";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our work",
  description:
    "Completed renovation, repair and re-cladding projects by Matter Construction across Tauranga and the Bay of Plenty.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/projects" },
        ])}
      />

      <PageHeader
        eyebrow="Our work"
        title="Recent jobs, start to finish."
        intro={`A look at what we've been building around ${site.location.base}. We photograph the parts most builders don't — what's behind the wall before we put it back together.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/projects" },
        ]}
      />

      <section>
        <div className="container-editorial py-16 md:py-24">
          {projects.length > 0 ? (
            <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                  priority={i === 0}
                />
              ))}
            </ul>
          ) : (
            /* Empty state — real, not a placeholder grid of stock photos. */
            <Reveal className="measure">
              <p className="text-lg leading-relaxed text-muted-foreground">
                We&apos;re photographing our recent jobs and this page will fill
                up shortly. In the meantime, we&apos;re happy to walk you
                through what we&apos;ve done and put you in touch with clients
                we&apos;ve built for.
              </p>
              <CallButton
                className="mt-8"
                size="lg"
                location="projects-empty"
              />
            </Reveal>
          )}

          {projects.length > 0 && projects.length < 3 && (
            <Reveal className="measure mt-16 border-t border-border pt-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                More projects are being photographed and added as we finish
                them. If you&apos;d like to see something specific — a
                renovation, a re-clad, a repair like yours — give us a call and
                we&apos;ll talk you through it.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand
        heading="Yours could be next."
        body="Tell us what you're planning and we'll come and take a look."
        location="projects-footer"
      />
    </>
  );
}
