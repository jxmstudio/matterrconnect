import type { MetadataRoute } from "next";

import { areas } from "@/content/areas";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { hasTestimonials } from "@/content/testimonials";
import { site } from "@/content/site";

/**
 * Generated from the content files, so adding a service or project puts it in
 * the sitemap automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/areas`, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Keep the empty testimonials page out of the sitemap until it has content.
  if (hasTestimonials) {
    staticRoutes.push({
      url: `${site.url}/testimonials`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...areas.map((area) => ({
      url: `${site.url}/areas/${area.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ].map((entry) => ({ ...entry, lastModified }));
}
