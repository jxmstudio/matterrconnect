"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/layout/wordmark";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAt, setOpenAt] = useState(pathname);

  // Close the mobile sheet whenever the route changes — including on browser
  // back/forward. Adjusting state during render (rather than in an effect)
  // avoids a second render pass with the sheet still open.
  if (openAt !== pathname) {
    setOpenAt(pathname);
    setOpen(false);
  }

  // The header sits transparent over the hero and gains a surface once the
  // user scrolls past it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-editorial flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="rounded-sm text-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:text-xl"
        >
          <Wordmark />
          <span className="sr-only">{site.name} — home</span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-8 lg:flex"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative py-1 text-sm transition-colors hover:text-foreground",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-clay after:transition-all after:duration-300",
                isActive(item.href)
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground after:w-0 hover:after:w-full",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            data-analytics="call"
            data-analytics-location="header"
            className="hidden items-center gap-2 rounded-sm px-2 py-1 text-sm font-medium tracking-tight transition-colors hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:inline-flex"
          >
            <PhoneIcon className="size-4" aria-hidden="true" />
            {site.phone.display}
          </a>

          <Button asChild size="lg" className="hidden sm:inline-flex">
            <Link
              href="/contact"
              data-analytics="quote"
              data-analytics-location="header"
            >
              Request a quote
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                // The preset's icon-lg is 36px; this is the primary navigation
                // affordance on a phone, so give it a full 44px target.
                className="size-11 lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              // Radix warns when a Dialog has no description; this menu needs
              // no prose, so opt out explicitly rather than adding filler.
              aria-describedby={undefined}
              className="data-[side=right]:w-full sm:max-w-sm"
            >
              <SheetHeader className="border-b border-border">
                <SheetTitle className="text-left text-lg">
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col px-4 py-2">
                {site.nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "font-heading border-b border-border/60 py-4 text-2xl tracking-tight transition-colors",
                        isActive(item.href)
                          ? "text-clay"
                          : "text-foreground hover:text-clay",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
                <Button asChild size="xl">
                  <a
                    href={site.phone.href}
                    data-analytics="call"
                    data-analytics-location="mobile-menu"
                  >
                    <PhoneIcon aria-hidden="true" />
                    {site.phone.display}
                  </a>
                </Button>
                <SheetClose asChild>
                  <Button asChild variant="outline" size="xl">
                    <Link
                      href="/contact"
                      data-analytics="quote"
                      data-analytics-location="mobile-menu"
                    >
                      Request a quote
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
