import { site } from '#/features/header/constant';
import OrderDetailsPage from '#/features/order/components/order-page'
import { getOrderServerFn } from '#/features/order/server/order'
import { requireAuth } from '#/lib/auth.functions';
import { seo } from '#/lib/seo';
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/orders/$id')({
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
        return data
    },
    head: ({ params }) => {

        const canonical = `${import.meta.env.VITE_SITE_URL}/order/${params.id}`
        return seo({
            title: `Order number: ${params.id} | ${site.name}`,
            description: `Comanda numarul ${params.id} de pe site!`,
            canonical,
            type: "website",
        })
    }
})

function RouteComponent() {
    return <div className='p-6'>


        <OrderDetailsPage />
    </div>
}
