import { c as createServerFn, d as db, o as order } from '../virtual/entry.mjs';
import { c as createServerRpc } from './createServerRpc-TRTdhlJ7.mjs';
import { r as requireAuth, e as ensureSession } from './auth.functions-CXVcUiC-.mjs';
import { o as orderIdSchema } from './schema-DNbTVeE0.mjs';
import { notFound } from '@tanstack/react-router';
import { eq, desc } from 'drizzle-orm';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'drizzle-orm/pg-core';
import 'drizzle-orm/node-postgres';
import 'react/jsx-runtime';
import '@tanstack/react-router/ssr/server';
import 'node:async_hooks';
import 'node:stream';
import 'zod';

var getOrdersList = async ({ userId }) => {
  const userOrders = await db.select().from(order).where(eq(order.userId, userId)).orderBy(desc(order.createdAt));
  if (userOrders.length === 0) return;
  return userOrders;
};
var getOrder = async ({ orderId }) => {
  const session = await ensureSession();
  const userOrder = await db.query.order.findFirst({ where: (order2, { and, eq: eq2 }) => and(eq2(order2.id, orderId), eq2(order2.userId, session.user.id)) });
  if (!userOrder) return;
  return userOrder;
};
var getOrderListServerFn_createServerFn_handler = createServerRpc({
  id: "c671e96b1f14cdb8d686a520ba822d1b8a905b8a88e4d5d0dd594c1b18dd85ee",
  name: "getOrderListServerFn",
  filename: "src/features/order/server/order.ts"
}, (opts) => getOrderListServerFn.__executeServer(opts));
var getOrderListServerFn = createServerFn().handler(getOrderListServerFn_createServerFn_handler, async () => {
  const orders = await getOrdersList({ userId: (await requireAuth())?.user.id });
  if (orders === void 0) throw notFound();
  return orders.map((o) => {
    return {
      ...o,
      products: o.products
    };
  });
});
var getOrderServerFn_createServerFn_handler = createServerRpc({
  id: "e7c5210c088e840540d2b74578ae3e8758867c0247b7bbf69e2cc141950e85b2",
  name: "getOrderServerFn",
  filename: "src/features/order/server/order.ts"
}, (opts) => getOrderServerFn.__executeServer(opts));
var getOrderServerFn = createServerFn().validator(orderIdSchema).handler(getOrderServerFn_createServerFn_handler, async ({ data }) => {
  await requireAuth();
  const order2 = await getOrder({ orderId: data.orderId });
  if (order2 === void 0) throw notFound();
  return {
    ...order2,
    products: order2.products
  };
});

export { getOrderListServerFn_createServerFn_handler, getOrderServerFn_createServerFn_handler };
//# sourceMappingURL=order-DKl7iD4v.mjs.map
