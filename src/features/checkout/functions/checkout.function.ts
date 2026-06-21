import { db } from "#/db";
import { orderItems, orders } from "#/db/schema";
import { GET_PRODUCT_BY_DOCUMENTID } from "#/features/Products/graphql/product.query";
import type { Product, ProductVariant } from "#/features/Products/type";
import { strapi } from "#/lib/strapi";
import { createServerFn } from "@tanstack/react-start";
import { serverOrderFormSchema, type ServerOrderFormSchema } from "../schema";
import { getSession } from "#/lib/auth.functions";
import { sentOrderEmail } from "./email.function";
interface CreateOrderProps extends ServerOrderFormSchema {
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined | undefined;
    }
};




export const createOrderServerFunc = createServerFn().validator(serverOrderFormSchema).handler(async ({ data }) => {



    const session = await getSession()
    // This runs only on the server
    // await createOrderWithProducts({
    //     adresa_1: data.adresa_1,
    //     adresa_2: data.adresa_2,
    //     judet: data.judet,
    //     localitate: data.localitate,
    //     nume: data.nume,
    //     payment: data.payment,
    //     phoneNumber: data.phoneNumber,
    //     prenume: data.prenume,
    //     zipCode: data.zipCode,
    //     products: data.products,
    //     user: session?.user!
    // })
    const values = data

    try {
        const subtotal = await Promise.all(
            values.products.map(async p => {
                const products = await getProductByDocumentId(p.variantId, p.productId, p.quantity)

                return { price: products.products_connection.nodes[0].pricing.final_price * p.quantity }
            })
        ).then(res => res.reduce((acc, curr) => acc + curr.price, 0));

        const shipping = 0;

        const [newOrder] = await db
            .insert(orders)
            .values({
                userId: session?.user.id!,
                adresa_1: values.adresa_1,
                currency: "RON",
                email: session?.user.email!,
                judet: values.judet,
                localitate: values.localitate,
                nume: values.nume,
                payment: values.payment,
                phoneNumber: values.phoneNumber,
                prenume: values.prenume,
                shipping: String(shipping),
                subtotal: String(subtotal),
                total: String(shipping + subtotal),
                zipCode: values.zipCode,
                adresa_2: values.adresa_2 || "",
                status: "pending",
            })
            .returning({ id: orders.id, createdAt: orders.createdAt, email: orders.email });

        const orderItemsData = values.products.map((p) => ({
            orderId: newOrder.id,
            strapiProductId: p.productId,
            strapiVariantId: p.variantId ?? "default",
            quantity: p.quantity,
        }));

        await db.insert(orderItems).values(orderItemsData);
        const emailValues = {
            customerEmail: session?.user.email,
            adresa_1: values.adresa_1,
            judet: values.judet,
            localitate: values.localitate,
            nume: values.nume,
            payment: values.payment,
            phoneNumber: values.phoneNumber,
            prenume: values.prenume,
            zipCode: values.zipCode,
            adresa_2: values.adresa_2 || "",
            products: values.products,
            orderNumber: String(newOrder.id),
            subtotal: subtotal,
            shipping: shipping,
            tax: 0,
            total: shipping + subtotal,
            createdAt: newOrder.createdAt?.toLocaleDateString() || "",
        }

        await sentOrderEmail({
            data: {
                adresa_1: emailValues.adresa_1,
                judet: emailValues.judet,
                localitate: emailValues.localitate,
                nume: emailValues.nume,
                payment: emailValues.payment,
                phoneNumber: emailValues.phoneNumber,
                prenume: emailValues.prenume,
                zipCode: emailValues.zipCode,
                adresa_2: emailValues.adresa_2 || "",
                products: emailValues.products,
                orderNumber: emailValues.orderNumber,
                subtotal: emailValues.subtotal,
                shipping: emailValues.shipping,
                tax: emailValues.tax,
                total: emailValues.total,
                createdAt: emailValues.createdAt,
                customerEmail: emailValues.customerEmail || ""
            }
        })
        console.log("Email sent successfully");
        return { order: newOrder, orderItems: orderItemsData };
    } catch (error) {
        console.error('Sex', error);
    }
})



export async function createOrderWithProducts(values: CreateOrderProps) {




}


// import { strapi } from "~/features/category/utils/strapi/graphql-client"
// import { GET_PRODUCT_BY_DOCUMENTID } from "~/features/category/utils/strapi/strapi-queries"
// import { ProductByDocumentIDResponseData } from "../types"


interface ProductNodesWithoutVariants extends Omit<Product, "variants"> {
    variants_connection: {
        nodes: ProductVariant[]
    }
}


export interface ProductByDocumentIDResponseData {
    products_connection: {
        nodes: ProductNodesWithoutVariants[]
    }
}



export const getProductByDocumentId = async (variantID: string, productID: string, quantity: number) => {
    const res = await strapi.request<ProductByDocumentIDResponseData>(GET_PRODUCT_BY_DOCUMENTID, { productID, variantID })
    return { orderQuantity: quantity, ...res }
}