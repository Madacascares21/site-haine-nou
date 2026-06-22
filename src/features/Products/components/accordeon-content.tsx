import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "#/components/ui/accordion"; // Adjust this path depending on where your shadcn components live
import Markdown from "react-markdown";

interface ProductDetailsAccordionProps {
    description?: string
    variantSku?: string
}

export function ProductDetailsAccordion({ description, variantSku }: ProductDetailsAccordionProps) {
    return (
        <Accordion type="multiple" className="w-full" defaultValue={["description", "materials", "shipping"]}>
            {/* 1. Description Section */}
            <AccordionItem value="description" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium hover:no-underline py-4">
                    Descriere Produs
                </AccordionTrigger>

                <AccordionContent className="text-sm  leading-relaxed pb-4">
                    <div className="dark prose-headings:text-white prose-sm max-w-none">
                        <article className="text-muted-foreground">
                            <Markdown>{description || "Nu există o descriere disponibilă pentru acest produs în acest moment."}</Markdown>
                        </article>
                    </div>
                    {variantSku && (
                        <p className="mt-2 text-xs text-muted-foreground/60">
                            Cod produs (SKU): {variantSku}
                        </p>
                    )}
                </AccordionContent>
            </AccordionItem>

            {/* 2. Material & Care Section */}
            <AccordionItem value="materials" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium hover:no-underline py-4">
                    Materiale și Îngrijire
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                    <ul className="list-disc pl-4 space-y-1">
                        <li>Material principal: 100% Bumbac</li>
                        <li>Spălare la mașină la maxim 30°C, ciclu scurt</li>
                        <li>Nu utilizați înălbitor</li>
                        <li>Călcare la maximum 110°C</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

            {/* 3. Delivery Section */}
            <AccordionItem value="shipping" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium hover:no-underline py-4">
                    Livrare și Retururi
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 space-y-2">
                    <p>
                        <strong>Livrare Standard:</strong> Între 2-4 zile lucrătoare prin curier rapid (15,00 LEI sau Gratuit pentru comenzi de peste 200 LEI).
                    </p>
                    <p>
                        <strong>Retur Simplu:</strong> Aveți la dispoziție 30 de zile de la data achiziției pentru a returna gratuit articolele în magazin sau prin curier.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}