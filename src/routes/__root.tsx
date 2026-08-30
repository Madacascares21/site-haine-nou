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
import { CookieNotice } from '#/components/popover-cookie'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    const seoData = seo({
      title: `Acasa | ${site.name}`,
      description: "Auxload Store – haine Gen Z cu imprimeuri trendy și stil modern. Livrare gratuită în Breaza.",
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


  const footerPlaceholder = {
    about: {
      title: "Cine suntem?",
      image: "https://placehold.co/200x200",
      imageAlt: "Logo companie",
    },

    contact: {
      title: "Cum ne găsești?",
      items: [
        {
          label: "Telefon",
          value: "0723456789",
          copyable: true,
          href: "tel:0723456789",
        },
        {
          label: "Email",
          value: "contact@auxload-store.ro",
          copyable: true,
          href: "mailto:contact@auxload-store.ro",
        },
        {
          label: "Adresă",
          value: "Str. Memorandumului nr. 10, Cluj-Napoca, România",
        },
      ],
    },

    sections: [
      {
        title: "Meniu",
        links: [
          {
            label: "Acasă",
            href: "/",
          },
          {
            label: "Despre noi",
            href: "/despre-noi",
          },
          {
            label: "Contact",
            href: "/contact",
          },
        ],
      },
      {
        title: "Informații",
        links: [
          {
            label: "Politica de confidențialitate",
            href: "/politica-confidentialitate",
          },

          {
            label: "Politica de cookie-uri",
            href: "/politica-cookie-uri",
          },
          {
            label: "Politica de livrare si retur",
            href: "/politica-de-livrare-și-retur",
          },
          {
            label: "Termeni și condiții",
            href: "/termeni-si-conditii",
          },
          {
            label: "ANPC",
            href: "https://anpc.ro/",
          },
        ],
      },
    ],

    badges: [
      {
        image: "https://placehold.co/260x80?text=ANPC",
        alt: "ANPC",
        href: "#",
      },
      {
        image: "https://placehold.co/260x80?text=SOL",
        alt: "Soluționarea Online a Litigiilor",
        href: "#",
      },
      {
        image: "https://placehold.co/260x80?text=NETOPIA+%7C+VISA+%7C+Mastercard",
        alt: "Metode de plată",
      },
    ],
  };
  return (
    <html lang="ro">
      <head>

        <HeadContent />
      </head>
      <body className='w-full  min-h-screen  flex flex-col'>

        <Header />
              <CookieNotice />

        <Toaster />
        <CartAuthSync />

        {children}
        <Footer config={footerPlaceholder} />
        <Scripts />
      </body>
    </html>
  )
}
