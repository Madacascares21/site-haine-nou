// cart/functions/cart.function.ts
import { eq, and } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { getSession } from "#/lib/auth.functions";
import { cartItems } from "#/db/schema";
import { db } from "#/db";



export const getCartServerFn = createServerFn({ method: "GET" }).handler(async () => {
    const session = await getSession();
    if (!session) return [];
    return db.select().from(cartItems).where(eq(cartItems.userId, session.user.id));
});

export const upsertCartItemServerFn = createServerFn({ method: "POST" })
    .validator((d: { productId: string; variantId: string; quantity: number }) => d)
    .handler(async ({ data }) => {
        const session = await getSession();
        if (!session) throw new Error("Unauthorized");

        const existing = await db.query.cartItems.findFirst({
            where: and(
                eq(cartItems.userId, session.user.id),
                eq(cartItems.productId, data.productId),
                eq(cartItems.variantId, data.variantId)
            ),
        });

        if (existing) {
            if (data.quantity <= 0) {
                await db.delete(cartItems).where(eq(cartItems.id, existing.id));
            } else {
                await db.update(cartItems)
                    .set({ quantity: data.quantity })
                    .where(eq(cartItems.id, existing.id));
            }
        } else if (data.quantity > 0) {
            await db.insert(cartItems).values({
                userId: session.user.id,
                productId: data.productId,
                variantId: data.variantId,
                quantity: data.quantity,
            });
        }
    });

export const mergeCartServerFn = createServerFn({ method: "POST" })
    .validator((d: { items: { productId: string; variantId: string; quantity: number }[] }) => d)
    .handler(async ({ data }) => {
        const session = await getSession();
        if (!session) throw new Error("Unauthorized");

        // Merge: guest quantity + existing quantity, or insert new
        for (const item of data.items) {
            const existing = await db.query.cartItems.findFirst({
                where: and(
                    eq(cartItems.userId, session.user.id),
                    eq(cartItems.productId, item.productId),
                    eq(cartItems.variantId, item.variantId)
                ),
            });

            if (existing) {
                await db.update(cartItems)
                    .set({ quantity: existing.quantity + item.quantity })
                    .where(eq(cartItems.id, existing.id));
            } else {
                await db.insert(cartItems).values({
                    userId: session.user.id,
                    ...item,
                });
            }
        }
    });

export const clearCartServerFn = createServerFn({ method: "POST" }).handler(async () => {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");
    await db.delete(cartItems).where(eq(cartItems.userId, session.user.id));
});