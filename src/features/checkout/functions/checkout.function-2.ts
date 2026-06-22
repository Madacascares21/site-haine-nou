import { db } from "#/db";
import { cartItems, order } from "#/db/schema";
import { documentIdToProductsServerFn } from "#/features/Products/functions/product.function";
import { getSession } from "#/lib/auth.functions";
import { eq } from "drizzle-orm";
import type { OrderFields } from "../type";
import OrderEmail, { type OrderItemType } from "../components/order-email-template"
// import { createElement } from 'react';
import { sendEmail } from "#/lib/nodemailer";
import { render } from "@react-email/components";
import type { ReactNode } from "react";
import { site } from "#/features/header/constant";
export const createOrder = async (data: OrderFields) => {


    const session = await getSession()
    if (!session) {
        throw new Error("User not authenticated");
    }


    const rawProducts = await Promise.all(
        data.cartItems.map(async (item) => {
            const res = await documentIdToProductsServerFn({
                data: { productId: item.productId, variantId: item.variantId }
            })

            const { variants_connection, ...product } = res.products_connection.nodes[0]

            return {
                product,
                variant: variants_connection.nodes[0],
                quantity: item.quantity
            }
        })
    )

    const subtotal = rawProducts.reduce((acc, item) => {
        const price = parseFloat(Number(item.product.pricing.final_price).toFixed(2));
        return acc + price * item.quantity;
    }, 0);

    const itemsInJSON = JSON.stringify(rawProducts)

    const [newOrder] = await db
        .insert(order)
        .values({
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

            total: String(subtotal),
        })
        .returning();



    await db.delete(cartItems).where(eq(cartItems.userId, session.user.id));


    const items: OrderItemType[] = rawProducts.map((item) => {
        return {
            color: item.variant.color.name,
            id: item.variant.documentId || "",
            name: item.product.name,
            price: item.product.pricing.final_price,
            qty: item.quantity,
            size: item.variant.size.name,
            sku: item.variant.name,
            imageUrl: item.variant.media[0].url,
        }
    })


    const emailHtml = await render(OrderEmail({
        brandName: site.name,
        customerName: session.user.name,

        items: items,
        orderDate: newOrder.createdAt.toLocaleDateString(),
        orderNumber: "98",
        subtotal: subtotal,
        shippingCost: 0,
        total: subtotal,
        taxRate: 0,
        shippingAddress: {
            country: "Romania",
            line1: data.address,
            line2: data.city,
            name: session.user.name

        },
        payment: { method: data.payment, last4: "xxxx" }

    }));
    await sendEmail({
        subject: " Comanda ta a fost inregistrata cu success",
        text: "",
        to: session.user.email,
        html: emailHtml
    })



    return newOrder;


}