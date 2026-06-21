import { getRouteApi } from "@tanstack/react-router";
import { Checkbox } from "#/components/ui/checkbox";
import { Label } from "#/components/ui/label";


// Example color palette — replace with your actual available colors
const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]
const categoryRouteApi = getRouteApi('/c/$category/{-$subCategory}')

export function SizeFilterSelector() {



    const navigate = categoryRouteApi.useNavigate();
    const search = categoryRouteApi.useSearch();

    const selectedSizes = search.sizes ?? [];

    const toggleSize = (size: string) => {
        const newSizes = selectedSizes.includes(size)
            ? selectedSizes.filter((s) => s !== size)
            : [...selectedSizes, size];

        // Update the search params
        navigate({
            search: (prev) => ({
                ...prev,
                sizes: newSizes.length > 0 ? newSizes : undefined,
                page: 1, // reset page when filtering
            }),
            replace: true,
        });
    };

    return (
        <div className="space-y-3">

            {AVAILABLE_SIZES.map((size) => {
                return (
                    <div key={size} className="flex items-center gap-2">
                        <Checkbox id={size} checked={selectedSizes.includes(size)} onCheckedChange={() => toggleSize(size)} />
                        <Label
                            htmlFor={size}
                            className="text-sm font-normal cursor-pointer"
                        >
                            {size}
                        </Label>
                    </div>
                );
            })}
        </div>


    );
}
