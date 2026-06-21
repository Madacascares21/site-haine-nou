import { i as order, n as cartItems, t as db } from "./db-DJhDWXFv.js";
import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { n as getSession } from "./auth.functions-DNA-k0RN.js";
import { n as orderFieldsSchema } from "./schema-DMuWdX5T.js";
import { n as documentIdToProductsServerFn } from "./product.function-e3JbASGV.js";
import { eq } from "drizzle-orm";
//#region src/features/checkout/functions/checkout.function-2.ts
var createOrder = async (data) => {
	const session = await getSession();
	if (!session) throw new Error("User not authenticated");
	const rawProducts = await Promise.all(data.cartItems.map(async (item) => {
		const { variants_connection, ...product } = (await documentIdToProductsServerFn({ data: {
			productId: item.productId,
			variantId: item.variantId
		} })).products_connection.nodes[0];
		return {
			product,
			variant: variants_connection.nodes[0],
			quantity: item.quantity
		};
	}));
	const subtotal = rawProducts.reduce((acc, item) => {
		return acc + parseFloat(Number(item.product.pricing.final_price).toFixed(2)) * item.quantity;
	}, 0);
	const itemsInJSON = JSON.stringify(rawProducts);
	const [newOrder] = await db.insert(order).values({
		userId: session.user.id ?? null,
		email: session.user.email,
		firstName: data.firstName,
		lastName: data.lastName,
		phone: data.phone,
		address: data.address,
		city: data.city,
		zip: data.zip,
		shippingMethod: data.shippingMethod,
		paymentMethod: data.payment,
		products: itemsInJSON,
		total: String(subtotal)
	}).returning();
	await db.delete(cartItems).where(eq(cartItems.userId, session.user.id));
	return newOrder;
};
//#endregion
//#region src/features/checkout/server/checkout.ts?tss-serverfn-split
var createOrderServerFn_createServerFn_handler = createServerRpc({
	id: "8c801c6e7f19e976f6d9810e98c2e7ad8b2015e92eab0286851dc2f4e9da39a9",
	name: "createOrderServerFn",
	filename: "src/features/checkout/server/checkout.ts"
}, (opts) => createOrderServerFn.__executeServer(opts));
var createOrderServerFn = createServerFn({ method: "POST" }).validator(orderFieldsSchema).handler(createOrderServerFn_createServerFn_handler, async ({ data }) => {
	try {
		await createOrder(data);
		return {
			success: true,
			message: "Order created successfully!"
		};
	} catch (error) {
		if (error instanceof Error) return {
			success: false,
			message: error.message
		};
		console.log(error);
		return {
			success: false,
			message: "Failed to create order."
		};
	}
});
//#endregion
export { createOrderServerFn_createServerFn_handler };
