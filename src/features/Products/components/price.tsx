import { cn, formatPrice } from "#/lib/utils"
import type { ProductPrice } from "../type"

interface PriceProps {
    pricing: ProductPrice
    className?: {
        price?: string
        discount?: string
    }
}

const Price = ({ pricing, className }: PriceProps) => {

    const { final_price, original_price } = pricing
    const hasDiscount = original_price > final_price;
    return <div className="flex items-center gap-2">
        <div className={cn("text-sm font-bold ", className?.price)}>{formatPrice(final_price)}</div>

        {hasDiscount && (
            <div className={cn("text-xs text-muted-foreground line-through", className?.discount)}>{formatPrice(original_price)}</div>
        )}
    </div>

}
export default Price