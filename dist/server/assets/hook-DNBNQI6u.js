import { n as documentIdToProductsServerFn } from "./product.function-e3JbASGV.js";
import { t as useCartStore } from "./store-Bb9j5aDn.js";
import { useQueries } from "@tanstack/react-query";
//#region src/features/cart/hook.tsx
function useCartProducts() {
	const { items, addItem, reduceItem, removeItem, clear } = useCartStore();
	const productResults = useQueries({ queries: items.map((item) => ({
		queryKey: [
			"product",
			item.productId,
			item.variantId
		],
		queryFn: async () => {
			return await documentIdToProductsServerFn({ data: {
				productId: item.productId,
				variantId: item.variantId
			} });
		},
		enabled: !!item.productId,
		staleTime: 1e3 * 60 * 5
	})) });
	return {
		items,
		addItem,
		reduceItem,
		removeItem,
		clear,
		products: productResults.map((result, index) => ({
			...items[index],
			product: result.data
		})).filter((item) => item.product),
		isLoading: productResults.some((result) => result.isLoading),
		isFetching: productResults.some((result) => result.isFetching),
		hasError: productResults.some((result) => result.isError),
		errors: productResults.filter((result) => result.error).map((result) => result.error),
		productResults
	};
}
//#endregion
export { useCartProducts as t };
