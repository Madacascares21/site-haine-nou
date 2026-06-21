import { formatPrice, getStrapiMedia } from '#/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getRouteApi, Link } from '@tanstack/react-router'
import { CheckCircle2, Clock, Truck } from 'lucide-react'

// Layout types for the order history data


// Mock order history mapping the style of your dashboard


const statusConfigs = {
    delivered: {
        label: 'Delivered',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400',
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
    },
    processing: {
        label: 'Processing',
        className: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400',
        icon: <Clock className="w-3.5 h-3.5 text-blue-600" />
    },
    shipped: {
        label: 'Shipped',
        className: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400',
        icon: <Truck className="w-3.5 h-3.5 text-amber-600" />
    }
}

const orderRoute = getRouteApi("/order/")

export default function OrdersList() {

    const data = orderRoute.useLoaderData()
    console.log("heyyyyyy",data[0].products)



    return (
        <div className="w-full max-w-4xl mx-auto font-sans text-slate-800">
            {/* Top Header info matching the style profile */}
            <div className="mb-8">
                <div className="text-xs text-slate-400 mb-3 tracking-wide">
                    Home &gt; <span className="text-slate-600 font-medium">Orders</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Your Orders</h1>
                <p className="text-sm text-slate-500 mt-1">Manage and track your recent hardware configurations and purchases.</p>
            </div>

            <div className="flex flex-col gap-4">
                {data.map((order) => {
                    const status =
                        //  statusConfigs[order.status]
                        statusConfigs["processing"]

                    return (
                        <Link to='/order/$id' params={{ id: String(order.id) }}>
                            <Card key={order.id} className="border  border-slate-100 shadow-sm bg-white hover:border-slate-200 transition-colors">

                                {/* Desktop/Tablet Card Layout */}
                                <CardHeader className="p-6 pb-4   flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 space-y-0">
                                    <div className="space-y-1 ">
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-base font-semibold text-slate-900">
                                                Order #{order.id}
                                            </CardTitle>
                                            <Badge variant="secondary" className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full shadow-none ${status.className}`}>
                                                {status.icon}
                                                {status.label}
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-xs text-slate-400">
                                            Placed on {order.createdAt.toLocaleDateString("ro-RO")}
                                        </CardDescription>
                                    </div>

                                    <div className="sm:text-right  ">
                                        <span className="text-xs text-slate-400 block">Total Amount</span>
                                        <span className="text-lg font-bold text-slate-900">{formatPrice(Number(order.total))}</span>
                                    </div>
                                </CardHeader>


                                <CardContent className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                                    {/* Horizontal Item Thumbnails Row */}
                                    <div className="flex items-center gap-3 flex-wrap">

                                        {order.products.map((p, idx) => (<div
                                            key={idx}
                                            className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-xl relative group"
                                            title={p.variant.media[0].url}
                                        >
                                            <img src={getStrapiMedia(p.variant.media[0].url || "")} />
                                        </div>))}



                                    </div>

                                    {/* Navigation Button linked directly via TanStack Router */}


                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>

        </div>
    )
}