import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { Wordmark } from "@/components/layout/wordmark";
import { TrustBadges } from "@/components/trust-badges";
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

            <ul className="mt-8 flex gap-6">
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-clay hover:underline"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
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
