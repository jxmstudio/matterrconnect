/**
 * One-off asset prep. Converts the client's original photos into web-sized,
 * EXIF-stripped assets under public/images.
 * Safe to re-run. Requires the originals in the folder below.
 */
import convert from "heic-convert";
import sharp from "sharp";
import { readFile, mkdir, writeFile } from "node:fs/promises";

const SRC = "C:/Users/alexn/Desktop/matter-cnnetc-photos";
// Second batch, supplied later with the website-proposal thread.
const SRC2 = "C:/Users/alexn/Downloads/regreatchattingtodayjackyourwebsiteproposalattac";

await mkdir("public/images/projects", { recursive: true });
await mkdir("public/images/team", { recursive: true });
await mkdir("public/images/brand", { recursive: true });

/** Read a source photo as a JPEG buffer, converting from HEIC when needed. */
async function load(name, dir = SRC) {
  const buf = await readFile(`${dir}/${name}`);
  if (/\.heic$/i.test(name)) {
    return Buffer.from(await convert({ buffer: buf, format: "JPEG", quality: 1 }));
  }
  return buf;
}

/** Portrait 3:4 project cover / hero. sharp drops EXIF (incl. GPS) by default. */
async function cover(buf, out, { extractTopFraction = 0 } = {}) {
  let img = sharp(buf).rotate();
  if (extractTopFraction > 0) {
    const meta = await img.metadata();
    const top = Math.round(meta.height * extractTopFraction);
    img = sharp(await img.toBuffer())
      .extract({ left: 0, top, width: meta.width, height: meta.height - top });
  }
  await img
    .resize({ width: 1400, height: 1867, fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`public/${out}`);
  console.log("wrote", out);
}

// --- Existing bathroom project -------------------------------------------
await cover(await load("3d3113bd0ae3035d2aa0a888d6935efe.JPEG"), "images/projects/bathroom-rebuild-before.jpg");
await cover(await load("IMG_0005.HEIC"), "images/projects/bathroom-rebuild-after.jpg");

// --- New: timber entrance deck -------------------------------------------
// The original carries a "1/4" gallery badge in the top-right corner; crop the
// top ~14% off before the cover-resize so it doesn't land on the portfolio.
await cover(await load("IMG_0719.jpg"), "images/projects/timber-entrance-deck.jpg", {
  extractTopFraction: 0.14,
});

// --- New: garden studio fit-out (originally HEIC) ------------------------
await cover(await load("IMG_0205.HEIC"), "images/projects/garden-studio-fitout.jpg");

// --- New: bathroom fitted into a pole shed (second batch) ----------------
await cover(await load("IMG_0212.HEIC", SRC2), "images/projects/pole-shed-bathroom.jpg");
await cover(await load("IMG_0216.HEIC", SRC2), "images/projects/pole-shed-bathroom-shower.jpg");
await cover(await load("IMG_0215.HEIC", SRC2), "images/projects/pole-shed-bathroom-vanity.jpg");

// --- New: door/window reworked to open up the sea view (before / after) ---
const DL = "C:/Users/alexn/Downloads";
await cover(await load("IMG_0866.HEIC", DL), "images/projects/door-window-before.jpg");
await cover(await load("IMG_0220.HEIC", DL), "images/projects/door-window-after.jpg");

// --- Founder portrait for the About page ---------------------------------
await sharp(await load("untitled-2333.JPEG"))
  .rotate()
  .resize({ width: 1200, height: 1500, fit: "cover", position: "top" })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("public/images/team/jack.jpg");
console.log("wrote images/team/jack.jpg");

// --- Brand logo: key the solid background out to transparent -------------
// The supplied lockups sit on a solid background. The site is light-only, so a
// navy logo on transparent reads cleanly on every (light) surface it lands on.
async function keyOutBackground(name, out, { toTransparent }) {
  const trimmed = await sharp(await load(name))
    .trim({ threshold: 12 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = trimmed;
  const [tr, tg, tb] = toTransparent; // background colour to remove
  for (let i = 0; i < data.length; i += info.channels) {
    if (
      Math.abs(data[i] - tr) < 22 &&
      Math.abs(data[i + 1] - tg) < 22 &&
      Math.abs(data[i + 2] - tb) < 22
    ) {
      data[i + 3] = 0;
    }
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toFile(`public/${out}`);
  console.log("wrote", out);
}

// Navy lockup on white -> navy on transparent (primary, used in the chrome).
await keyOutBackground("IMG_0171.PNG", "images/brand/logo.png", { toTransparent: [255, 255, 255] });
// White lockup on navy -> white on transparent (reversed, kept for dark use).
await keyOutBackground("IMG_0170.PNG", "images/brand/logo-reversed.png", { toTransparent: [30, 40, 74] });

// --- Favicons, cut from the real logo mark ------------------------------
//
// Google shows this next to the search result, and falls back to a generic
// globe when it can't use what it finds. Its guidance is a square that's a
// multiple of 48px, so these are 48/180/192 rather than an arbitrary size.
// The "M" is knocked out of the navy shape, so flattening onto white is what
// makes it read; flattening onto navy would render it invisible.
//
// The mark occupies x 0-144, y 3-147 of the trimmed lockup (measured from the
// alpha channel — re-measure if the logo asset is ever replaced).
const MARK = { left: 0, top: 3, width: 145, height: 145 };

async function faviconPng(px) {
  // The M's legs run to the very bottom of the mark by design, which reads as
  // clipped once it's 48px in a search result. Inset it and pad with white so
  // the whole letterform sits inside the square.
  const inner = Math.round(px * 0.82);
  const pad = Math.round((px - inner) / 2);

  const mark = await sharp("public/images/brand/logo.png")
    .extract(MARK)
    .flatten({ background: "#ffffff" })
    .resize(inner, inner)
    .toBuffer();

  return sharp(mark)
    .extend({
      top: pad,
      bottom: px - inner - pad,
      left: pad,
      right: px - inner - pad,
      background: "#ffffff",
    })
    // Flattening onto white drops the alpha channel, but an ICO payload has to
    // be RGBA — without this the build fails decoding favicon.ico.
    .ensureAlpha()
    .png()
    .toBuffer();
}

await sharp(await faviconPng(192)).toFile("src/app/icon.png");
console.log("wrote src/app/icon.png (192x192)");

await sharp(await faviconPng(180)).toFile("src/app/apple-icon.png");
console.log("wrote src/app/apple-icon.png (180x180)");

/**
 * Wrap a PNG in an ICO container. Modern .ico files may hold PNG data
 * directly, so this is a 22-byte header rather than a bitmap re-encode —
 * cheaper than pulling in an ICO dependency for one file.
 */
function pngToIco(png, px) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(px, 0); // width
  entry.writeUInt8(px, 1); // height
  entry.writeUInt8(0, 2); // palette colours (0 = none)
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // payload size
  entry.writeUInt32LE(header.length + entry.length, 12); // payload offset

  return Buffer.concat([header, entry, png]);
}

await writeFile("src/app/favicon.ico", pngToIco(await faviconPng(48), 48));
console.log("wrote src/app/favicon.ico (48x48)");
