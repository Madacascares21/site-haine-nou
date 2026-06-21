// cart/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  upsertCartItemServerFn,
  clearCartServerFn,
} from "./functions/cart.function";

type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isAuthenticated: boolean;

  // Cart UI state
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  setAuthenticated: (auth: boolean, dbItems?: CartItem[]) => void;
  addItem: (productId: string, variantId: string) => void;
  reduceItem: (productId: string, variantId: string) => void;
  removeItem: (productId: string, variantId: string) => void;
  clear: () => void;
};

function applyAdd(
  items: CartItem[],
  productId: string,
  variantId: string
): CartItem[] {
  const existing = items.find(
    (i) => i.productId === productId && i.variantId === variantId
  );

  if (existing) {
    return items.map((i) =>
      i.productId === productId && i.variantId === variantId
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
  }

  return [...items, { productId, variantId, quantity: 1 }];
}

function applyReduce(
  items: CartItem[],
  productId: string,
  variantId: string
): CartItem[] {
  return items
    .map((i) =>
      i.productId === productId && i.variantId === variantId
        ? { ...i, quantity: i.quantity - 1 }
        : i
    )
    .filter((i) => i.quantity > 0);
}

function applyRemove(
  items: CartItem[],
  productId: string,
  variantId: string
): CartItem[] {
  return items.filter(
    (i) => !(i.productId === productId && i.variantId === variantId)
  );
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isAuthenticated: false,

      // UI state
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      setAuthenticated: (auth, dbItems) => {
        set({
          isAuthenticated: auth,
          items: dbItems ?? (auth ? [] : get().items),
        });
      },

      addItem: (productId, variantId) => {
        set((state) => ({
          items: applyAdd(state.items, productId, variantId),
        }));

        const { isAuthenticated, items } = get();

        if (isAuthenticated) {
          const item = items.find(
            (i) =>
              i.productId === productId &&
              i.variantId === variantId
          );

          if (item) {
            upsertCartItemServerFn({ data: item });
          }
        }
      },

      reduceItem: (productId, variantId) => {
        const before = get().items.find(
          (i) =>
            i.productId === productId &&
            i.variantId === variantId
        );

        set((state) => ({
          items: applyReduce(state.items, productId, variantId),
        }));

        if (get().isAuthenticated && before) {
          const newQty = before.quantity - 1;

          upsertCartItemServerFn({
            data: { productId, variantId, quantity: newQty },
          });
        }
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: applyRemove(state.items, productId, variantId),
        }));

        if (get().isAuthenticated) {
          upsertCartItemServerFn({
            data: { productId, variantId, quantity: 0 },
          });
        }
      },

      clear: () => {
        set({ items: [] });

        if (get().isAuthenticated) {
          clearCartServerFn();
        }
      },
    }),
    {
      name: "shopping-cart-storage",
      partialize: (state) =>
        state.isAuthenticated
          ? {}
          : {
            items: state.items,
            isOpen: state.isOpen,
          },
    }
  )
);