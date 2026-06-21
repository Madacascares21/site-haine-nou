import { GraphQLClient } from 'graphql-request'

export const strapi = new GraphQLClient(
    import.meta.env.VITE_STRAPI_GRAPHQL_URL!,
    {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN ?? ''}`,
        },
    }
)
