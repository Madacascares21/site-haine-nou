import { getRouteApi } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { cn } from "#/lib/utils";


// Example materials — replace with your actual materials
const AVAILABLE_MATERIALS = [
    "Bumbac",
    "Etamina",
    "Panza topita",
    
];

const categoryRouteApi = getRouteApi('/c/$category/{-$subCategory}');

export function MaterialFilterSelector() {
    const navigate = categoryRouteApi.useNavigate();
    const search = categoryRouteApi.useSearch();

    const selectedMaterials = search.materials ?? [];

    const toggleMaterial = (material: string) => {
        const newMaterials = selectedMaterials.includes(material)
            ? selectedMaterials.filter((m) => m !== material)
            : [...selectedMaterials, material];

        navigate({
            search: (prev) => ({
                ...prev,
                materials: newMaterials.length > 0 ? newMaterials : undefined,
                page: 1, // reset page when filtering
            }),
            replace: true,
        });
    };

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium">Material</Label>
            <div className="flex flex-wrap gap-2">
                {AVAILABLE_MATERIALS.map((material) => {
                    const selected = selectedMaterials.includes(material);
                    return (
                        <Button
                            key={material}
                            onClick={() => toggleMaterial(material)}
                            variant="outline"
                            className={cn(
                                selected ? "ring-2 ring-offset-2 ring-primary" : "border border-gray-400 w-max"
                            )}
                            aria-label={`Select material ${material}`}
                        >
                            {material}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
