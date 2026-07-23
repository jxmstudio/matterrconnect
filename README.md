# Matter Construction — matterconnect.net

Marketing site for Matter Construction, a licensed building company in Tauranga.
Built by JXM Studios.

The site has two jobs: **generate qualified local enquiries**, and **show the
standard of the work**. Every layout decision serves one of those. Success is
measured in phone calls and quote requests, not page views.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui · Resend

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

No environment variables are needed to run locally. The quote form works out of
the box — without a Resend key it logs enquiries to the server console instead
of emailing them, so nothing fails silently.

Other commands:

```bash
npm run build
```

```bash
npx tsc --noEmit
```

```bash
npm run lint
```

---

## Environment variables

Copy `.env.example` to `.env.local`. All are optional in development.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonicals, OG tags, sitemap, JSON-LD |
| `RESEND_API_KEY` | Enables real enquiry email. Unset → enquiries logged to console |
| `ENQUIRY_TO` | Where quote requests land (default `info@matterconnect.net`) |
| `ENQUIRY_FROM` | From address — must be on a Resend-verified domain |
| `NEXT_PUBLIC_GA_ID` | GA4 ID. Unset → no analytics script loads at all |

---

## Editing content

**All copy and business details live in `src/content/`. Nothing is hardcoded in
components.** These are plain TypeScript files — edit, save, done.

| File | Holds |
| --- | --- |
| `site.ts` | Name, phone, email, socials, service area, nav. **Change the phone number here and it changes everywhere.** |
| `services.ts` | The five services — copy, detail-page body, "what's included" |
| `projects.ts` | Portfolio entries |
| `testimonials.ts` | Client reviews — **currently empty on purpose**, see below |
| `qualifications.ts` | LBP / Site Safe / first aid, plus the homepage commitments |

### Adding a project

1. Put the photos through the resizer (1400px wide, quality 82, EXIF stripped):

   ```bash
   node prep-images.mjs
   ```

   Or resize them yourself into `public/images/projects/`. **Strip EXIF** —
   phone photos carry GPS coordinates of the client's house.

2. Add an entry to the `projects` array in `src/content/projects.ts`.

3. That's it. The grid, the detail page, the homepage feature, the related-work
   block on the matching service page and the sitemap all update themselves.

Before/after pairs are the strongest thing on the site — include them whenever
we have both shots.

---

## Deliberate decisions worth knowing before you change them

**Testimonials ship empty.** Jack said he has good Google reviews; JXM's
pre-proposal research could not verify a Google Business Profile. Rather than
invent quotes, `src/content/testimonials.ts` is empty and every testimonial
surface degrades to an honest "ask us for a reference" prompt. The
`/testimonials` page is `noindex` and excluded from the sitemap until it has
content — both flip automatically when the array is populated.

**No logo file exists.** The brand mark is typeset in
`src/components/layout/wordmark.tsx`. When the real logo arrives, replace the
contents of that one component with an `<Image>` — every usage goes through it.

**Certification badges are text, not logos.** LBP, Site Safe and St John marks
are third-party trademarks and we don't have the official files. We did not
approximate them. `src/components/trust-badges.tsx` renders text badges; set
`logo` on the relevant entry in `qualifications.ts` and swap in an `<Image>`
once real assets are supplied.

**Only two project photos exist**, and they're a genuine before/after pair of
the same bathroom. The gallery is built to look correct with one project and to
scale to a dozen without layout changes. No stock imagery was used.

**`button.tsx` and `badge.tsx` carry `"use client"`.** shadcn ships them
without it, but Radix's `Slot` creates a React context at module scope, which
isn't available under the react-server condition. Removing the directive breaks
the build.

**Dark mode is not implemented.** Local trades sites don't need it and it
doubles QA. The tokens in `globals.css` are structured so it can be added later.

---

## Design system

Tokens live at the top of `src/app/globals.css` as Tailwind v4 `@theme`
variables, so shadcn components inherit them automatically.

- **Canvas** `#FAF9F7` · **Ink** `#1A1917` · **Muted** `#6B6862`
- **Clay** `#B4541E` — the only accent. Used for CTAs, active nav and rules and
  nothing else; its scarcity is what makes it read as premium. Measures 4.97:1
  on white, so it passes AA as text.
- **Type:** Archivo (display) + Inter (body), self-hosted via `next/font`. No
  external font requests, no layout shift.
- Utility classes `.container-editorial`, `.measure` and `.eyebrow` keep page
  gutters, prose width and section labels consistent.

---

## Lead capture

`src/lib/actions/send-enquiry.ts` is a server action that validates with Zod,
rate-limits by IP, and sends via Resend.

- Client validation is UX only — everything is re-validated server-side.
- A honeypot field catches bots; they get a success response and nothing sends.
- On a validation failure the server echoes back what the user typed, because
  React 19 resets a form after its action resolves and losing a typed message
  loses the enquiry.
- Rate limiting is in-memory (5 per IP per 10 min). It resets on deploy and
  isn't shared across serverless instances — fine for an enquiry form.

Call and quote CTAs carry `data-analytics` attributes; a single delegated
listener in `src/components/analytics.tsx` reports them to GA4 as
`click_to_call` and `quote_intent` with a `placement` parameter, which is what
the care plan's monthly reporting reads.

---

## Still outstanding from the client

Content gaps, not code gaps. The site works without them, but the first two
materially affect how good it looks.

- [ ] **Finished-renovation photos** — promised at onboarding, still to come.
      The single biggest quality lever on the site.
- [ ] **Logo source file** (vector or high-res PNG).
- [ ] **2–3 testimonials**, or the Google Business Profile URL.
- [ ] **Business hours**, if they should be shown (currently omitted rather than
      guessed).
- [ ] **Official certification marks** — request from the LBP register, Site
      Safe NZ and St John. Do not recreate them.

## Launch checklist (account tasks, not code)

- [ ] Create the **Google Business Profile** — name, phone and service area must
      match `src/content/site.ts` exactly, or the JSON-LD and the map listing
      will disagree.
- [ ] Create the **GA4 property**, set `NEXT_PUBLIC_GA_ID`.
- [ ] Verify **matterconnect.net in Resend**, then set `ENQUIRY_FROM` to a real
      address on that domain.
- [ ] Submit the sitemap in **Google Search Console**.
- [ ] Send a live test enquiry and confirm it reaches `info@matterconnect.net`.

## Deploying

Built for Vercel. Import the repo, set the environment variables above, and
point `matterconnect.net` at it. No deploy has been run from this repo.

> `npm audit` reports advisories in `postcss` and `sharp`, both transitive
> dependencies of Next.js itself. `npm audit fix --force` "resolves" them by
> downgrading to Next 9 — don't. They clear when Next ships an updated release.
