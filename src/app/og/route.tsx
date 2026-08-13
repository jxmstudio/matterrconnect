import { ImageResponse } from "next/og";

import { site } from "@/content/site";

/**
 * Per-page Open Graph card, rendered on demand.
 *
 * Replaces the old static app/opengraph-image.tsx, which only ever applied to
 * the homepage: every other page defines its own `openGraph` block through
 * buildMetadata(), which overrode the file-based convention and left 24 of 25
 * pages with no share image at all.
 *
 * Called as /og?title=...&eyebrow=... from buildMetadata(), so the card always
 * carries the actual page title.
 */
export const contentType = "image/png";

const CANVAS = "#0d1b2e";
const INK = "#eef2f8";
const MUTED = "#93a1ba";
const ACCENT = "#86abe0";
const RULE = "#26384f";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rawTitle = searchParams.get("title")?.slice(0, 110) || site.tagline;
  const eyebrow =
    searchParams.get("eyebrow")?.slice(0, 60) ||
    `${site.location.base} · ${site.location.region}`;

  // Long titles need to step down a size or they overflow the card.
  const titleSize = rawTitle.length > 68 ? 54 : rawTitle.length > 44 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CANVAS,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            MATTER
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.34em",
              color: MUTED,
              marginTop: 6,
            }}
          >
            CONSTRUCTION
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: INK,
              display: "flex",
            }}
          >
            {rawTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 28,
            fontSize: 22,
            color: MUTED,
          }}
        >
          <span>Licensed Building Practitioner</span>
          <span style={{ color: INK, fontWeight: 600 }}>
            {site.phone.display}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
