import { z } from "zod";

// ProductPrice
export const ProductPriceSchema = z.object({
    original_price: z.number(),
    discounted_price: z.number().optional(),
    final_price: z.number(),
});

// ProductVariant
export const ProductVariantSchema = z.object({
    available: z.boolean(),
    documentId: z.string().optional(),
    name: z.string(),
    updatedAt: z.string(),
    media: z.array(
        z.object({
            url: z.string(),
        })
    ),
    color: z.object({
        name: z.string(),
        color_code: z.string(),
    }),
    size: z.object({
        name: z.string(),
    }),
});

// Product
export const ProductSchema = z.object({
    documentId: z.string().optional(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    updatedAt: z.string(),

    price: z.number(),

    categories: z.array(
        z.object({
            name: z.string(),
        })
    ),

    sub_categories: z.array(
        z.object({
            name: z.string(),
        })
    ),

});

export const orderProductSchema = z.object({
    documentId: z.string().optional(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    updatedAt: z.string(),

    pricing: ProductPriceSchema,

    categories: z.array(
        z.object({
            name: z.string(),
        })
    ),

    sub_categories: z.array(
        z.object({
            name: z.string(),
        })
    ),

});


export type ProductSchemaType = z.infer<typeof ProductSchema>
export type OrderProductSchemaType = z.infer<typeof orderProductSchema>



export type CartItemSchemaType = {
    variant: z.infer<typeof ProductVariantSchema>
    product: ProductSchemaType
    quantity: number
}


export type OrderCartItemSchemaType = {
    variant: z.infer<typeof ProductVariantSchema>
    product: OrderProductSchemaType
    quantity: number
}