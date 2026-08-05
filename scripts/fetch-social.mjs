/**
 * One-off: pull the current Instagram grid images into public/images/social.
 *
 * Instagram's scontent CDN URLs are signed and expire within hours, so they
 * can't be hotlinked — the images have to be copied down and served locally.
 * That makes this a snapshot: re-run it with fresh URLs when the grid changes.
 *
 * Content belongs to Matter Construction (their own posts, their own site).
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const posts = [
  {
    out: "instagram-1.jpg",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/762107599_17962583931148714_756970024206926883_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=u9EMGcgSvUUQ7kNvwGHyQMZ&_nc_oc=Ado7BLPwp0yFDxauBtAthsdQp57ufhoKRrGEjSmiZNhptRn-vCnDTCblIlcqa3Wikss&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=ssGlRFTe1yAsPOMg920Tkw&_nc_ss=79689&oh=00_AQGxxEWRCriwnbe27THOHd-00a1S5HhuFHUBDmN99BtYYQ&oe=6A78B12D",
  },
  {
    out: "instagram-2.jpg",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/750843712_17960717934148714_1497307687897737329_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=GqBp34zb4kAQ7kNvwGJsXE1&_nc_oc=AdqNGqgcUEu8V0kMm3XbogJZ6qtHcKl13Qwst6wg9TO88S3rqGlRwDoLL65r4Ojpy1M&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=ssGlRFTe1yAsPOMg920Tkw&_nc_ss=79689&oh=00_AQElG3Qdmt2V7NIKrjA9-fR9CcyZvvjqDNROYz6qpnvZqg&oe=6A78AFCC",
  },
  {
    out: "instagram-3.jpg",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/731808286_17957321490148714_3466623719755374520_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=lC_laajgxWsQ7kNvwEJDrBd&_nc_oc=AdoA2Agwrd4e8y5DLUQkYM7ZU118QAiHLZ9hLmjS7kW3oWjlFESRhLeCGw0CD_ZXtkE&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=ssGlRFTe1yAsPOMg920Tkw&_nc_ss=79689&oh=00_AQHc88NC_iOOgPLe-EF2KJi6nXuLF575qf1XtzXO6mKFaw&oe=6A78B51E",
  },
  {
    out: "instagram-4.jpg",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/726838285_17955916590148714_7642058931712724627_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=hGyWggoSy6wQ7kNvwHCYXjc&_nc_oc=Adr-eWhhbdLXL1wVoGimSEr6Vwq4KuLp2DP4WCD2irL6xkQNnz0ceIXsPcujHSNQRE4&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=ssGlRFTe1yAsPOMg920Tkw&_nc_ss=79689&oh=00_AQG1VFIK-6HPULfcdabrXUZjRKqFXTjFHS4biYGbKpEiBw&oe=6A78989C",
  },
];

await mkdir("public/images/social", { recursive: true });

for (const post of posts) {
  const res = await fetch(post.src);
  if (!res.ok) {
    console.error("FAILED", post.out, res.status);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize({ width: 800, height: 800, fit: "cover", position: "centre" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`public/images/social/${post.out}`);
  console.log("wrote", post.out);
}
