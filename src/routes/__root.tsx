import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'


import appCss from '../styles.css?url'

import { Toaster } from '#/components/ui/sonner'
import type { QueryClient } from '@tanstack/react-query'
import Cart from '#/features/cart/components/cart-sheet'
import { CartAuthSync } from '#/features/cart/CartAuthSync'
import { HeaderNavigation } from '#/components/header'
import Header from '#/features/header/components/header'
import Footer from '#/components/footer'

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
        title: 'TanStack Start Starter',
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
