/**
 * One-off asset prep. Converts the client's original photos into web-sized,
 * EXIF-stripped JPEGs in public/images/projects.
 * Safe to re-run. Requires the originals in the Downloads folder.
 */
import convert from "heic-convert";
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";

const SRC = "C:/Users/alexn/Downloads/regreatchattingtodayjackyourwebsiteproposalattac(1)";
const OUT = "public/images/projects";

await mkdir(OUT, { recursive: true });

async function write(buf, name) {
  // sharp drops EXIF (incl. GPS) unless withMetadata() is called — leave it off.
  await sharp(buf)
    .rotate()
    .resize({ width: 1400, height: 1867, fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${name}`);
  console.log("wrote", name);
}

// Before: mould behind stripped wall lining
await write(await readFile(`${SRC}/3d3113bd0ae3035d2aa0a888d6935efe.JPEG`), "bathroom-rebuild-before.jpg");

// After: completed bathroom (originally HEIC)
const heic = await readFile(`${SRC}/IMG_0005.HEIC`);
await write(Buffer.from(await convert({ buffer: heic, format: "JPEG", quality: 1 })), "bathroom-rebuild-after.jpg");
