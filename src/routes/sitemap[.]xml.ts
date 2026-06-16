import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/about", "/projects", "/services", "/contact"];
        // Add project detail pages
        const projectSlugs = [
          "luxury-heights",
          "telangana-secretariat",
          "sunrise-residency",
          "civic-center-complex",
          "villa-renovation",
          "meghana-towers",
        ];
        const all = [
          ...paths.map((p) => ({ path: p, changefreq: "weekly", priority: p === "/" ? "1.0" : "0.8" })),
          ...projectSlugs.map((s) => ({ path: `/projects/${s}`, changefreq: "monthly", priority: "0.7" })),
        ];
        const urls = all.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
