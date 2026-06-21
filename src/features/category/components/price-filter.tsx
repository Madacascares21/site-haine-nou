import { Slider } from "#/components/ui/slider"
import { getRouteApi } from "@tanstack/react-router"
import { useEffect, useState } from "react"

const categoryRouteApi = getRouteApi('/c/$category/{-$subCategory}')

const PriceSliderFilter = () => {
    const search = categoryRouteApi.useSearch()
    const navigate = categoryRouteApi.useNavigate()
    const [priceRange, setPriceRange] = useState<[number, number]>([search.minPrice || 0, search.maxPrice || 1000])

    useEffect(() => {
        setPriceRange([
            search.minPrice ?? 0,
            search.maxPrice ?? 1000
        ]);
    }, [search.minPrice, search.maxPrice]);

    // const handleChange = (value: number[]) => {
    //     setPriceRange([value[0], value[1]]);
    //     navigate({
    //         search: (prev) => ({
    //             ...prev,
    //             minPrice: value[0],
    //             maxPrice: value[1],
    //         }),
    //     });
    // };
    return (
        <div className="space-y-4 mt-4">
            {/* <div>
                <Label className="text-sm font-medium">Pret</Label>
                <p className="text-xs text-muted-foreground mt-1">
                    {priceRange[0]} Lei - {priceRange[1]} Lei
                </p>
            </div> */}
            <Slider
                value={priceRange}
                min={0}
                max={1000}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                onValueCommit={(value) =>
                    navigate({
                        search: (prev) => ({
                            ...prev,
                            minPrice: value[0],
                            maxPrice: value[1],
                        }),
                    })
                }
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{priceRange[0]} Lei</span>
                <span>{priceRange[1]} Lei</span>
            </div>
        </div>
    )
}

export default PriceSliderFilter