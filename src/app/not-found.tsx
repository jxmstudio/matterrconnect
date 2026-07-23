import Link from "next/link";

import { CallButton } from "@/components/call-button";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <section>
      <div className="container-editorial flex min-h-[60vh] flex-col justify-center py-24">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] md:text-6xl">
          That page isn&apos;t here.
        </h1>
        <p className="measure mt-8 text-lg leading-relaxed text-muted-foreground">
          It may have moved, or the link might be wrong. If you were after
          something specific, give us a call and we&apos;ll point you at it.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CallButton size="xl" location="404" />
          <Button asChild variant="outline" size="xl">
            <Link href="/">Back to home</Link>
          </Button>
        </div>

        <nav aria-label="Site" className="mt-14 border-t border-border pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-clay hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
