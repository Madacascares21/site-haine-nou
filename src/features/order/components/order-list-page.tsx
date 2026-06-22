import Container from '#/components/container'
import { formatPrice, getStrapiMedia } from '#/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { getRouteApi, Link } from '@tanstack/react-router'
import { CheckCircle2, Clock, Truck } from 'lucide-react'

const statusConfigs = {
    delivered: {
        label: 'Livrat',
        className:
            'bg-primary/10 text-primary border-primary/20',
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },

    processing: {
        label: 'În procesare',
        className:
            'bg-muted text-muted-foreground border-border',
        icon: <Clock className="w-3.5 h-3.5" />,
    },

    shipped: {
        label: 'Expediat',
        className:
            'bg-accent text-accent-foreground border-border',
        icon: <Truck className="w-3.5 h-3.5" />,
    },
}

const orderRoute = getRouteApi("/order/")

export default function OrdersList() {
    const data = orderRoute.useLoaderData()

    return (
        <main className="flex-1 min-h-screen">
            <Container className="font-sans text-foreground">

                <div className="mb-8">

                    <div className="text-xs text-muted-foreground mb-3 tracking-wide">
                        Acasă &gt;{" "}
                        <span className="text-foreground font-medium">
                            Comenzi
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        Comenzile tale
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Gestionează și urmărește comenzile și configurațiile hardware recente.
                    </p>

                </div>


                <div className="flex flex-col gap-4">

                    {data.map((order) => {

                        const status = statusConfigs.processing

                        return (
                            <Link
                                key={order.id}
                                to="/order/$id"
                                params={{ id: String(order.id) }}
                            >

                                <Card
                                    className="
                                    border-border
                                    bg-card
                                    shadow-sm
                                    hover:border-primary/40
                                    transition-colors
                                    "
                                >

                                    <CardHeader
                                        className="
                                        p-6 pb-4
                                        flex flex-col
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                        gap-4
                                        space-y-0
                                        "
                                    >

                                        <div className="space-y-1">

                                            <div className="flex items-center gap-3">

                                                <CardTitle className="text-base font-semibold">
                                                    Comanda #{order.id}
                                                </CardTitle>


                                                <Badge
                                                    variant="outline"
                                                    className={`
                                                    flex items-center gap-1.5
                                                    px-2.5 py-0.5
                                                    text-xs
                                                    font-medium
                                                    rounded-full
                                                    shadow-none
                                                    ${status.className}
                                                    `}
                                                >
                                                    {status.icon}
                                                    {status.label}
                                                </Badge>

                                            </div>


                                            <CardDescription>
                                                Plasată în data de{" "}
                                                {order.createdAt.toLocaleDateString("ro-RO")}
                                            </CardDescription>

                                        </div>


                                        <div className="sm:text-right">

                                            <span className="text-xs text-muted-foreground block">
                                                Valoare totală
                                            </span>

                                            <span className="text-lg font-bold">
                                                {formatPrice(Number(order.total))}
                                            </span>

                                        </div>


                                    </CardHeader>


                                    <CardContent
                                        className="
                                        flex flex-col
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                        gap-6
                                        "
                                    >

                                        <div className="flex items-center gap-3 flex-wrap">

                                            {order.products.map((p, idx) => (

                                                <div
                                                    key={idx}
                                                    className="
                                                    w-12 h-12
                                                    bg-muted
                                                    border-border
                                                    border
                                                    rounded-lg
                                                    flex items-center
                                                    justify-center
                                                    overflow-hidden
                                                    "
                                                >

                                                    <img
                                                        className="object-cover w-full h-full"
                                                        src={getStrapiMedia(
                                                            p.variant.media[0].url || ""
                                                        )}
                                                    />

                                                </div>

                                            ))}

                                        </div>


                                    </CardContent>

                                </Card>

                            </Link>
                        )
                    })}

                </div>

            </Container>
        </main>
    )
}