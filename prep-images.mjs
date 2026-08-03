/**
 * One-off asset prep. Converts the client's original photos into web-sized,
 * EXIF-stripped assets under public/images.
 * Safe to re-run. Requires the originals in the folder below.
 */
import convert from "heic-convert";
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";

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
