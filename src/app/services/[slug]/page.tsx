import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckIcon } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { CallButton } from "@/components/call-button";
import { getService, services } from "@/content/services";
import { projectsForService } from "@/content/projects";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

// All five services are known at build time — prerender them.
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return buildMetadata({ title: "Not found", description: "", index: false });

  return buildMetadata({
    title: `${service.title} — ${site.location.base}`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const related = projectsForService(service.slug);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.title,
          provider: { "@id": `${site.url}/#business` },
          areaServed: site.location.areasServed.map((name) => ({
            "@type": "City",
            name,
          })),
          url: `${site.url}/services/${service.slug}`,
        }}
      />

      <PageHeader
        eyebrow="Service"
        title={service.title}
        intro={service.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      >
        <CallButton className="mt-10" size="xl" location={`service-${service.slug}`} />
      </PageHeader>

      <section className="border-b border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="measure space-y-6 text-base leading-relaxed text-muted-foreground">
                {service.body.map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "text-lg text-foreground" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="md:col-span-5">
              <div className="border-t border-border pt-8">
                <h2 className="eyebrow">What&apos;s included</h2>
                <ul className="mt-6 space-y-4">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed">
                      <CheckIcon
                        className="mt-0.5 size-4 shrink-0 text-clay"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-b border-border bg-stone/50">
          <div className="container-editorial py-20 md:py-28">
            <Reveal>
              <p className="eyebrow">Related work</p>
              <h2 className="mt-5 text-3xl leading-tight md:text-4xl">
                {related.length === 1
                  ? "A job like this one"
                  : "Jobs like this one"}
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                  description={project.relation}
                />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Quote form inline — the visitor is already reading about this exact
          service, so don't make them navigate to convert. */}
      <section className="border-b border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Get a quote</p>
              <h2 className="mt-5 text-3xl leading-tight md:text-4xl">
                Tell us about the job
              </h2>
              {/* The service is already the page context and comes
                  preselected in the form, so don't restate it awkwardly here.
                  The phone number lives under the form, not twice on one
                  screen. */}
              <p className="measure mt-6 text-sm leading-relaxed text-muted-foreground">
                Send through a few details and we&apos;ll get back to you.
                We&apos;ll come and look before quoting anything beyond a small
                repair — it&apos;s the only way to price it accurately.
              </p>
            </div>

            <div className="md:col-span-7">
              <QuoteForm defaultService={service.title} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-editorial py-16 md:py-20">
          <p className="eyebrow">Other services</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-clay hover:underline"
                >
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
