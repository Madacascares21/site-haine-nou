// Cart.tsx
import { cn, getStrapiMedia } from "#/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ImageOff, Loader2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartProducts } from "../hook";
import { useCartStore } from "../store";

export default function CartSheet() {
    const {
        items,
        addItem,
        reduceItem,
        removeItem,
        clear,
        productResults,
        isLoading,
    } = useCartProducts();
    const { isOpen, openCart, closeCart } = useCartStore();

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const isAnyLoading = productResults.some((result) => result.isLoading);

    // 2. Updated Dynamic Financial Calculations (Filters out unavailable items)
    const subtotal = items.reduce((sum, item, index) => {
        const queryResult = productResults[index];
        const product = queryResult?.data?.products_connection?.nodes[0];
        const variant = product?.variants_connection?.nodes[0];

        // Check availability state (Fallback to true while loading)
        const isAvailable = variant?.available ?? true;
        if (!isAvailable) return sum;

        const price = product?.pricing?.final_price ?? 0;
        return sum + price * item.quantity;
    }, 0);

    // Mock calculations for extra pricing details
    const shippingCost = subtotal > 0 && subtotal < 150 ? 15 : 0;
    const estimatedTax = subtotal * 0.08;
    const totalCost = subtotal + shippingCost + estimatedTax;

    return (
        <Sheet open={isOpen} onOpenChange={(open) => {
            if (open) {
                openCart();
            } else {
                closeCart();
            }
        }}>
            <SheetTrigger asChild>
                <Button aria-label="Cart Button" variant="ghost" className="relative gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-background">
                            {totalQuantity}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col w-full sm:max-w-md p-6">
                <SheetHeader className="pb-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                        Shopping Cart s ({items.length} {items.length === 1 ? 'item' : 'items'})
                        {isAnyLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 my-4 pr-3">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
                            <ShoppingCart className="h-8 w-8 stroke-1" />
                            <p className="text-sm">Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item, index) => {
                                const queryResult = productResults[index];
                                const serverData = queryResult?.data;
                                const isLoading = queryResult?.isLoading;
                                const product = serverData?.products_connection.nodes[0];
                                const variant = product?.variants_connection.nodes[0];

                                const productName = product?.name || "Loading product...";
                                const imageUrl = variant?.media[0]?.url;
                                const productPrice = product?.pricing.final_price;

                                // Dynamic availability check from your schema payload
                                const isAvailable = variant?.available ?? true;

                                return (
                                    <div
                                        key={`${item.productId}-${item.variantId}`}
                                        className={`flex gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all ${!isAvailable ? "opacity-60 grayscale-[35%] bg-muted/40 border-dashed" : ""
                                            }`}
                                    >
                                        {isLoading && (
                                            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                            </div>
                                        )}

                                        <div className="h-20 w-20 rounded-lg border bg-muted flex items-center justify-center overflow-hidden shrink-0 relative">
                                            {imageUrl ? (
                                                <img
                                                    src={getStrapiMedia(imageUrl)}
                                                    alt={productName}
                                                    className="h-full w-full object-cover transition-all hover:scale-105"
                                                />
                                            ) : (
                                                <ImageOff className="h-5 w-5 text-muted-foreground/60" />
                                            )}
                                        </div>

                                        <div className="flex flex-col justify-between flex-1 min-w-0">
                                            <div className="space-y-0.5">
                                                <div className="flex items-start justify-between gap-1">
                                                    <h4 className="font-semibold text-sm tracking-tight truncate max-w-[250px]">
                                                        {productName}
                                                    </h4>
                                                    {!isAvailable && (
                                                        <span className="inline-flex items-center gap-1 shrink-0 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                                                            <AlertCircle className="h-2.5 w-2.5" />
                                                            Unavailable
                                                        </span>
                                                    )}
                                                </div>

                                                {productPrice && (
                                                    <p className={`text-sm font-medium ${!isAvailable ? "line-through text-muted-foreground/70" : "text-muted-foreground"}`}>
                                                        ${productPrice.toFixed(2)}
                                                    </p>
                                                )}

                                                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span
                                                        className="inline-block h-3 w-3 rounded-full border border-border"
                                                        style={{ backgroundColor: variant?.color.color_code }}
                                                        aria-hidden="true"
                                                    />
                                                    <span aria-hidden="true">·</span>
                                                    <span>{variant?.size.name}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Stepper controls auto-disabled if item is out of stock */}
                                                <div className={`flex items-center border rounded-lg bg-background p-0.5 shadow-sm ${!isAvailable ? "opacity-50 pointer-events-none" : ""}`}>
                                                    <button
                                                        className="p-1 rounded-md hover:bg-muted"
                                                        onClick={() => reduceItem(item.productId, item.variantId)}
                                                        disabled={!isAvailable}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-6 text-center text-xs font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="p-1 rounded-md hover:bg-muted"
                                                        onClick={() => addItem(item.productId, item.variantId)}
                                                        disabled={!isAvailable}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => removeItem(item.productId, item.variantId)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </ScrollArea>

                {/* 3. Pricing Summary and Global Actions Block */}
                {items.length > 0 && (
                    <SheetFooter className="pt-4 border-t flex-col gap-4 sm:flex-col block shrink-0">
                        <div className="space-y-1.5 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium">
                                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Estimated Tax</span>
                                <span className="font-medium">${estimatedTax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 mt-1 text-base font-semibold">
                                <span>Total Cost</span>
                                <span>${totalCost.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full mt-2">
                            <Button variant="outline" onClick={clear} className="flex-1">
                                Clear
                            </Button>
                            <Link to="/checkout" onClick={() => {
                                closeCart()
                            }} className={cn(buttonVariants({ variant: "default" }), "flex-1")} disabled={subtotal === 0}>
                                Checkout
                            </Link>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}