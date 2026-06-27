// export const seo = ({
//     title,
//     description,
//     keywords,
//     image,
// }: {
//     title: string
//     description?: string
//     image?: string
//     keywords?: string
// }) => {
//     const tags = [
//         { title },
//         { name: 'description', content: description },
//         { name: 'keywords', content: keywords },
//         { name: 'twitter:title', content: title },
//         { name: 'twitter:description', content: description },
//         { name: 'twitter:creator', content: '@tannerlinsley' },
//         { name: 'twitter:site', content: '@tannerlinsley' },
//         { name: 'og:type', content: 'website' },
//         { name: 'og:title', content: title },
//         { name: 'og:description', content: description },
//         ...(image
//             ? [
//                 { name: 'twitter:image', content: image },
//                 { name: 'twitter:card', content: 'summary_large_image' },
//                 { name: 'og:image', content: image },
//             ]
//             : []),
//     ]

//     return tags
// }
import { site } from "#/features/header/constant"

type SEOOptions = {
    title: string
    description?: string
    image?: string
    keywords?: string
    canonical?: string
    robots?: string
    type?: "website" | "product" | "article"
}

export function seo({
    title,
    description,
    image,
    keywords,
    canonical,
    robots = "index,follow",
    type = "website",
}: SEOOptions) {
    const meta = [
        {
            title,
        },

        {
            name: "description",
            content: description,
        },

        {
            name: "robots",
            content: robots,
        },

        ...(keywords
            ? [
                {
                    name: "keywords",
                    content: keywords,
                },
            ]
            : []),

        // Open Graph
        {
            property: "og:title",
            content: title,
        },
        {
            property: "og:description",
            content: description,
        },
        {
            property: "og:type",
            content: type,
        },
        {
            property: "og:site_name",
            content: site.name,
        },

        ...(canonical
            ? [
                {
                    property: "og:url",
                    content: canonical,
                },
            ]
            : []),

        ...(image
            ? [
                {
                    property: "og:image",
                    content: image,
                },
            ]
            : []),

        // Twitter
        {
            name: "twitter:card",
            content: image ? "summary_large_image" : "summary",
        },

        {
            name: "twitter:title",
            content: title,
        },

        {
            name: "twitter:description",
            content: description,
        },

        ...(image
            ? [
                {
                    name: "twitter:image",
                    content: image,
                },
            ]
            : []),
    ]

    const links = canonical
        ? [
            {
                rel: "canonical",
                href: canonical,
            },
        ]
        : []

    return {
        meta,
        links,
    }
}