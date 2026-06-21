import z from "zod";
z.object({ userId: z.string() });
var orderIdSchema = z.object({ orderId: z.number() });
z.object({ id: z.coerce.string() });
//#endregion
export { orderIdSchema as t };
