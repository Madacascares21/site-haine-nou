import { getRouteApi } from "@tanstack/react-router";

import { generatedData } from "#/generated/constants"; /*  */
import { cn } from "#/lib/utils";

// Example color palette — replace with your actual available colors

const categoryRouteApi = getRouteApi('/c/$category/{-$subCategory}')

export function ColorFilterSelector() {
    const AVAILABLE_COLORS = generatedData.colors_connection.nodes.map(color => color.color_code)


    const navigate = categoryRouteApi.useNavigate();
    const search = categoryRouteApi.useSearch();

    const selectedColors = search.colors ?? [];

    const toggleColor = (color: string) => {
        const newColors = selectedColors.includes(color)
            ? selectedColors.filter((c) => c !== color)
            : [...selectedColors, color];

        // Update the search params
        navigate({
            search: (prev) => ({
                ...prev,
                colors: newColors.length > 0 ? newColors : undefined,
                page: 1, // reset page when filtering
            }),
            replace: true,
        });
    };

    return (
        <div className="space-y-3 flex gap-2 p-1">
            {AVAILABLE_COLORS.map((color) => {
                const selected = selectedColors.includes(color);
                return (
                    <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={cn(
                            "w-6 h-6 rounded-full  transition-all",
                            selected
                                ? "ring-2 ring-offset-2 ring-primary"
                                : "hover:scale-110"
                        )} style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                    >
                    </button>
                );
            })}

        </div>

    );
}
