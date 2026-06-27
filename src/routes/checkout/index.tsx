import CheckoutPage from '#/features/checkout/components/checkout-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout/')({
    beforeLoad: async () => await requireAuth(),
    component: CheckoutPage,
    pendingComponent: () => <CheckoutSkeleton />,
    head: () => {

        const canonical = `${import.meta.env.VITE_SITE_URL}/checkout`
        return seo({
            title: `Checkout | ${site.name}`,
            description: "Aici comanda produsele aflate in cosul de cumparaturi",
            canonical,
            type: "website",
        })
    }
})


import { Skeleton } from "@/components/ui/skeleton"
import { requireAuth } from '#/lib/auth.functions'
import { seo } from '#/lib/seo'
import { site } from '#/features/header/constant'

export default function CheckoutSkeleton() {
    return (
        <div className="w-full flex-1 max-w-6xl mx-auto p-6 bg-[#121212] text-white min-h-screen">
            {/* Main Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Forms & Shipping */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 1. Contact Section */}
                    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4">
                        <Skeleton className="h-6 w-24 bg-zinc-800" /> {/* Section Title */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16 bg-zinc-800" /> {/* Label */}
                                <Skeleton className="h-10 w-full rounded-md bg-zinc-800" /> {/* Input */}
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-12 bg-zinc-800" />
                                <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-14 bg-zinc-800" />
                            <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
                        </div>
                    </div>

                    {/* 2. Delivery Address Section */}
                    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4">
                        <Skeleton className="h-6 w-36 bg-zinc-800" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-14 bg-zinc-800" />
                            <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 space-y-2">
                                <Skeleton className="h-4 w-10 bg-zinc-800" />
                                <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16 bg-zinc-800" />
                                <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
                            </div>
                        </div>
                    </div>

                    {/* 3. Delivery Method Section */}
                    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4">
                        <Skeleton className="h-6 w-40 bg-zinc-800" />

                        {/* Method Option 1 (Selected State mock) */}
                        <div className="p-4 rounded-lg border border-blue-900/50 bg-blue-950/20 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <Skeleton className="h-4 w-4 rounded-full bg-blue-800" /> {/* Radio button */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28 bg-zinc-800" />
                                    <Skeleton className="h-3 w-20 bg-zinc-800" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-16 bg-zinc-800" />
                        </div>

                        {/* Method Option 2 */}
                        <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/20 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <Skeleton className="h-4 w-4 rounded-full bg-zinc-800" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32 bg-zinc-800" />
                                    <Skeleton className="h-3 w-24 bg-zinc-800" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-12 bg-zinc-800" />
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Order Summary (Comanda ta) */}
                <div className="lg:col-span-1">
                    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-6 sticky top-6">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-28 bg-zinc-800" /> {/* Title */}
                            <Skeleton className="h-4 w-16 bg-zinc-800" />  {/* Item count */}
                        </div>

                        {/* Cart Items List */}
                        <div className="space-y-4">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex space-x-3 items-start justify-between py-2">
                                    <div className="flex space-x-3">
                                        <Skeleton className="h-16 w-12 rounded-md bg-zinc-800 flex-shrink-0" /> {/* Product Image */}
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-36 bg-zinc-800" /> {/* Title */}
                                            <Skeleton className="h-3 w-24 bg-zinc-800" /> {/* Variation Details */}
                                            <Skeleton className="h-5 w-8 rounded bg-zinc-800 mt-1" />   {/* Qty Badge */}
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <Skeleton className="h-3 w-12 bg-zinc-800/60 ml-auto" /> {/* Strikethrough price */}
                                        <Skeleton className="h-4 w-16 bg-zinc-800 ml-auto" />    {/* Current Price */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className="border-zinc-800" />

                        {/* Pricing Totals */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-16 bg-zinc-800" />
                                <Skeleton className="h-4 w-16 bg-zinc-800" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-14 bg-zinc-800" />
                                <Skeleton className="h-4 w-16 bg-zinc-800" />
                            </div>
                        </div>

                        <hr className="border-zinc-800" />

                        {/* Grand Total */}
                        <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-6 w-12 bg-zinc-800" />
                            <Skeleton className="h-7 w-24 bg-zinc-800" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

