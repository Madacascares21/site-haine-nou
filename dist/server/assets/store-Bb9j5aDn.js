import { n as createServerFn } from "../server.js";
import { i as createSsrRpc } from "./auth.functions-DNA-k0RN.js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
//#region src/features/cart/functions/cart.function.ts
var getCartServerFn = createServerFn({ method: "GET" }).handler(createSsrRpc("8d4e25a98da381fff5f23fd7df60f25789349d7c76730c0fdc8589176baae0b6"));
var upsertCartItemServerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("a31ecafd33dc539afd16b9a1d9afb86aaae0fdeecae0169f9dfde98b1f2409f3"));
var mergeCartServerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("2c5a77111882588f192fc21714c67e9ca792182c9b01ab686bf0f8c086526f13"));
var clearCartServerFn = createServerFn({ method: "POST" }).handler(createSsrRpc("e5275775162291913974bc24d46af65250942d35e3ea58392f5641ce02a6bd5e"));
//#endregion
//#region src/features/cart/store.ts
function applyAdd(items, productId, variantId) {
	if (items.find((i) => i.productId === productId && i.variantId === variantId)) return items.map((i) => i.productId === productId && i.variantId === variantId ? {
		...i,
		quantity: i.quantity + 1
	} : i);
	return [...items, {
		productId,
		variantId,
		quantity: 1
	}];
}
function applyReduce(items, productId, variantId) {
	return items.map((i) => i.productId === productId && i.variantId === variantId ? {
		...i,
		quantity: i.quantity - 1
	} : i).filter((i) => i.quantity > 0);
}
function applyRemove(items, productId, variantId) {
	return items.filter((i) => !(i.productId === productId && i.variantId === variantId));
}
var useCartStore = create()(persist((set, get) => ({
	items: [],
	isAuthenticated: false,
	isOpen: false,
	openCart: () => set({ isOpen: true }),
	closeCart: () => set({ isOpen: false }),
	toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
	setAuthenticated: (auth, dbItems) => {
		set({
			isAuthenticated: auth,
			items: dbItems ?? (auth ? [] : get().items)
		});
	},
	addItem: (productId, variantId) => {
		set((state) => ({ items: applyAdd(state.items, productId, variantId) }));
		const { isAuthenticated, items } = get();
		if (isAuthenticated) {
			const item = items.find((i) => i.productId === productId && i.variantId === variantId);
			if (item) upsertCartItemServerFn({ data: item });
		}
	},
	reduceItem: (productId, variantId) => {
		const before = get().items.find((i) => i.productId === productId && i.variantId === variantId);
		set((state) => ({ items: applyReduce(state.items, productId, variantId) }));
		if (get().isAuthenticated && before) upsertCartItemServerFn({ data: {
			productId,
			variantId,
			quantity: before.quantity - 1
		} });
	},
	removeItem: (productId, variantId) => {
		set((state) => ({ items: applyRemove(state.items, productId, variantId) }));
		if (get().isAuthenticated) upsertCartItemServerFn({ data: {
			productId,
			variantId,
			quantity: 0
		} });
	},
	clear: () => {
		set({ items: [] });
		if (get().isAuthenticated) clearCartServerFn();
	}
}), {
	name: "shopping-cart-storage",
	partialize: (state) => state.isAuthenticated ? {} : {
		items: state.items,
		isOpen: state.isOpen
	}
}));
//#endregion
export { getCartServerFn as n, mergeCartServerFn as r, useCartStore as t };
