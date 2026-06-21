import { getRouteApi } from "@tanstack/react-router"
import type { ProductVariant } from "../type"
import { cn } from "#/lib/utils"


interface VariantSelectorProps {
  allVariants: ProductVariant[]
  selectedVariant: ProductVariant | null
  onVariantChange: (variant: ProductVariant) => void
}

export default function VariantSelector({
  allVariants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  // Extract unique colors from variants



  const navigate = getRouteApi("/product/$slug").useNavigate()

  const colors = Array.from(
    new Map(
      allVariants.map((v) => [v.color.color_code, v.color])
    ).values()
  )

  const sizes = selectedVariant
    ? Array.from(
      new Set(
        allVariants
          .filter((v) => v.color.color_code === selectedVariant.color.color_code)
          .map((v) => v.size)
          .filter(Boolean)
      )
    )
    : []

  // Check if a color is available
  const isColorAvailable = (colorCode: string) => {
    return allVariants.some((v) => v.color.color_code === colorCode && v.available)
  }

  const isSizeAvailable = (size: string) => {
    if (!selectedVariant) return false
    return allVariants.some(
      (v) =>
        v.color.color_code === selectedVariant.color.color_code &&
        v.size.name === size &&
        v.available
    )
  }

  // Get variant by color and size
  const getVariantByColorAndSize = (colorCode: string, size: string) => {
    return allVariants.find(
      (v) =>
        v.color.color_code === colorCode &&
        v.size.name === size
    )
  }

  // Handle color selection
  const handleColorClick = (colorCode: string) => {
    // If selecting the same color, allow re-click
    if (selectedVariant?.color.color_code === colorCode) {
      onVariantChange(selectedVariant)
      return
    }

    // Try to find the first available variant with this color
    const targetVariant = allVariants.find(
      (v) =>
        v.color.color_code === colorCode &&
        v.available
    )

    navigate({
      search: { variant_name: targetVariant?.name },
      resetScroll: false
    }

    )

    if (targetVariant) {
      onVariantChange(targetVariant)
    }



  }

  // Handle size selection
  const handleSizeClick = (size: string) => {
    if (!selectedVariant) return

    const targetVariant = getVariantByColorAndSize(
      selectedVariant.color.color_code,
      size
    )

    navigate({
      search: { variant_name: targetVariant?.name },
      resetScroll: false

    }
    )


    if (targetVariant && targetVariant.available) {
      onVariantChange(targetVariant)
    }
  }

  return (
    <div className="space-y-6">
      {/* Color Selector */}
      {colors.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Culoare</h2>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const available = isColorAvailable(color.color_code)
              const isSelected =
                selectedVariant?.color.color_code === color.color_code

              return (
                <button
                  key={color.color_code}
                  onClick={() => handleColorClick(color.color_code)}
                  className={cn(
                    'w-10 h-10 rounded-full border-2 transition-all relative',
                    isSelected
                      ? 'border-foreground'
                      : 'border-border hover:border-muted-foreground',
                    !available && 'opacity-50 cursor-not-allowed'
                  )}
                  style={{
                    backgroundColor: color.color_code,
                  }}
                  title={`${color.name}${!available ? ' (unavailable)' : ''}`}
                  aria-label={`${color.name}${!available ? ' (unavailable)' : ''}`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* <svg
                        className="w-5 h-5 text-white drop-shadow"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg> */}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Marime</h2>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const available = isSizeAvailable(size.name)
              const isSelected = selectedVariant?.size === size

              return (
                <button
                  key={size.name}
                  onClick={() => handleSizeClick(size.name)}
                  className={cn(
                    'px-4 py-2 border rounded-md text-sm font-medium transition-all',
                    isSelected
                      ? 'border-foreground bg-primary text-primary-foreground'
                      : 'border-border hover:border-muted-foreground text-foreground hover:bg-muted',
                    !available && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {size.name}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
