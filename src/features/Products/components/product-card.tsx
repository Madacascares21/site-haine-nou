import { Link, useSearch } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Price from './price'
import type { CardProductType, Product, ProductVariant } from '../type'
import { getStrapiMedia } from '#/lib/utils'

interface ProductCardProps {
    product: CardProductType
}

export default function ProductCard({ product }: ProductCardProps) {
    const [variant, setVariant] = useState<ProductVariant>(product.variants[0])

    // Use strict: false so it doesn't throw an error if used outside the expected route
    const searchParams = useSearch({ strict: false })

    useEffect(() => {
        const colorsParam = searchParams?.colors

        if (colorsParam) {
            try {
                // Parse the JSON string array from the URL (e.g., '["#ff0000","#e1c37b"]')
                const activeColors: string[] = typeof colorsParam === 'string'
                    ? JSON.parse(colorsParam)
                    : colorsParam

                if (Array.isArray(activeColors) && activeColors.length > 0) {
                    // Find the first variant that matches one of the filtered colors
                    const matchedVariant = product.variants.find(v =>
                        v.color?.color_code && activeColors.includes(v.color.color_code)
                    )

                    if (matchedVariant) {
                        setVariant(matchedVariant)
                    }
                }
            } catch (error) {
                console.error("Failed to parse colors from search params:", error)
            }
        }
    }, [searchParams?.colors, product.variants])

    return (
        <Link
            search={{ variant_name: variant.name }}
            params={{ slug: product.slug }}
            replace={true}
            className="group relative flex flex-col gap-3"
            to="/product/$slug"
        >
            {/* Product Image Container */}





            <div className="relative aspect-4/5 w-full overflow-hidden ">
                <img
                    loading='lazy'
                    src={getStrapiMedia(variant.media[0].url)}
                    alt={product.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {!variant.available && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                    </div>
                )}
                <div className="flex flex-col m-3 p-3 rounded-sm   gap-1 ml-6 absolute bottom-0 right-0">
                    {(() => {
                        const colors = product.variants
                            .map(v => v.color?.color_code)
                            .filter((c): c is string => Boolean(c))
                            .filter((color, index, self) => self.indexOf(color) === index)

                        return colors.map(color => (
                            <button
                                key={color}
                                type="button"
                                onMouseEnter={() => {
                                    const variantx = product.variants.find(v => v.color?.color_code === color) ?? product.variants[0]
                                    setVariant(variantx)
                                }}
                                className={`size-4 rounded-full transition border-2 ${variant.color?.color_code === color ? 'border-primary scale-110' : 'border-transparent'
                                    }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))
                    })()}
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-1">
                <h2 className="text-sm  leading-tight">
                    {product.name}
                </h2>
                <Price pricing={product.pricing} />
            </div>
        </Link >
    )
}