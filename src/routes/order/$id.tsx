import OrderDetailsPage from '#/features/order/components/order-page'
import { getOrderServerFn } from '#/features/order/server/order'
import { requireAuth } from '#/lib/auth.functions';
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/order/$id')({
    component: RouteComponent,
    beforeLoad: async () => await requireAuth(),
    // validateSearch: orderSearchSchema,
    loader: async ({ params }) => {
        const id = Number(params.id);

        if (Number.isNaN(id)) {
            throw notFound()
        }
        const data = await getOrderServerFn({
            data: {
                orderId: id
            }
        })
        console.log("Order id", data.products)
        return data
    }
})

function RouteComponent() {
    return <div className='p-6'>


        <OrderDetailsPage />
    </div>
}
