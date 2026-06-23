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
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          `${site.name}`,
        description: `Descoperă cele mai adorabile hăinuțe de Crăciun pentru animăluțul tău!
De la pulovere pufoase și costumașe de Moș Crăciun, până la accesorii festive perfecte pentru poze, găsești tot ce ai nevoie ca să transformi sărbătorile într-o poveste. Confort, stil și multă magie pentru căței și pisici fericiți.`,
        image: "/banner.jpg",
        keywords: "haine pentru animale cu tematică de Crăciun"
      }),
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
    ],
  }),
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
