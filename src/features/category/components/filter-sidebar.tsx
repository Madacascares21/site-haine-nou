
import { Button } from "#/components/ui/button"
import { cn } from "#/lib/utils"
import { getRouteApi } from "@tanstack/react-router"
import { ColorFilterSelector } from "./color-filter"
import PriceSliderFilter from "./price-filter"
import { SizeFilterSelector } from "./size-filter"



const categoryRouteApi = getRouteApi('/c/$category/{-$subCategory}');
export function FilterSidebar({ className }: { className?: string }) {
  const navigate = categoryRouteApi.useNavigate();
  const resetFilters = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        colors: undefined,
        sizes: undefined,
        materials: undefined,
        minPrice: 0,
        maxPrice: 1000,
      }),
      replace: true

    });
  };
  return (
    <aside className={cn(className, "w-full lg:w-64  shrink-0 ")}>
      <div className="sticky top-4 space-y-6 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button onClick={resetFilters} variant="ghost" size="sm" className="h-8 px-2 text-xs">
            Clear all
          </Button>
        </div>
        {/* Price Range Filter */}
        <PriceSliderFilter />
        {/* Material Filter */}
        {/* <MaterialFilterSelector /> */}
        {/* Color Filter */}
        <ColorFilterSelector />
        <SizeFilterSelector />
      </div>
    </aside>
  )
}
