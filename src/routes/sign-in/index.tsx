import { createFileRoute, redirect } from '@tanstack/react-router'

import { AuthenticationPage } from './-components/login-page'
import { getSession } from '@/lib/auth.functions'
import { site } from '#/features/header/constant'
import { seo } from '#/lib/seo'
export const Route = createFileRoute('/sign-in/')({
  beforeLoad: async () => {
    const session = await getSession()

    if (session) {
      throw redirect({ to: "/" })
    }
  },
  component: AuthenticationPage,
  head: () => {
  
          const canonical = `${import.meta.env.VITE_SITE_URL}/sign-in`
          return seo({
              title: `Sign-in | ${site.name}`,
              description: "Aici comanda produsele aflate in cosul de cumparaturi",
              canonical,
              type: "website",
          })
      }
})


