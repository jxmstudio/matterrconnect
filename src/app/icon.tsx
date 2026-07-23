import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the "M" mark on clay. Generated, so there's no asset to lose. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#b4541e",
          color: "#fffdfb",
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
        }}
      >
        M
      </div>
    ),
    size,
  );
}
