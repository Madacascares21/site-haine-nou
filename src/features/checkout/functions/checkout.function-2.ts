import { db } from "#/db";
import { cartItems, order } from "#/db/schema";
import { batchProductsServerFn } from "#/features/Products/functions/product.function";
import { getSession } from "#/lib/auth.functions";
import { eq } from "drizzle-orm";
import type { OrderFields } from "../type";
import ClientOrderEmail, { type OrderItemType } from "../components/order-email-template"
// import { createElement } from 'react';
import { sendEmail } from "#/lib/nodemailer";
import { render } from "@react-email/components";
import type { ReactNode } from "react";
import { site } from "#/features/header/constant";
import AdminOrderEmail from "../components/admin-email-tamplate";
export const createOrder = async (data: OrderFields) => {


    const session = await getSession()
    if (!session) {
        throw new Error("User not authenticated");
    }


    // const rawProducts = await Promise.all(
    //     data.cartItems.map(async (item) => {
    //         const res = await batchProductsServerFn({
    //             data: { items:item }
    //         })

    //         const { variants_connection, ...product } = res.products_connection.nodes[0]

    //         return {
    //             product,
    //             variant: variants_connection.nodes[0],
    //             quantity: item.quantity
    //         }
    //     })
    // )

    const getProducts = async () => {

        const items = data.cartItems.map((item) => {
            const { quantity, ...rest } = item
            return rest
        })
        const res = await batchProductsServerFn({
            data: { items }

        })
        return data.cartItems.map((item) => {
            const product = res.products_connection.nodes.filter((a) => a.documentId === item.productId)[0]
            const variant = product.variants_connection.nodes.filter((a) => a.documentId === item.variantId)[0]
            return {
                product,
                variant,
                quantity: item.quantity
            }

        })

    }
    const rawProducts = await getProducts()



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


    const clientEmailHtml = await render(ClientOrderEmail({
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

    const info = await sendEmail({
        subject: " Comanda ta a fost inregistrata cu success",
        text: "d",
        to: session.user.email,
        html: clientEmailHtml
    })
    const adminEmailHtml = await render(AdminOrderEmail({
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
        subject: " O noua comanda a fost inregistrata",
        text: "d",
        to: "gd69435@gmail.com",
        html: adminEmailHtml
    })

    return newOrder;


}