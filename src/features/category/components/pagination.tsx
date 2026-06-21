import { getRouteApi } from "@tanstack/react-router";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "#/components/ui/pagination";



const categoryRouteApi = getRouteApi('/c/$category/{-$subCategory}');



const CategoryPagination = () => {

    // const navigate = categoryRouteApi.useNavigate()
    const { page } = categoryRouteApi.useSearch()
    const { pageInfo: { pageCount } } = categoryRouteApi.useLoaderData()


    return (
        <Pagination className="mt-6 col-span-full">
            <PaginationContent>
                {/* Prev button */}
                <PaginationItem>
                    <PaginationPrevious
                        aria-disabled={page === 1}
                        search={((prev: any) => ({ ...prev, page: Math.max(1, prev.page - 1) })) as any}

                    />
                </PaginationItem>

                {/* Page numbers */}
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            search={((prev: any) => ({ ...prev, page: p })) as any}
                            isActive={p === page}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next button */}
                <PaginationItem>
                    <PaginationNext
                        aria-disabled={page === pageCount}

                        search={((prev: any) => ({ ...prev, page: Math.min(pageCount, prev.page + 1) })) as any}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    )
}

export default CategoryPagination