import { getRouteApi, useRouterState } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import ProductCard from "#/features/Products/components/product-card"


const categoryRouteApi = getRouteApi('/c/$category/{-$subCategory}')

export function ProductGrid() {
  const products = categoryRouteApi.useLoaderData()
  const loading = useRouterState().isLoading
  const navigate = categoryRouteApi.useNavigate()
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="space-y-4" key={i}>
            <Skeleton className="aspect-4/5 w-full rounded-none" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>
    )
  }
  return (


    <>
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  gap-1  ">

        {products.nodes.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}


      </div>
      {products.nodes.length === 0 && <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          We couldn't find any products matching your filters.
        </p>
        <Button onClick={() => {
          navigate({
            search: { maxPrice: 1000, minPrice: 0, page: 1, pageSize: 12, sortBy: "alphabetical-asc" }
          })
        }}>Clear Filters</Button>

      </div>}

    </>
  )
}
