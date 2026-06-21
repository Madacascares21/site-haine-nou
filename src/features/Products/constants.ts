import type { SortBy } from "./type";

export const sortByOptionArray = [
    {
        name: "price-asc" as SortBy, // Keeps it compatible with your SortBy type
        value: ["pricing.final_price:asc", "pricing.final_price:desc"],
    },
    {
        name: "price-desc" as SortBy,
        value: ["pricing.final_price:desc", "pricing.final_price:asc"],
    },
    { name: "alphabetical-asc" as SortBy, value: ["name:asc"] },
    { name: "alphabetical-desc" as SortBy, value: ["name:desc"] },
    { name: "new-products" as SortBy, value: ["createdAt:desc"] },
] as const; // <-- This freezes the structure and types