import { db } from "#/db";
import { cartItems, order } from "#/db/schema";
import { batchProductsServerFn } from "#/features/Products/functions/product.function";
import { getSession } from "#/lib/auth.functions";
import { eq } from "drizzle-orm";
import ClientOrderEmail, { type OrderItemType } from "../components/order-email-template";
import type { OrderFields } from "../type";
// import { createElement } from 'react';
import { site } from "#/features/header/constant";
import { updateVariantQTY } from "#/features/Products/graphql/product.query";
import { sendResendEmail } from "#/lib/sendResendEmail";
import { strapi } from "#/lib/strapi";
import { render } from "@react-email/components";
import AdminOrderEmail from "../components/admin-email-tamplate";
export const createOrder = async (data: OrderFields) => {


    const session = await getSession()
    if (!session) {
        throw new Error("User not authenticated");
    }

    const getProducts = async () => {
        const res = await batchProductsServerFn({
            data: { items: data.cartItems }
        });

        const products = await Promise.all(
            data.cartItems.map(async (item) => {
                const product = res.products_connection.nodes.find(
                    (a) => a.documentId === item.productId
                );

                const variant = product?.variants_connection.nodes.find(
                    (a) => a.documentId === item.variantId
                );

                if (!product || !variant) {
                    throw new Error("Product or variant not found");
                }

                const newQty = variant.qty - item.quantity;

                if (newQty < 0 || undefined) {
                    throw Error("Unul dintre produse nu este disponibil!")
                }

                await strapi.request(updateVariantQTY, {
                    documentId: item.variantId,
                    qty: newQty
                });

                return {
                    product,
                    variant,
                    quantity: item.quantity
                };
            })
        );

        return products;
    };
    const rawProducts = await getProducts()


    const subtotal = rawProducts.reduce((acc, item) => {
        const price = Number(item.product.pricing.final_price);
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

    sendResendEmail({
        data: {
            subject: " Comanda ta a fost inregistrata cu success",
            from: "Auxload Store <store@auxload-store.ro>",
            to: session.user.email,
            html: clientEmailHtml
        }
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
    await sendResendEmail({
        data: {
            subject: " O noua comanda a fost inregistrata",
            from: "Auxload Store <store@auxload-store.ro>",
            to: "gd69435@gmail.com",
            html: adminEmailHtml
        }
    })

    return newOrder;


}