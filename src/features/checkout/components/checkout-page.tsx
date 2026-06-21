import { ShoppingBag } from "lucide-react"
import { OrderSummary } from "./order-summary"
import { CheckoutForm } from "./checkout-form"

export default function CheckoutPage() {


    return (
        <main className="bg-background z-30">
            <header className="border-b border-border">
                <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-5">
                    <ShoppingBag className="h-5 w-5 text-foreground" />
                    <span className="text-base font-semibold text-foreground">Finalizare comandă</span>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                    <div className="order-2 lg:order-1">
                        <CheckoutForm/>
                    </div>
                    <aside className="order-1 lg:order-2 lg:sticky lg:top-8 lg:self-start"><OrderSummary /></aside>
                </div>
            </div>
        </main>
    )
}
