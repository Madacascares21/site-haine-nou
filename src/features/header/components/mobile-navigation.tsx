import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { navigation } from "../constant";
import { Button } from "#/components/ui/button";
import BrandLink from "./brand-link";


export const MobileNavigation = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open Menu"
                >
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>

            {/* Changed padding to p-6 for a cleaner, balanced structure */}
            <SheetContent side="right" className="w-[300px] p-6 flex flex-col justify-between">
                <div className="flex flex-col h-full">

                    {/* Brand Logo & Header Section */}
                    <SheetHeader className="text-left pb-4 border-b">
                        <SheetTitle asChild>
                            <BrandLink />
                        </SheetTitle>
                    </SheetHeader>

                    {/* Navigation Items with adjusted margins */}
                    <nav className="mt-4 flex flex-col gap-1 overflow-y-auto pr-1">
                        {navigation.map((item) => {
                            const hasChildren = item.children?.length;

                            if (!hasChildren) {
                                return (
                                    <Link
                                        key={item.label}
                                        to={item.to as "/c/$category/{-$subCategory}"}
                                        params={{ category: item.label }}

                                        className="rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }

                            return (
                                <Collapsible key={item.label} className="w-full">
                                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180">
                                        {item.label}
                                        <ChevronDown className="size-4 transition-transform duration-200" />
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="ml-2 mt-1 border-l pl-2 flex flex-col gap-0.5">
                                        {(item.children ?? []).map((child) => (
                                            <Link
                                                key={child.label}
                                                to={item.to as "/c/$category/{-$subCategory}"}
                                                params={{ category: item.label, subCategory: child.label }}
                                                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom CTA Area */}
                <div className="mt-auto border-t pt-4">
                    {/* <CTA /> */}
                </div>
            </SheetContent>
        </Sheet>
    );
};