import type z from "zod";
import type { Product, ProductVariant } from "../Products/type"
import type { checkoutSchema, orderFieldsSchema } from "./schema";

export interface CartItem {
  product: Product
  variant: ProductVariant
  quantity: number
}


export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type OrderFields = z.infer<typeof orderFieldsSchema>
