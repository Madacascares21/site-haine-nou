import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { a as strapi, r as GET_PRODUCT_BY_DOCUMENT_ID, t as GET_CARD_PRODUCTS } from "./product.query-WRJikMRw.js";
import { t as sortByOptionArray } from "./constants-BaiN9-he.js";
import z from "zod";
//#region src/features/Products/functions/product.function.ts?tss-serverfn-split
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
var documentIdToProductsSchema = z.object({
	productId: z.string(),
	variantId: z.string()
});
var documentIdToProductsServerFn_createServerFn_handler = createServerRpc({
	id: "82966c0d475691f8f23fec56750292f6849d583a4f2d482f7f01ca7187684364",
	name: "documentIdToProductsServerFn",
	filename: "src/features/Products/functions/product.function.ts"
}, (opts) => documentIdToProductsServerFn.__executeServer(opts));
var documentIdToProductsServerFn = createServerFn().validator(documentIdToProductsSchema).handler(documentIdToProductsServerFn_createServerFn_handler, async ({ data }) => {
	const variables = {
		productId: data.productId,
		variantId: data.variantId
	};
	return await strapi.request(GET_PRODUCT_BY_DOCUMENT_ID, variables);
});
//#endregion
export { bestPriceServerFunc_createServerFn_handler, documentIdToProductsServerFn_createServerFn_handler, featuredProductsServerFunc_createServerFn_handler, getProductsServerFunc_createServerFn_handler };
