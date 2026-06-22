import { getRouteApi } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select"
import { SORT_OPTIONS } from "../constants/constants"



const searchRouterApi = getRouteApi('/c/$category/{-$subCategory}')

export function ProductSort() {
    const navigate = searchRouterApi.useNavigate()
    const search = searchRouterApi.useSearch()

    const [filters, setFilters] = useState(search)
    useEffect(() => {
        setFilters(search)
    }, [search])



    const updateSearch = (updates: Record<string, unknown>) => {
        navigate({
            search: (prev) => ({
                ...prev,
                ...updates,
                // page: 1, // reset page on filter change
            }),
        })
    }
    return (
        <>
            <span
                id="sortBy"
                className="text-sm text-muted-foreground"
            >
                Sort by:
            </span>

            <div className="flex items-center ml-auto">
                <Select
                    value={filters.sortBy}
                    onValueChange={(value) => updateSearch({ sortBy: value })}
                >
                    <SelectTrigger
                        className="w-40"
                        aria-labelledby="sortBy"
                    >
                        <SelectValue placeholder="Select..." />
                    </SelectTrigger>

                    <SelectContent>
                        {SORT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}
