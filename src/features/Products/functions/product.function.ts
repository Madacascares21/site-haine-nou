import { strapi } from "#/lib/strapi"
import { createServerFn } from "@tanstack/react-start"
import { sortByOptionArray } from "../constants"
import { GET_BATCH_PRODUCTS_QUERY, GET_CARD_PRODUCTS, GET_PRODUCT_BY_SLUG, ID_TO_PRODUCTS } from "../graphql/product.query"
import type { CardProductResponseData, CartProductResponseData, ProductBySlugResponseData, ProductResponseData, SortByValues } from "../type"
import z from "zod"

export type variablesOption = {
    category: String
    subCategory: String
    page: Number
    pageSize: Number
    sortBy: SortByValues
    colors: [String]
    sizes: [String]
    minPrice: Number
    maxPrice: Number
}


export const getProductsServerFunc = createServerFn().handler(async ({ }) => {




    const variables: Partial<variablesOption> = {
        sortBy: sortByOptionArray.filter(opt => opt.name === "new-products")[0].value,

    }

    const res = await strapi.request<CardProductResponseData>(GET_CARD_PRODUCTS, variables)
    return res
})

export const featuredProductsServerFunc = createServerFn().handler(async ({ }) => {




    const variables: Partial<variablesOption> = {
        // sortBy: sortByOptionArray.filter(opt => opt.name === "price-asc")[0].value,
        // subCategory: "tricou-barbati",
        subCategory: "featured"
    }

    const res = await strapi.request<CardProductResponseData>(GET_CARD_PRODUCTS, variables)
    return res
})
export const bestPriceServerFunc = createServerFn().handler(async ({ }) => {




    const variables: Partial<variablesOption> = {
        sortBy: sortByOptionArray.filter(opt => opt.name === "price-asc")[0].value,
        subCategory: "promotii",
        // category: "featured"
    }

    const res = await strapi.request<CardProductResponseData>(GET_CARD_PRODUCTS, variables)
    return res
})


const documentIdToProductsSchema = z.object({
    productId: z.string(),
    variantId: z.string()
})

// type ConvertToStrapiProductsProps = {
//     productId: string
//     variantId: string
// }
type BatchStrapiVariables = {
    productIds: string[];
    variantIds: string[];
}

const batchProductsSchema = z.object({
    items: z.array(
        z.object({
            productId: z.string(),
            variantId: z.string(),
            quantity: z.number().min(0)
        })
    )
});

// export const documentIdToProductsServerFn = createServerFn().validator(documentIdToProductsSchema).handler(async ({
//     data
// }) => {

//     const variables: ConvertToStrapiProductsProps = {
//         productId: data.productId,
//         variantId: data.variantId
//     }

//     const res = await strapi.request<CartProductResponseData>(GET_PRODUCT_BY_DOCUMENT_ID, variables)
//     return res



// })
export const batchProductsServerFn = createServerFn()
    .validator(batchProductsSchema)
    .handler(async ({ data }) => {

        // Extract arrays of IDs from the incoming batch data
        const productIds = data.items.map(item => item.productId);

        // Filter out any undefined/null variant IDs if some items don't have them
        const variantIds = data.items
            .map(item => item.variantId)
            .filter((id): id is string => !!id);

        const variables: BatchStrapiVariables = {
            productIds,
            variantIds
        };

        // Make ONE single optimized request to Strapi via GraphQL
        const res = await strapi.request<CartProductResponseData>(
            GET_BATCH_PRODUCTS_QUERY, // Use the query with the "in" filters here
            variables
        );

        return res;
    });
// export const documentIdToProducts = async ({ productId, variantId }: ConvertToStrapiProductsProps) => {

// }


export const getProductBySlug = async (slug: string) => {
    const variables: { slug: string } = { slug }

    const res = await strapi.request<ProductBySlugResponseData>(GET_PRODUCT_BY_SLUG, variables)
    return res
}



