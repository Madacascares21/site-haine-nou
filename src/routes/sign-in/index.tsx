import { createFileRoute, redirect } from '@tanstack/react-router'

import { AuthenticationPage } from './-components/login-page'
import { getSession } from '@/lib/auth.functions'
export const Route = createFileRoute('/sign-in/')({
  beforeLoad: async () => {
    const session = await getSession()

    if (session) {
      throw redirect({ to: "/" })
    }
  },
  component: AuthenticationPage,
})


