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
        value: "0772 017 245",
        copyable: true,
        href: "tel:0772017245",
      },
      {
        label: "Email",
        value: "contact@exemplu.ro",
        copyable: true,
        href: "mailto:contact@exemplu.ro",
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
          label: "Magazin",
          href: "/shop",
        },
        {
          label: "Despre noi",
          href: "/despre-noi",
        },
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: "Contact",
          href: "/contact",
        },
        {
          label: "Contul meu",
          href: "/cont",
        },
      ],
    },
    {
      title: "Informații",
      links: [
        {
          label: "Termeni și condiții / Politica de confidențialitate",
          href: "/termeni-si-conditii",
        },

        {
          label: "Cum plasez o comandă?",
          href: "/cum-plasez-comanda",
        },
        {
          label: "Cum intru in posesia comenzii?",
          href: "/livrare-si-plata",
        },
        {
          label: "Politica de retur",
          href: "/retur",
        },
        {
          label: "ANPC",
          href: "/anpc",
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
        <Toaster />
        <CartAuthSync />

        {children}
        <Footer config={footerPlaceholder} />
        <Scripts />
      </body>
    </html>
  )
}
