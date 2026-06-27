import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'


import appCss from '../styles.css?url'

import Footer from '#/components/footer'
import { Toaster } from '#/components/ui/sonner'
import { CartAuthSync } from '#/features/cart/CartAuthSync'
import Header from '#/features/header/components/header'
import { site } from '#/features/header/constant'
import type { QueryClient } from '@tanstack/react-query'
import { seo } from '#/lib/seo'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    const seoData = seo({
      title: `Acasa | ${site.name}`,
      description: "Auxload Store – haine Gen Z cu imprimeuri trendy și stil modern. Livrare gratuită în Breaza.",
      // canonical: `${import.meta.env.VITE_SITE_URL}`,
      type: 'website',
    })

    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        ...(seoData.meta),
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
        { rel: 'icon', href: '/favicon.ico' },
        ...(seoData.links ?? []),
      ],
    }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>

        <HeadContent />
      </head>
      <body className='w-full  min-h-screen  flex flex-col'>

        <Header />
        <Toaster />
        <CartAuthSync />

        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
