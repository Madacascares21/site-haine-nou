import { n as cartItems, t as db } from "./db-DJhDWXFv.js";
import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { n as getSession } from "./auth.functions-DNA-k0RN.js";
import { and, eq } from "drizzle-orm";
//#region src/features/cart/functions/cart.function.ts?tss-serverfn-split
var getCartServerFn_createServerFn_handler = createServerRpc({
	id: "8d4e25a98da381fff5f23fd7df60f25789349d7c76730c0fdc8589176baae0b6",
	name: "getCartServerFn",
	filename: "src/features/cart/functions/cart.function.ts"
}, (opts) => getCartServerFn.__executeServer(opts));
var getCartServerFn = createServerFn({ method: "GET" }).handler(getCartServerFn_createServerFn_handler, async () => {
	const session = await getSession();
	if (!session) return [];
	return db.select().from(cartItems).where(eq(cartItems.userId, session.user.id));
});
var upsertCartItemServerFn_createServerFn_handler = createServerRpc({
	id: "a31ecafd33dc539afd16b9a1d9afb86aaae0fdeecae0169f9dfde98b1f2409f3",
	name: "upsertCartItemServerFn",
	filename: "src/features/cart/functions/cart.function.ts"
}, (opts) => upsertCartItemServerFn.__executeServer(opts));
var upsertCartItemServerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(upsertCartItemServerFn_createServerFn_handler, async ({ data }) => {
	const session = await getSession();
	if (!session) throw new Error("Unauthorized");
	const existing = await db.query.cartItems.findFirst({ where: and(eq(cartItems.userId, session.user.id), eq(cartItems.productId, data.productId), eq(cartItems.variantId, data.variantId)) });
	if (existing) if (data.quantity <= 0) await db.delete(cartItems).where(eq(cartItems.id, existing.id));
	else await db.update(cartItems).set({ quantity: data.quantity }).where(eq(cartItems.id, existing.id));
	else if (data.quantity > 0) await db.insert(cartItems).values({
		userId: session.user.id,
		productId: data.productId,
		variantId: data.variantId,
		quantity: data.quantity
	});
});
var mergeCartServerFn_createServerFn_handler = createServerRpc({
	id: "2c5a77111882588f192fc21714c67e9ca792182c9b01ab686bf0f8c086526f13",
	name: "mergeCartServerFn",
	filename: "src/features/cart/functions/cart.function.ts"
}, (opts) => mergeCartServerFn.__executeServer(opts));
var mergeCartServerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(mergeCartServerFn_createServerFn_handler, async ({ data }) => {
	const session = await getSession();
	if (!session) throw new Error("Unauthorized");
	for (const item of data.items) {
		const existing = await db.query.cartItems.findFirst({ where: and(eq(cartItems.userId, session.user.id), eq(cartItems.productId, item.productId), eq(cartItems.variantId, item.variantId)) });
		if (existing) await db.update(cartItems).set({ quantity: existing.quantity + item.quantity }).where(eq(cartItems.id, existing.id));
		else await db.insert(cartItems).values({
			userId: session.user.id,
			...item
		});
	}
});
var clearCartServerFn_createServerFn_handler = createServerRpc({
	id: "e5275775162291913974bc24d46af65250942d35e3ea58392f5641ce02a6bd5e",
	name: "clearCartServerFn",
	filename: "src/features/cart/functions/cart.function.ts"
}, (opts) => clearCartServerFn.__executeServer(opts));
var clearCartServerFn = createServerFn({ method: "POST" }).handler(clearCartServerFn_createServerFn_handler, async () => {
	const session = await getSession();
	if (!session) throw new Error("Unauthorized");
	await db.delete(cartItems).where(eq(cartItems.userId, session.user.id));
});
//#endregion
export { clearCartServerFn_createServerFn_handler, getCartServerFn_createServerFn_handler, mergeCartServerFn_createServerFn_handler, upsertCartItemServerFn_createServerFn_handler };
