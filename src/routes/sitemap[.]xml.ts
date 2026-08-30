// src/routes/sitemap[.]xml.ts
import { GET_SITEMAP_PRODUCTS } from '#/features/Products/graphql/product.query'
import type { ProductResponseData } from '#/features/Products/type'
import { strapi } from '#/lib/strapi'
import { createFileRoute } from '@tanstack/react-router'
const sitemapProducts = async () => {
    const res = await strapi.request<ProductResponseData>(GET_SITEMAP_PRODUCTS)

    return res.products_connection.nodes.map(p => {
        const productDate = new Date(p.updatedAt).getTime();
        const variantDates = p.variants.map(v => new Date(v.updatedAt).getTime());

        const latestVariantDate = variantDates.length
            ? Math.max(...variantDates)
            : 0;

        const lastmod = new Date(Math.max(productDate, latestVariantDate));

        return {
            slug: p.slug,
            updateAt: lastmod.toISOString(),
        };
    })

}
export const Route = createFileRoute('/sitemap.xml')({
    server: {
        handlers: {
            GET: async () => {

                const posts = await sitemapProducts()

                const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://auxload-store.ro/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
                        .map(
                            (product) => `
  <url>
    <loc>https://auxload-store.ro/products/${product.slug}</loc>
    <lastmod>${product.updateAt}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
                        )
                        .join('')}
</urlset>`

                return new Response(sitemap, {
                    headers: {
                        'Content-Type': 'application/xml',
                    },
                })
            },
        },
    },
})