import { cn } from "@/lib/utils";
import type { Testimonial } from "@/content/testimonials";

/**
 * Google review presentation: the multicolour "G", star row, letter avatar and
 * the review card itself. Used by both the homepage carousel and the
 * testimonials page so the two never drift apart.
 *
 * AVATARS: Google shows a reviewer's profile picture when they have one. Those
 * photos are personal images of private individuals hosted on Google's CDN, so
 * we don't copy or hotlink them. We render Google's own fallback instead — a
 * coloured circle with the initial — which is what their profile already shows
 * for reviewers without a picture.
 */

/** The Google "G". Inline so it needs no network request and no asset file. */
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("size-5", className)}
      role="img"
      aria-label="Google"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/** Google's review stars. */
export function Stars({
  rating = 5,
  className,
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            fill={i < Math.round(rating) ? "#FBBC04" : "currentColor"}
            fillOpacity={i < Math.round(rating) ? 1 : 0.2}
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </span>
  );
}

/** Google's letter-avatar palette. */
const AVATAR_COLOURS = [
  "#DB4437",
  "#E8710A",
  "#F4B400",
  "#0F9D58",
  "#4285F4",
  "#AB47BC",
  "#00ACC1",
  "#5C6BC0",
];

function Avatar({ name }: { name: string }) {
  // Deterministic so a reviewer keeps the same colour between renders.
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const background = AVATAR_COLOURS[hash % AVATAR_COLOURS.length];

  return (
    <span
      aria-hidden="true"
      style={{ background }}
      className="grid size-10 shrink-0 place-items-center rounded-full text-base font-medium text-white"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * "7 months ago", computed from the approximate month stored in the content so
 * it never goes stale the way a hardcoded string would.
 */
function relativeDate(date: string): string | null {
  const posted = new Date(`${date}-01T00:00:00Z`);
  if (Number.isNaN(posted.getTime())) return null;

  const now = new Date();
  const months =
    (now.getUTCFullYear() - posted.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - posted.getUTCMonth());

  if (months < 1) return "this month";
  if (months === 1) return "a month ago";
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);
  return years === 1 ? "a year ago" : `${years} years ago`;
}

/** A single review, laid out the way Google lays one out. */
export function GoogleReviewCard({
  item,
  className,
}: {
  item: Testimonial;
  className?: string;
}) {
  const posted = item.date ? relativeDate(item.date) : null;

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-lg border border-border bg-card p-6 md:p-8",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar name={item.author} />
        <div className="min-w-0 flex-1">
          <figcaption className="truncate font-medium">{item.author}</figcaption>
          {item.authorReviewCount ? (
            <p className="text-xs text-muted-foreground">
              {item.authorReviewCount} reviews
            </p>
          ) : null}
        </div>
        {item.source === "google" && <GoogleG className="size-5 shrink-0" />}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Stars rating={item.rating ?? 5} className="text-foreground" />
        {posted && (
          <span className="text-xs text-muted-foreground">{posted}</span>
        )}
      </div>

      <blockquote className="mt-4 leading-relaxed text-pretty text-muted-foreground">
        {item.quote}
      </blockquote>

      {(item.project || item.location) && (
        <p className="mt-4 text-xs text-muted-foreground">
          {[item.project, item.location].filter(Boolean).join(" · ")}
        </p>
      )}

      {item.ownerResponse && (
        <div className="mt-5 border-l-2 border-border pl-4">
          <p className="text-xs font-medium">Response from the owner</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {item.ownerResponse}
          </p>
        </div>
      )}
    </figure>
  );
}

/** The rating summary strip — "5.0 ★★★★★ from 8 Google reviews". */
export function GoogleRatingSummary({
  value,
  count,
  href,
  className,
}: {
  value: number;
  count: number;
  href?: string | null;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      <GoogleG className="size-6" />
      <span className="text-lg font-medium tabular-nums">
        {value.toFixed(1)}
      </span>
      <Stars rating={value} className="text-foreground" />
      <span className="text-sm text-muted-foreground">
        from {count} Google reviews
      </span>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-clay underline-offset-4 hover:underline"
        >
          Read them on Google →
        </a>
      )}
    </div>
  );
}
