import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { MODULES } from "@/content/outline";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-23");
  const fixed = ["", "/course", "/faculty", "/fees", "/faq", "/verify", "/contact", "/terms", "/privacy", "/refunds"];
  const free = MODULES.filter((m) => m.free).flatMap((m) => m.lessons.map((l) => `/course/${m.slug}/${l.slug}`));
  return [...fixed, ...MODULES.map((m) => `/course/${m.slug}`), ...free].map((p) => ({ url: SITE_URL + p, lastModified: now }));
}
