import { isAuthenticated } from "#/lib/auth.functions";
import { createServerFn } from "@tanstack/react-start";
import { getOrder, getOrdersList } from "../function/order.function";
import { orderIdSchema } from "../schema";
import { notFound } from "@tanstack/react-router";
import type { CartItemSchemaType, OrderCartItemSchemaType } from "#/features/cart/schema";


export const getOrderListServerFn = createServerFn().handler(async () => {
    const session = await isAuthenticated()

    const orders = await getOrdersList({ userId: session?.user.id! })

    if (orders === undefined) {
        throw notFound()
    }

    return orders.map((o) => {
        return {
            ...o, products: o.products as CartItemSchemaType[]
        }
    })
})


export const getOrderServerFn = createServerFn().validator(orderIdSchema).handler(async ({ data }) => {
    await isAuthenticated()
    const order = await getOrder({ orderId: data.orderId })

    if (order === undefined) {
        throw notFound()
    }

    return {
        ...order, products: order.products as OrderCartItemSchemaType[]
    }
})