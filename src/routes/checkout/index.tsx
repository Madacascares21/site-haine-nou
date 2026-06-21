import CheckoutPage from '#/features/checkout/components/checkout-page'
import { isAuthenticated } from '#/lib/auth.functions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout/')({
        beforeLoad: () => isAuthenticated(),

    component: CheckoutPage,
    pendingComponent: () => <div>Loading...</div>,
})


