import { c as createServerFn } from '../virtual/entry.mjs';
import { s as strapi, b as GET_PRODUCT_BY_SLUG } from './product.query-BBHo8rfv.mjs';
import { c as createSsrRpc } from './auth.functions-CXVcUiC-.mjs';
import z$2__default from 'zod';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

var getProductsServerFunc = createServerFn().handler(createSsrRpc("d8547aa630dbccd79f984ada75379e704de686d39b5d49a84e2b5dade2ec0983"));
var featuredProductsServerFunc = createServerFn().handler(createSsrRpc("f3a5bc0aa1a631ea7d20ff4385c584e39d8c57900fa06e2de997b330a6704432"));
var bestPriceServerFunc = createServerFn().handler(createSsrRpc("71baef3308fabf9f2c8f5a1374bed922483a7042088a9ab3bca2d59a19cce5fe"));
z$2__default.object({
  productId: z$2__default.string(),
  variantId: z$2__default.string()
});
var batchProductsSchema = z$2__default.object({ items: z$2__default.array(z$2__default.object({
  productId: z$2__default.string(),
  variantId: z$2__default.string(),
  quantity: z$2__default.number().min(0)
})) });
var batchProductsServerFn = createServerFn().validator(batchProductsSchema).handler(createSsrRpc("360c5d5d88b79902f98c66b2da2e925061bf87a8dc8e461b85a4b5d269a96b6c"));
var getProductBySlug = async (slug) => {
  const variables = { slug };
  return await strapi.request(GET_PRODUCT_BY_SLUG, variables);
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var formatPrice = (value) => new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "LEI"
}).format(value);
function slugToTitle(text) {
  return text.replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
function getStrapiMedia(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url;
}

export { getProductsServerFunc as a, batchProductsServerFn as b, cn as c, featuredProductsServerFunc as d, bestPriceServerFunc as e, formatPrice as f, getStrapiMedia as g, getProductBySlug as h, slugToTitle as s };
//# sourceMappingURL=utils-D6pEwd0q.mjs.map
