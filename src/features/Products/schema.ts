import z from "zod";

export const filterSearchParamsSchema = z.object({
    page: z.coerce.number().catch(1),
    pageSize: z.coerce.number().catch(12),
    sortBy: z.enum([
        "alphabetical-asc",
        "alphabetical-desc",
        "price-asc",
        "price-desc",
        "new-products",
    ]).catch("alphabetical-asc"),
    minPrice: z.number().min(0).catch(0),
    maxPrice: z.number().min(0).catch(10000),
    materials: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),

})

export const productVariantSearchParamsSchema = z.object({
    variant_name: z.string().optional()
})


