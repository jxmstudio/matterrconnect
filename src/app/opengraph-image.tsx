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
          background: "#0d1b2e",
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
              color: "#eef2f8",
            }}
          >
            MATTER
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.34em",
              color: "#93a1ba",
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
              color: "#eef2f8",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Renovations done</span>
            <span>
              <span style={{ color: "#86abe0" }}>properly</span>, by builders
            </span>
            <span>who turn up.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #26384f",
            paddingTop: 28,
            fontSize: 22,
            color: "#93a1ba",
          }}
        >
          <span>
            {site.location.base} · {site.location.region}
          </span>
          <span style={{ color: "#eef2f8", fontWeight: 600 }}>
            {site.phone.display}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
