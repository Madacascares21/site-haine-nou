import type { sortByOptionArray } from "./constants"

export interface Product {
    documentId?: string
    name: string
    slug: string
    description: string
    seo: Seo

    updatedAt: string
    pricing: ProductPrice
    categories: {
        name: string
        seo: Seo


    }[]
    sub_categories: {
        name: string
        seo: Seo
    }[]
    variants: ProductVariant[]


}

export interface ProductPrice {
    original_price: number
    discounted_price?: number
    final_price: number
}


export interface ProductVariant {
    available: boolean
    documentId?: string
    name: string
    updatedAt: string
    media: { url: string }[]
    color: {
        name: string
        color_code: string
    }
    size: {
        name: string
    },

}

export interface ProductBySlugResponseData {
    products_connection: {
        nodes: SlugProduct[]
        pageInfo: {
            total: number
            pageSize: number
            pageCount: number
            page: number
        }
    }
}

export interface SlugProduct extends Product {

    categories_connection: {
        nodes: { products: Product[] }[]
    }
    seo: Seo



}

interface Seo {
    name: string
    description: string
    media: {
        url: string
    }
}

export interface ProductResponseData {
    products_connection: {
        nodes: Product[]
        pageInfo: {
            total: number
            pageSize: number
            pageCount: number
            page: number
        }
    }
}


interface CartProductDataType extends Omit<CardProductType, "variants"> {
    variants_connection: {
        nodes: ProductVariant[]
    }
}



export interface CartProductResponseData {
    products_connection: {
        nodes: CartProductDataType[]
    }
}



export type CardProductType = Pick<Product, "categories" | "name" | "slug" | "pricing" | "variants" | "documentId">

export interface CardProductResponseData {
    products_connection: {
        nodes: CardProductType[]
        pageInfo: {
            total: number
            pageSize: number
            pageCount: number
            page: number
        }
    }
}

export type SortBy =
    | "alphabetical-asc"
    | "alphabetical-desc"
    | "price-asc"
    | "price-desc"
    | "new-products";



type ArrayElement = typeof sortByOptionArray[number];

// 2. Extract the 'value' property type (which is a read-only tuple)
export type SortByValues = ArrayElement["value"];

// 3. Flatten the tuples into a single union of all possible string values
// export type SortByValues = ValueTuples[number];