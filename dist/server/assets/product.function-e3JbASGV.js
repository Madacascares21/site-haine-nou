import { n as createServerFn } from "../server.js";
import { a as strapi, i as GET_PRODUCT_BY_SLUG } from "./product.query-WRJikMRw.js";
import { i as createSsrRpc } from "./auth.functions-DNA-k0RN.js";
import z from "zod";
//#region src/features/Products/functions/product.function.ts
var getProductsServerFunc = createServerFn().handler(createSsrRpc("d8547aa630dbccd79f984ada75379e704de686d39b5d49a84e2b5dade2ec0983"));
var featuredProductsServerFunc = createServerFn().handler(createSsrRpc("f3a5bc0aa1a631ea7d20ff4385c584e39d8c57900fa06e2de997b330a6704432"));
var bestPriceServerFunc = createServerFn().handler(createSsrRpc("71baef3308fabf9f2c8f5a1374bed922483a7042088a9ab3bca2d59a19cce5fe"));
var documentIdToProductsSchema = z.object({
	productId: z.string(),
	variantId: z.string()
});
var documentIdToProductsServerFn = createServerFn().validator(documentIdToProductsSchema).handler(createSsrRpc("82966c0d475691f8f23fec56750292f6849d583a4f2d482f7f01ca7187684364"));
var getProductBySlug = async (slug) => {
	const variables = { slug };
	return await strapi.request(GET_PRODUCT_BY_SLUG, variables);
};
//#endregion
export { getProductsServerFunc as a, getProductBySlug as i, documentIdToProductsServerFn as n, featuredProductsServerFunc as r, bestPriceServerFunc as t };
