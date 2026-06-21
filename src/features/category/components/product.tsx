import { Star, Heart } from "lucide-react"
import { Button } from "#/components/ui/button"

interface ProductCardProps {
    product: {
        id: number
        name: string
        price: number
        originalPrice?: number
        image: string
        rating: number
        reviews: number
    }
}

export function ProductCard({ product }: ProductCardProps) {

    return (
        <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />



                {/* Wishlist Button */}
                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-3 bottom-3 opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <Heart className="h-4 w-4" />
                </Button>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-medium leading-tight text-balance line-clamp-2">{product.name}</h3>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">${product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full" size="sm">
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}
