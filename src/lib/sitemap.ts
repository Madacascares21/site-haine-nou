// utils/sitemap.ts
import "dotenv/config";
import type { Sitemap } from "tanstack-router-sitemap";
import { generatedData, productSitemap } from "./../generated/constants";
import type { FileRouteTypes } from "./../routeTree.gen";



// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes["fullPaths"];

// Define your sitemap
const sitemap: Sitemap<TRoutes> = {
    siteUrl: "https://liliana-cusaturi.netlify.app",
    defaultPriority: 0.5,
    routes: {
        "/": {
            priority: 1,
            changeFrequency: "daily",
        },
        // Dynamic route example
        "/product/$slug": async (route) => {
            return productSitemap.map((product) => ({
                path: `/product/${product.slug}`,
                priority: 0.8,
                changeFrequency: "daily",
                lastModified: product.updateAt,
            }));
        },
        "/c/$category/{-$subCategory}": async (route) => {
            const a = generatedData.links.categories_connection.nodes.map(category => {
                const children = category.sub_categories_connection.nodes?.map(sub => sub.name).map(name => ({
                    href: `/c/${category.name}/${name}`,
                    updatedAt: category.updatedAt
                }));

                return {
                    updatedAt: category.updatedAt,
                    href: `/c/${category.name}`,
                    ...(children && children.length > 0 ? { children } : {}) // only add children if not empty
                };
            });

            const categories = a.map(cat => ({ href: cat.href, updatedAt: cat.updatedAt }));
            const subCategories = a.flatMap((cat) =>
                (cat.children ?? []).map((child) => ({ href: child.href, updatedAt: child.updatedAt }))
            );
            const all = [...subCategories, ...categories]
            return all.map((a) => ({
                path: a.href,
                priority: 0.6,
                changeFrequency: "weekly",
                lastModified: a.updatedAt,
            }));
        },
        // "/contact": {
        //     priority: 0.4,
        //     changeFrequency: "yearly",s
        // }

    },
};

export const getSitemap = (): Promise<typeof sitemap> => {
    return Promise.resolve(sitemap);
};