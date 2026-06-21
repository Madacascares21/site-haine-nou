import { sortByOptionArray } from "#/features/Products/constants";
import { GET_PRODUCTS } from "#/features/Products/graphql/product.query";
import type { ProductResponseData, SortBy, SortByValues } from "#/features/Products/type";
import { strapi } from "../utils/strapi/graphql-client";
import { reduceEmptyKeys } from "../utils/utils";


export interface FilterOptions {
    page: number;
    pageSize: number;
    sortBy?: SortBy
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    category?: string;
    subCategory?: string;
}
export const getProducts = async (filters: FilterOptions) => {
    type GraphqlVariable = Omit<FilterOptions, "sortBy"> & {
        sortBy: SortByValues;
    };
    const variables: GraphqlVariable = {
        page: filters.page,
        pageSize: filters.pageSize,
        sortBy: sortByOptionArray.find((option) => option.name === filters.sortBy)?.value ??
            ["name:asc"],
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        colors: filters.colors,
        sizes: filters.sizes,
        category: filters.category === "produse-noi" ? "" : filters.category,
        subCategory: filters.subCategory,
    };
    const res = await strapi.request<ProductResponseData>(GET_PRODUCTS
        , reduceEmptyKeys(variables)
    )

    return res
}

// export const getProductBySlug = async (slug: string) => {
//     const res = await strapi.request<ProductBySlugResponseData>(GET_PRODUCT_BY_SLUG, { slug })
//     return res
// }

// export const createOrder = async (orderOption: OrderOptions) => {
//     const res = await strapi.request<MutateOrderResponseData>(MUTATE_ORDER, orderOption)
//     return res
// }





export interface OrderOptions {
    data: {
        email: string
        userName: string
        phone: string
        orderProduct: {
            quantity: number
            variants: string
        }[]
    }
}





