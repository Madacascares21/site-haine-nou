import { createServerFn } from "@tanstack/react-start";
import { orderFieldsSchema } from "../schema";
import { createOrder } from "../functions/checkout.function-2";

export const createOrderServerFn = createServerFn({ method: "POST" }).validator(orderFieldsSchema).handler(async ({ data }) => {


    try {
        await createOrder(data)
        return { success: true, message: "Order created successfully!" };


    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Failed to create order." };

    }
});

