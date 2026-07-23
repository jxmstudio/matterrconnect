import type { MetadataRoute } from "next";

import { isDemoDeployment, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Demo and preview builds are locked out of search entirely — see the note
  // on isDemoDeployment in src/content/site.ts.
  if (isDemoDeployment) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
