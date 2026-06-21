import { useQueries } from "@tanstack/react-query";
import { documentIdToProductsServerFn } from "../Products/functions/product.function";
import { useCartStore } from "./store";

export function useCartProducts() {
    const { items, addItem, reduceItem, removeItem, clear } = useCartStore();

    const productResults = useQueries({
        queries: items.map((item) => ({
            queryKey: ["product", item.productId, item.variantId],
            queryFn: async () => {
                return await documentIdToProductsServerFn({
                    data: {
                        productId: item.productId,
                        variantId: item.variantId,
                    },
                });
            },
            enabled: !!item.productId,
            staleTime: 1000 * 60 * 5,
        })),
    });

    const products = productResults
        .map((result, index) => ({
            ...items[index],
            product: result.data,
        }))
        .filter((item) => item.product);

    const isLoading = productResults.some(
        (result) => result.isLoading
    );

    const isFetching = productResults.some(
        (result) => result.isFetching
    );

    const hasError = productResults.some(
        (result) => result.isError
    );

    const errors = productResults
        .filter((result) => result.error)
        .map((result) => result.error);

    return {
        // cart store
        items,
        addItem,
        reduceItem,
        removeItem,
        clear,

        // query data
        products,

        // states
        isLoading,
        isFetching,
        hasError,
        errors,

        // raw react-query results if needed
        productResults,
    };
}