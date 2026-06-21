import { strapi } from "../utils/strapi/graphql-client"
import { GET_CATEGORIES } from "../utils/strapi/strapi-queries"

export const getCategories = async () => {
    const res = await strapi.request<CategoryResponseData>(GET_CATEGORIES)
    return res
}

