import type { Metadata } from "next";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { TrustBadges } from "@/components/trust-badges";
import { PageHeader } from "@/components/sections/page-header";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request a quote",
  description: `Get a free, no-obligation quote from Matter Construction. Call ${site.phone.display} or send through the details of your job.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHeader
        eyebrow="Get in touch"
        title="Request a quote."
        intro="Free and no obligation. Tell us what you're planning and we'll come and take a look — or just call, if that's easier."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section>
        <div className="container-editorial py-16 md:py-24">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            {/* Contact details first on mobile — a lot of visitors just want
                the number, and shouldn't have to scroll past a form to get it. */}
            <Reveal className="md:order-2 md:col-span-5">
              <div className="border-t border-border pt-8">
                <h2 className="eyebrow">Direct</h2>

                <ul className="mt-8 space-y-7">
                  <li>
                    <a
                      href={site.phone.href}
                      data-analytics="call"
                      data-analytics-location="contact-page"
                      className="group flex items-start gap-4"
                    >
                      <PhoneIcon
                        className="mt-1 size-5 shrink-0 text-clay"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-sm text-muted-foreground">
                          Phone
                        </span>
                        <span className="mt-1 block text-xl font-medium tracking-tight transition-colors group-hover:text-clay">
                          {site.phone.display}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-start gap-4"
                    >
                      <MailIcon
                        className="mt-1 size-5 shrink-0 text-clay"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-sm text-muted-foreground">
                          Email
                        </span>
                        <span className="mt-1 block text-base font-medium transition-colors group-hover:text-clay">
                          {site.email}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li className="flex items-start gap-4">
                    <MapPinIcon
                      className="mt-1 size-5 shrink-0 text-clay"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-sm text-muted-foreground">
                        Service area
                      </span>
                      <span className="mt-1 block text-base font-medium">
                        {site.location.blurb}
                      </span>
                    </span>
                  </li>
                </ul>

                <ul className="mt-10 flex gap-6 border-t border-border pt-8">
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

                <TrustBadges variant="stack" className="mt-10" />
              </div>
            </Reveal>

            <div className="md:order-1 md:col-span-7">
              <div className="border-t border-border pt-8">
                <h2 className="eyebrow">Send us the details</h2>
                <QuoteForm className="mt-8" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
