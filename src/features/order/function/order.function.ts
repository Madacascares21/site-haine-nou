import { db } from "#/db"
import { order } from "#/db/schema"
import { ensureSession } from "#/lib/auth.functions"
import { desc, eq } from "drizzle-orm"
import type { OrderIdSchemaType, UserIdSchemaType } from "../schema"

export const getOrdersList = async ({ userId }: UserIdSchemaType) => {
    const userOrders = await db.select().from(order).where(
        eq(order.userId, userId)

    ).orderBy(desc(order.createdAt));
    if (userOrders.length === 0) {
        return undefined
    }
    return userOrders
}

export const getOrder = async ({ orderId }: OrderIdSchemaType) => {
    const session = await ensureSession()
    const userOrder = await db.query.order.findFirst({
        where: (order, { and, eq }) =>
            and(
                eq(order.id, orderId),
                eq(order.userId, session.user.id)
            ),
    })

    if (!userOrder) {
        return undefined
    }
    return userOrder
}

