import { site } from '#/features/header/constant'
import OrdersList from '#/features/order/components/order-list-page'
import { getOrderListServerFn } from '#/features/order/server/order'
import { requireAuth } from '#/lib/auth.functions'
import { seo } from '#/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orders/')({
    beforeLoad: async () => await requireAuth(),
    component: RouteComponent,
    loader: async () => {
        const data = await getOrderListServerFn()
        return data
    },
    head: () => {

        const canonical = `${import.meta.env.VITE_SITE_URL}/order`
        return seo({
            title: `Checkout | ${site.name}`,
            description: "Aici poti vedea comenzile tale!",
            canonical,
            type: "website",
        })
    }


})

function RouteComponent() {
    return <>

        <OrdersList />

    </>
}
