import z from "zod";

export const userIdSchema = z.object({
    userId: z.string()
})
export const orderIdSchema = z.object({
    orderId: z.number()
})

export const orderSearchSchema = z.object({
    id: z.coerce.string()
})

export type UserIdSchemaType = z.infer<typeof userIdSchema>

export type OrderSearchSchemaType = z.infer<typeof orderSearchSchema>


export type OrderIdSchemaType = z.infer<typeof orderIdSchema>