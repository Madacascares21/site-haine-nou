import { i as order, t as db } from "./db-DJhDWXFv.js";
import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { r as isAuthenticated, t as ensureSession } from "./auth.functions-DNA-k0RN.js";
import { t as orderIdSchema } from "./schema-DNbTVeE0.js";
import { notFound } from "@tanstack/react-router";
import { desc, eq } from "drizzle-orm";
//#region src/features/order/function/order.function.ts
var getOrdersList = async ({ userId }) => {
	const userOrders = await db.select().from(order).where(eq(order.userId, userId)).orderBy(desc(order.createdAt));
	if (userOrders.length === 0) return;
	return userOrders;
};
var getOrder = async ({ orderId }) => {
	const session = await ensureSession();
	const userOrder = await db.query.order.findFirst({ where: (order, { and, eq }) => and(eq(order.id, orderId), eq(order.userId, session.user.id)) });
	if (!userOrder) return;
	return userOrder;
};
//#endregion
//#region src/features/order/server/order.ts?tss-serverfn-split
var getOrderListServerFn_createServerFn_handler = createServerRpc({
	id: "c671e96b1f14cdb8d686a520ba822d1b8a905b8a88e4d5d0dd594c1b18dd85ee",
	name: "getOrderListServerFn",
	filename: "src/features/order/server/order.ts"
}, (opts) => getOrderListServerFn.__executeServer(opts));
var getOrderListServerFn = createServerFn().handler(getOrderListServerFn_createServerFn_handler, async () => {
	const orders = await getOrdersList({ userId: (await isAuthenticated())?.user.id });
	if (orders === void 0) throw notFound();
	return orders.map((o) => {
		return {
			...o,
			products: o.products
		};
	});
});
var getOrderServerFn_createServerFn_handler = createServerRpc({
	id: "e7c5210c088e840540d2b74578ae3e8758867c0247b7bbf69e2cc141950e85b2",
	name: "getOrderServerFn",
	filename: "src/features/order/server/order.ts"
}, (opts) => getOrderServerFn.__executeServer(opts));
var getOrderServerFn = createServerFn().validator(orderIdSchema).handler(getOrderServerFn_createServerFn_handler, async ({ data }) => {
	await isAuthenticated();
	const order = await getOrder({ orderId: data.orderId });
	if (order === void 0) throw notFound();
	return {
		...order,
		products: order.products
	};
});
//#endregion
export { getOrderListServerFn_createServerFn_handler, getOrderServerFn_createServerFn_handler };
