import OrdersList from '#/features/order/components/order-list-page'
import { getOrderListServerFn } from '#/features/order/server/order'
import { requireAuth } from '#/lib/auth.functions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order/')({
    beforeLoad: async () => await requireAuth(),
    component: RouteComponent,
    loader: async () => {
        const data = await getOrderListServerFn()
        console.log(data)
        return data
    }
})

function RouteComponent() {
    return <>

        <OrdersList />

    </>
}
