import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon } from "lucide-react";

import { CallButton, QuoteButton } from "@/components/call-button";
import { Reveal } from "@/components/reveal";
import { TrustBadges } from "@/components/trust-badges";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { ProjectCard } from "@/components/sections/project-card";
import { ServiceArea } from "@/components/sections/service-area";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { services } from "@/content/services";
import { featuredProjects, projects } from "@/content/projects";
import { commitments } from "@/content/qualifications";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Builders in Tauranga & Bay of Plenty`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const heroProjects =
    featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 1);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero — renovation-led, per the client's stated ideal job.           */}
      {/* Asymmetric: statement type left, real project photo right.          */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative -mt-20 pt-20">
        <div className="container-editorial grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">
                {site.location.base} · {site.location.region}
              </p>

              {/* Line breaks are forced only from `sm` up, where the measure
                  is wide enough to hold them. On a phone the text wraps
                  naturally instead of breaking mid-phrase. */}
              <h1 className="mt-6 text-[2.6rem] leading-[1.04] text-balance sm:text-6xl sm:text-left lg:text-[4.75rem]">
                Renovations done
                <br className="hidden sm:inline" />{" "}
                <span className="text-clay">properly</span>, by builders
                <br className="hidden sm:inline" /> who turn up.
              </h1>

              <p className="measure mt-8 text-lg leading-relaxed text-muted-foreground">
                Matter Construction is a licensed building company working
                across {site.location.blurb}. Renovations, structural repairs
                and weathertightness work — priced honestly, programmed
                realistically, and finished to a standard we&apos;d accept in
                our own home.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <CallButton size="xl" location="hero" />
                <QuoteButton size="xl" location="hero" />
              </div>

              <TrustBadges className="mt-12" />
            </Reveal>
          </div>

          {heroProjects.length > 0 && (
            <Reveal delay={120} className="lg:col-span-5">
              <HeroCarousel projects={heroProjects} />
            </Reveal>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Commitments — the "why us" that actually changes a hiring decision  */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border bg-stone/50">
        <div className="container-editorial py-20 md:py-28">
          <ul className="grid gap-x-12 gap-y-12 md:grid-cols-3">
            {commitments.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 90}>
                <h2 className="text-2xl leading-tight">{item.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Services                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="mt-5 max-w-2xl text-4xl leading-[1.05] md:text-5xl">
                Five things, done well
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-clay"
            >
              All services
              <ArrowRightIcon
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <ServicesGrid services={services} className="mt-14" />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Our work                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border bg-stone/50">
        <div className="container-editorial py-20 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Our work</p>
              <h2 className="mt-5 max-w-2xl text-4xl leading-[1.05] md:text-5xl">
                What it looks like when it&apos;s done right
              </h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-clay"
            >
              All projects
              <ArrowRightIcon
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Story teaser                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Who you&apos;re dealing with</p>
            </div>
            <Reveal className="md:col-span-8">
              <p className="text-2xl leading-[1.35] text-pretty md:text-[1.75rem]">
                Jack and Anna started Matter Construction to serve clients the
                way they always thought it should be done — properly, honestly,
                and without the runaround.
              </p>
              <p className="measure mt-8 text-base leading-relaxed text-muted-foreground">
                Jack grew up in Whakatāne and came into construction after
                university didn&apos;t stick. Since then he&apos;s worked on
                everything from fences to multi-million-dollar homes, and
                he&apos;s the first to credit the employers and workmates who
                taught him along the way.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-clay"
              >
                Read the full story
                <ArrowRightIcon
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Testimonials                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border bg-stone/50">
        <div className="container-editorial py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">What clients say</p>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[1.05] md:text-5xl">
              Ask the people we&apos;ve built for
            </h2>
          </Reveal>
          <TestimonialsSection className="mt-14" limit={2} />
        </div>
      </section>

      <ServiceArea />

      <CtaBand location="home-footer" />
    </>
  );
}
