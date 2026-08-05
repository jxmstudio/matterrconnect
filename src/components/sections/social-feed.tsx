import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";
import { instagramHandle, instagramPosts } from "@/content/social";
import { site } from "@/content/site";

const dateFormat = new Intl.DateTimeFormat("en-NZ", {
  day: "numeric",
  month: "short",
});

/**
 * Recent work as posted to Instagram. Each tile links out to the real post, so
 * the section doubles as a nudge to follow the account.
 */
export function SocialFeed() {
  if (instagramPosts.length === 0) return null;

  const instagram = site.socials.find((s) => s.label === "Instagram");
  const facebook = site.socials.find((s) => s.label === "Facebook");

  return (
    <section className="border-t border-border">
      <div className="container-editorial py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">From the site</p>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[1.05] md:text-5xl">
              What we&apos;ve been working on
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {instagram && (
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-clay hover:text-clay"
              >
                <InstagramIcon className="size-4" />
                {instagramHandle}
              </a>
            )}
            {facebook && (
              <a
                href={facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Matter Construction on Facebook"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-clay hover:text-clay"
              >
                <FacebookIcon className="size-4" />
                <span className="sr-only">Facebook</span>
              </a>
            )}
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instagramPosts.map((post, i) => (
            <Reveal as="li" key={post.href} delay={i * 80} className="group">
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <div className="relative aspect-square overflow-hidden bg-stone">
                  <Image
                    src={post.src}
                    alt={post.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-ink/70 text-[color:var(--canvas)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-4 flex items-baseline justify-between gap-4 text-sm">
                  <span className="transition-colors group-hover:text-clay">
                    {post.caption}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                    {dateFormat.format(new Date(post.date))}
                  </span>
                </p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
