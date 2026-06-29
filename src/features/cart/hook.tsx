import { useQueries, useQuery } from "@tanstack/react-query";
import { useCartStore } from "./store";
import { batchProductsServerFn } from "../Products/functions/product.function";

export function useCartProducts() {
    const { items, addItem, reduceItem, removeItem, clear } = useCartStore();

    // 1. Generate a stable dependency key based on current cart items
    const cartDependencyKey = items.map(item => `${item.productId}-${item.variantId || 'none'}`);

    // 2. Switch to a single useQuery instance
    const queryResult = useQuery({
        queryKey: ["cart-products", cartDependencyKey],
        queryFn: async () => {
            return await batchProductsServerFn({
                data: {
                    items: items.map((item) => ({
                        productId: item.productId,
                        variantId: item.variantId,
                    })),
                },
            });
        },
        enabled: items.length > 0,
        staleTime: 1000 * 60 * 5,
    });

    // 3. Extract the nodes array from the Strapi GraphQL connection response
    const strapiNodes = queryResult.data?.products_connection?.nodes || [];

    // 4. Map and filter the products to match your existing UI data structure
    const products = items
        .map((cartItem) => {
            // Find the specific product node matching this cart item
            const foundProductNode = strapiNodes.find(
                (node) => node.documentId === cartItem.productId
            );

            if (!foundProductNode) return null;

            // Optional: Filter the variants inside the node to find the specific variant,
            // or pass the entire node back depending on how your frontend expects it.
            return {
                ...cartItem,
                product: foundProductNode,
            };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

    return {
        // cart store
        items,
        addItem,
        reduceItem,
        removeItem,
        clear,

        // query data
        products,

        // states (mapped cleanly from a single query instance)
        isLoading: queryResult.isLoading,
        isFetching: queryResult.isFetching,
        hasError: queryResult.isError,
        errors: queryResult.error ? [queryResult.error] : [],

        // raw query result for compatibility
        queryResult,
    };
}
