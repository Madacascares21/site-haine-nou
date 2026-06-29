// src/routes/robots[.]txt.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
    server: {
        handlers: {
            GET: async () => {
                const siteUrl = "http://localhost:3000"

                const robots = `# robots.txt for ${siteUrl}

User-agent: *

# Allow public pages
Allow: /

# Block private ecommerce areas
Disallow: /sign-in/
Disallow: /checkout/
Disallow: /orders/


# Allow assets needed for rendering
Allow: /images/
Allow: /assets/
Allow: /css/
Allow: /js/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`

                return new Response(robots, {
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'Cache-Control': 'public, max-age=86400',
                    },
                })
            },
        },
    },
})