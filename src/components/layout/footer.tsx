import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { Wordmark } from "@/components/layout/wordmark";
import { SocialIcon } from "@/components/social-icons";
import { TrustBadges } from "@/components/trust-badges";
import { areas } from "@/content/areas";
import { site } from "@/content/site";
import { services } from "@/content/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark mt-auto border-t border-border bg-background text-foreground">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block text-xl">
              <Wordmark onDark />
              <span className="sr-only">{site.name} — home</span>
            </Link>

            <p className="measure mt-6 text-sm leading-relaxed text-muted-foreground">
              Licensed building practitioners based in {site.location.base},
              working across the wider {site.location.region}. Renovations,
              structural repairs, re-cladding and property maintenance.
            </p>

            <TrustBadges className="mt-8" />
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-clay"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="eyebrow">Get in touch</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={site.phone.href}
                  data-analytics="call"
                  data-analytics-location="footer"
                  className="inline-flex items-center gap-3 font-medium transition-colors hover:text-clay"
                >
                  <PhoneIcon className="size-4 text-clay" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-clay"
                >
                  <MailIcon className="size-4 text-clay" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPinIcon
                  className="mt-0.5 size-4 shrink-0 text-clay"
                  aria-hidden="true"
                />
                <span>{site.location.blurb}</span>
              </li>
            </ul>

            <ul className="mt-8 flex gap-3">
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${social.label}`}
                    className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <SocialIcon label={social.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <h2 className="eyebrow">Areas we serve</h2>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-clay"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved. Website by{" "}
            <a
              href="https://www.jxmstudio.com/"
              className="transition-colors hover:text-clay"
            >
              JXM Studio
            </a>
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-clay"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
