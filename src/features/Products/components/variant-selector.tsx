import { getRouteApi } from "@tanstack/react-router";
import type { ProductVariant } from "../type";
import { cn } from "#/lib/utils";

interface VariantSelectorProps {
  allVariants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  allVariants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  const navigate = getRouteApi("/product/$slug").useNavigate();

  // -----------------------------
  // Unified availability rule
  // -----------------------------
  const isVariantAvailable = (variant?: ProductVariant) => {
    const stockQty = variant?.qty ?? 0;
    return (variant?.available ?? true) && stockQty > 0;
  };

  // -----------------------------
  // Unique colors
  // -----------------------------
  const colors = Array.from(
    new Map(allVariants.map((v) => [v.color.color_code, v.color])).values()
  );

  // -----------------------------
  // Sizes for selected color
  // -----------------------------
const selectedColorCode = selectedVariant?.color?.color_code;

const sizes = selectedColorCode
  ? Array.from(
      new Map(
        allVariants
          .filter(
            (v) => v.color.color_code === selectedColorCode
          )
          .map((v) => [v.size.name, v.size])
      ).values()
    )
  : [];

  // -----------------------------
  // Helpers
  // -----------------------------
  const isColorAvailable = (colorCode: string) => {
    return allVariants.some(
      (v) =>
        v.color.color_code === colorCode &&
        isVariantAvailable(v)
    );
  };

  const isSizeAvailable = (size: string) => {
    if (!selectedVariant) return false;

    return allVariants.some(
      (v) =>
        v.color.color_code === selectedVariant.color.color_code &&
        v.size.name === size &&
        isVariantAvailable(v)
    );
  };

  const getVariantByColorAndSize = (
    colorCode: string,
    size: string
  ) => {
    return allVariants.find(
      (v) =>
        v.color.color_code === colorCode &&
        v.size.name === size
    );
  };

  // -----------------------------
  // Color click
  // -----------------------------
  const handleColorClick = (colorCode: string) => {
    const targetVariant = allVariants.find(
      (v) =>
        v.color.color_code === colorCode &&
        isVariantAvailable(v)
    );

    navigate({
      search: { variant_name: targetVariant?.name },
      resetScroll: false,
    });

    if (targetVariant) {
      onVariantChange(targetVariant);
    }
  };

  // -----------------------------
  // Size click
  // -----------------------------
  const handleSizeClick = (size: string) => {
    if (!selectedVariant) return;

    const targetVariant = getVariantByColorAndSize(
      selectedVariant.color.color_code,
      size
    );

    navigate({
      search: { variant_name: targetVariant?.name },
      resetScroll: false,
    });

    if (targetVariant && isVariantAvailable(targetVariant)) {
      onVariantChange(targetVariant);
    }
  };

  return (
    <div className="space-y-6">
      {/* ---------------- COLOR ---------------- */}
      {colors.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">
            Culoare
          </h2>

          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const available = isColorAvailable(color.color_code);

              const isSelected =
                selectedVariant?.color.color_code ===
                color.color_code;

              return (
                <button
                  key={color.color_code}
                  onClick={() => handleColorClick(color.color_code)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all relative",
                    isSelected
                      ? "border-foreground"
                      : "border-border hover:border-muted-foreground",
                    !available &&
                      "opacity-40 cursor-not-allowed grayscale"
                  )}
                  style={{ backgroundColor: color.color_code }}
                  title={`${color.name}${
                    !available ? " (out of stock)" : ""
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- SIZE ---------------- */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex gap-1 items-center">
            <h2 className="text-sm font-semibold text-foreground">
              Mărime
            </h2>
            <span className="text-xs">
              ({selectedVariant?.qty ?? 0} bucăți)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const available = isSizeAvailable(size.name);

              const isSelected =
                selectedVariant?.size?.name === size.name;

              return (
                <button
                  key={size.name}
                  onClick={() => handleSizeClick(size.name)}
                  className={cn(
                    "px-4 py-2 border rounded-md text-sm font-medium transition-all",
                    isSelected
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border hover:border-muted-foreground",
                    !available &&
                      "opacity-40 cursor-not-allowed"
                  )}
                  disabled={!available}
                >
                  {size.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}