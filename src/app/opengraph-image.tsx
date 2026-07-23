import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — builders in ${site.location.base} and the ${site.location.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Typographic share card.
 *
 * Deliberately type-only: we have no logo file and only two project photos,
 * and a share card built from the brand wordmark reads better than a cropped
 * bathroom shot. Regenerated at build time, no asset to maintain.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f7",
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
              color: "#1a1917",
            }}
          >
            MATTER
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.34em",
              color: "#6b6862",
              marginTop: 6,
            }}
          >
            CONSTRUCTION
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "#1a1917",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Renovations done</span>
            <span>
              <span style={{ color: "#b4541e" }}>properly</span>, by builders
            </span>
            <span>who turn up.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #e3dfd8",
            paddingTop: 28,
            fontSize: 22,
            color: "#6b6862",
          }}
        >
          <span>
            {site.location.base} · {site.location.region}
          </span>
          <span style={{ color: "#1a1917", fontWeight: 600 }}>
            {site.phone.display}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
