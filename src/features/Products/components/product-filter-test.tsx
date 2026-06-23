
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '#/components/ui/accordion'
import { Checkbox } from '#/components/ui/checkbox'
import { Label } from '#/components/ui/label'
import { ColorFilterSelector } from '#/features/category/components/color-filter'
import PriceSliderFilter from '#/features/category/components/price-filter'
import { SizeFilterSelector } from '#/features/category/components/size-filter'


const materials = [
    { id: 'leather', label: 'Leather', value: 'leather' },
    { id: 'suede', label: 'Suede', value: 'suede' },
    { id: 'canvas', label: 'Canvas', value: 'canvas' },
    { id: 'mesh', label: 'Mesh', value: 'mesh' },
    { id: 'synthetic', label: 'Synthetic', value: 'synthetic' },
]

export function ProductFilters() {
    return (
        <div className="w-full ">

            <Accordion type="multiple" defaultValue={["price", "color", "size", "material"]} className="w-full">

                <AccordionItem value="price">
                    <AccordionTrigger>Pret</AccordionTrigger>
                    <AccordionContent>
                        <PriceSliderFilter />
                    </AccordionContent>
                </AccordionItem>


                <AccordionItem value="color">
                    <AccordionTrigger>Culoare</AccordionTrigger>
                    <AccordionContent>
                        <ColorFilterSelector />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="size">
                    <AccordionTrigger>Marime</AccordionTrigger>
                    <AccordionContent>
                        <SizeFilterSelector />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="material">
                    <AccordionTrigger>Material (experimental)</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            {materials.map((material) => (
                                <div key={material.id} className="flex items-center gap-2">
                                    <Checkbox id={material.id} />
                                    <Label
                                        htmlFor={material.id}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {material.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
