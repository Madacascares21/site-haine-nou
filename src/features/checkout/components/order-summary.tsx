import { useCartProducts } from "#/features/cart/hook";
import { formatPrice, getStrapiMedia } from "#/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ImageOff, Loader2 } from "lucide-react";

export function OrderSummary() {
  const {
    items,
    products,
    isLoading,
    queryResult
  } = useCartProducts();

  // 2. Dynamic Financial Calculations (Ignores unavailable items explicitly)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const isAnyLoading = queryResult.isLoading || queryResult.isFetching;

  const subtotal = products.reduce((sum, item) => {
    const product = item.product;
    const variant = product?.variants_connection?.nodes?.find(
      (v) => v.documentId === item.variantId
    );

    const isAvailable = variant?.available ?? true;
    if (!isAvailable) return sum;

    const price = product?.pricing?.final_price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  const shippingCost = 0;
  const estimatedTax = subtotal * 0;
  const totalCost = subtotal + shippingCost + estimatedTax;

  return (
    <div className="rounded-xl border border-border bg-card p-6 relative overflow-hidden">
      {/* Absolute indicator for refreshing prices */}
      {isLoading && (
        <div className="absolute top-4 right-4 animate-spin text-muted-foreground">
          <Loader2 className="h-4 w-4" />
        </div>
      )}

      <h2 className="text-lg font-semibold text-card-foreground">Comanda ta</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "produs" : "produse"}
      </p>

      <ul className="mt-6 flex flex-col gap-5">
        {products.map((item, index) => {
          // const queryResultd = queryResult[index];
          const isLoading = queryResult?.isLoading;

          const product = item.product
          const variant = product?.variants_connection?.nodes?.find(
            (v) => v.documentId === item.variantId
          );

          const productName = product?.name || "Se încarcă produsul...";
          const imageUrl = variant?.media[0]?.url;
          const finalPrice = product?.pricing?.final_price ?? 0;
          const originalPrice = product?.pricing?.original_price ?? 0;

          const isAvailable = variant?.available ?? true;

          return (
            <li
              key={`${item.productId}-${item.variantId}`}
              className={`flex gap-4 transition-all relative ${!isAvailable ? "opacity-50 grayscale-[30%]" : ""
                }`}
            >
              {/* Individual micro spinner loader */}
              {isLoading && (
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center z-10" />
              )}

              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={getStrapiMedia(imageUrl)}
                    alt={productName}
                    sizes="80px"
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <ImageOff className="h-4 w-4 text-muted-foreground/60" />
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate max-w-[200px] text-sm font-medium text-card-foreground">
                    {productName}
                  </p>
                  {!isAvailable && !isLoading && (
                    <span className="inline-flex items-center gap-1 shrink-0 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                      <AlertCircle className="h-2.5 w-2.5" />
                      Indisponibil
                    </span>
                  )}
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  {variant?.color?.color_code && (
                    <span
                      className="inline-block h-3 w-3 rounded-full border border-border"
                      style={{ backgroundColor: variant.color.color_code }}
                      aria-hidden="true"
                    />
                  )}
                  {variant?.color?.name && <span className="capitalize">{variant.color.name}</span>}
                  <span aria-hidden="true">·</span>
                  <span>Mărime {variant?.size?.name || "N/A"}</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <span className="px-2 py-0.5 text-xs font-medium border rounded-md bg-background text-muted-foreground">
                      {item.quantity} <span className="text-[10px]">x</span>
                    </span>
                  </div>

                  <div className="text-right">
                    {isAvailable && originalPrice > finalPrice && (
                      <span className="mr-2 text-xs text-muted-foreground line-through">
                        {formatPrice(originalPrice * item.quantity)}
                      </span>
                    )}
                    <span className={`text-sm font-semibold ${!isAvailable ? "line-through text-muted-foreground/60" : "text-card-foreground"}`}>
                      {formatPrice(finalPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {items.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">Coșul tău este gol.</p>
      )}

      <Separator className="my-6" />

      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium text-card-foreground">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Livrare</dt>
          <dd className="font-medium text-card-foreground">
            {shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}
          </dd>
        </div>
      </dl>

      <Separator className="my-6" />

      <div className="flex items-baseline justify-between">
        <span className="text-base font-semibold text-card-foreground">Total</span>
        <span className="text-xl font-bold text-card-foreground">{formatPrice(totalCost)}</span>
      </div>
    </div>
  );
}