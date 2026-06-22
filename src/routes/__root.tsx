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
      {
        title: site.name,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
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
      <body className='w-full  h-screen  flex flex-col'>

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
