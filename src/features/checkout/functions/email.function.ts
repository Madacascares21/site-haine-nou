import type z from "zod";
import type { emailFormSchema } from "../schema";
import { getProductByDocumentId } from "./checkout.function";
import { sendEmail } from "#/lib/nodemailer";
import { AdminEmail, OrderEmail } from "./email-form";
import React from "react";
import ReactDOMServer from "react-dom/server";

type ServerOrderForm = z.infer<typeof emailFormSchema>;
interface OrderItem {
    id: string
    name: string
    size: string
    color: string
    quantity: number
    price: number
    image: string
}
export interface OrderEmailProps {
    phone: string
    orderNumber: string
    orderDate: string
    customerName: string
    customerEmail: string
    shippingAddress: {
        street: string
        city: string
        state: string
        zipCode: string
        country: string
    }
    items: OrderItem[]
    subtotal: number
    shipping: number
    tax: number
    total: number
    estimatedDelivery: string
    trackingUrl?: string
}


export const sentOrderEmail = (async ({ data }: { data: ServerOrderForm }) => {
    try {

        const products = await Promise.all(data.products.map(async p => {

            const strapiProd = (await getProductByDocumentId(p.variantId, p.productId, p.quantity)).products_connection.nodes[0];




            return {
                id: strapiProd.documentId || "",
                name: strapiProd.name,
                size: strapiProd.variants_connection.nodes[0]?.size.name || "",
                color: strapiProd.variants_connection.nodes[0]?.color.color_code || "",
                quantity: p.quantity,
                price: strapiProd.pricing.final_price,
                image: strapiProd.variants_connection.nodes[0]?.media[0]?.url || ""
            }
        }))
        const orderEmailProps: OrderEmailProps = {
            customerEmail: data.customerEmail,
            phone: data.phoneNumber,
            orderDate: data.createdAt,
            orderNumber: data.orderNumber,
            shippingAddress: {
                street: data.adresa_1,
                city: data.localitate,
                state: data.judet,
                zipCode: data.zipCode,
                country: "Romania"
            },
            items: products,
            subtotal: data.subtotal,
            shipping: data.shipping,
            tax: data.tax,
            total: data.total,
            estimatedDelivery: "",
            trackingUrl: "",
            customerName: data.nume + " " + data.prenume
        }
        const clientEmail = await sendEmail({
            to: data.customerEmail,
            subject: `${data.nume}, comanda ta a fost inregistrata!`,
            text: `Comanda ${data.orderNumber}`,
            html: ReactDOMServer.renderToStaticMarkup(
                React.createElement(OrderEmail, orderEmailProps)
            ),
        });
        const adminEmail = await sendEmail({
            to: "gd69435@gmail.com",
            subject: `O noua comanda de la ${data.nume}, !`,
            text: `Comanda ${data.orderNumber}`,
            html: ReactDOMServer.renderToStaticMarkup(
                React.createElement(AdminEmail, orderEmailProps)
            ),
        });


        return { success: true, message: "Comanda plasata cu success!" };
    } catch (error) {
        console.error("Error sending order email:", error);
        throw new Error(
            error instanceof Error ? error.message : "A aparut o eroare necunoscuta."
        );
    }

})








