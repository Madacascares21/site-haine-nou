import { c as createServerFn } from '../virtual/entry.mjs';
import { c as createServerRpc } from './createServerRpc-TRTdhlJ7.mjs';
import { s as strapi, G as GET_CARD_PRODUCTS, a as GET_BATCH_PRODUCTS_QUERY } from './product.query-BBHo8rfv.mjs';
import { s as sortByOptionArray } from './constants-BaiN9-he.mjs';
import z$2__default from 'zod';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'drizzle-orm';
import 'drizzle-orm/pg-core';
import 'drizzle-orm/node-postgres';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import '@tanstack/react-router/ssr/server';
import 'node:async_hooks';
import 'node:stream';
import 'graphql-request';

var getProductsServerFunc_createServerFn_handler = createServerRpc({
  id: "d8547aa630dbccd79f984ada75379e704de686d39b5d49a84e2b5dade2ec0983",
  name: "getProductsServerFunc",
  filename: "src/features/Products/functions/product.function.ts"
}, (opts) => getProductsServerFunc.__executeServer(opts));
var getProductsServerFunc = createServerFn().handler(getProductsServerFunc_createServerFn_handler, async ({}) => {
  const variables = { sortBy: sortByOptionArray.filter((opt) => opt.name === "new-products")[0].value };
  return await strapi.request(GET_CARD_PRODUCTS, variables);
});
var featuredProductsServerFunc_createServerFn_handler = createServerRpc({
  id: "f3a5bc0aa1a631ea7d20ff4385c584e39d8c57900fa06e2de997b330a6704432",
  name: "featuredProductsServerFunc",
  filename: "src/features/Products/functions/product.function.ts"
}, (opts) => featuredProductsServerFunc.__executeServer(opts));
var featuredProductsServerFunc = createServerFn().handler(featuredProductsServerFunc_createServerFn_handler, async ({}) => {
  return await strapi.request(GET_CARD_PRODUCTS, { subCategory: "featured" });
});
var bestPriceServerFunc_createServerFn_handler = createServerRpc({
  id: "71baef3308fabf9f2c8f5a1374bed922483a7042088a9ab3bca2d59a19cce5fe",
  name: "bestPriceServerFunc",
  filename: "src/features/Products/functions/product.function.ts"
}, (opts) => bestPriceServerFunc.__executeServer(opts));
var bestPriceServerFunc = createServerFn().handler(bestPriceServerFunc_createServerFn_handler, async ({}) => {
  const variables = {
    sortBy: sortByOptionArray.filter((opt) => opt.name === "price-asc")[0].value,
    subCategory: "promotii"
  };
  return await strapi.request(GET_CARD_PRODUCTS, variables);
});
z$2__default.object({
  productId: z$2__default.string(),
  variantId: z$2__default.string()
});
var batchProductsSchema = z$2__default.object({ items: z$2__default.array(z$2__default.object({
  productId: z$2__default.string(),
  variantId: z$2__default.string(),
  quantity: z$2__default.number().min(0)
})) });
var batchProductsServerFn_createServerFn_handler = createServerRpc({
  id: "360c5d5d88b79902f98c66b2da2e925061bf87a8dc8e461b85a4b5d269a96b6c",
  name: "batchProductsServerFn",
  filename: "src/features/Products/functions/product.function.ts"
}, (opts) => batchProductsServerFn.__executeServer(opts));
var batchProductsServerFn = createServerFn().validator(batchProductsSchema).handler(batchProductsServerFn_createServerFn_handler, async ({ data }) => {
  const variables = {
    productIds: data.items.map((item) => item.productId),
    variantIds: data.items.map((item) => item.variantId).filter((id) => !!id)
  };
  return await strapi.request(GET_BATCH_PRODUCTS_QUERY, variables);
});

export { batchProductsServerFn_createServerFn_handler, bestPriceServerFunc_createServerFn_handler, featuredProductsServerFunc_createServerFn_handler, getProductsServerFunc_createServerFn_handler };
//# sourceMappingURL=product.function-BCIZ1re2.mjs.map
