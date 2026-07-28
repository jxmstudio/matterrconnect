import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon } from "lucide-react";

import { BeforeAfter } from "@/components/before-after";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project)
    return buildMetadata({ title: "Not found", description: "", index: false });

  // Location is deliberately left out of the title — the site-name template
  // already appends 20 characters and SERPs truncate around 60.
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const service = getService(project.serviceSlug);
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={`${project.location} · ${project.year}`}
        title={project.title}
        intro={project.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      >
        {service && (
          <Link
            href={`/services/${service.slug}`}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-clay"
          >
            {service.title}
            <ArrowRightIcon
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        )}
      </PageHeader>

      {/* Before / after. The whole point of the gallery — it shows the work
          nobody sees once the linings go back on. Drag the handle to compare. */}
      {project.before && project.after && (
        <section className="border-b border-border">
          <div className="container-editorial py-16 md:py-24">
            <Reveal className="mx-auto max-w-xl">
              <BeforeAfter before={project.before} after={project.after} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="border-b border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">The job</p>
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="mt-1 font-medium">{project.location}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Completed</dt>
                  <dd className="mt-1 font-medium">{project.year}</dd>
                </div>
                {service && (
                  <div>
                    <dt className="text-muted-foreground">Service</dt>
                    <dd className="mt-1 font-medium">{service.title}</dd>
                  </div>
                )}
              </dl>
            </div>

            <Reveal className="md:col-span-8">
              <div className="measure space-y-6 text-base leading-relaxed text-muted-foreground">
                {project.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "text-lg text-foreground" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="border-b border-border">
          <div className="container-editorial py-16 md:py-24">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {image.caption && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {image.caption}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="border-b border-border bg-stone/50">
          <div className="container-editorial py-20 md:py-28">
            <p className="eyebrow">More work</p>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((other, i) => (
                <ProjectCard key={other.slug} project={other} index={i} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        heading="Something similar on your place?"
        body={`We work on jobs like this across ${site.location.blurb}. Give us a call and we'll come and take a look.`}
        location={`project-${project.slug}`}
      />
    </>
  );
}
