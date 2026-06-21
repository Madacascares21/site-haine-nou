import { n as formatPrice, r as getStrapiMedia, t as cn } from "./utils-CD9uFQ8X.js";
import { useEffect, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/features/Products/components/price.tsx
var Price = ({ pricing, className }) => {
	const { final_price, original_price } = pricing;
	const hasDiscount = original_price > final_price;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("div", {
			className: cn("text-sm font-bold ", className?.price),
			children: formatPrice(final_price)
		}), hasDiscount && /* @__PURE__ */ jsx("div", {
			className: cn("text-xs text-muted-foreground line-through", className?.discount),
			children: formatPrice(original_price)
		})]
	});
};
//#endregion
//#region src/features/Products/components/product-card.tsx
function ProductCard({ product }) {
	const [variant, setVariant] = useState(product.variants[0]);
	const searchParams = useSearch({ strict: false });
	useEffect(() => {
		const colorsParam = searchParams?.colors;
		if (colorsParam) try {
			const activeColors = typeof colorsParam === "string" ? JSON.parse(colorsParam) : colorsParam;
			if (Array.isArray(activeColors) && activeColors.length > 0) {
				const matchedVariant = product.variants.find((v) => v.color?.color_code && activeColors.includes(v.color.color_code));
				if (matchedVariant) setVariant(matchedVariant);
			}
		} catch (error) {
			console.error("Failed to parse colors from search params:", error);
		}
	}, [searchParams?.colors, product.variants]);
	return /* @__PURE__ */ jsxs(Link, {
		search: { variant_name: variant.name },
		params: { slug: product.slug },
		replace: true,
		className: "group relative flex flex-col gap-3",
		to: "/product/$slug",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative aspect-4/5 w-full overflow-hidden ",
			children: [
				/* @__PURE__ */ jsx("img", {
					loading: "lazy",
					src: getStrapiMedia(variant.media[0].url),
					alt: product.name,
					className: "h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
				}),
				!variant.available && /* @__PURE__ */ jsx("div", {
					className: "absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded",
					children: "Out of Stock"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-col m-3 p-3 rounded-sm   gap-1 ml-6 absolute bottom-0 right-0",
					children: (() => {
						return product.variants.map((v) => v.color?.color_code).filter((c) => Boolean(c)).filter((color, index, self) => self.indexOf(color) === index).map((color) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onMouseEnter: () => {
								setVariant(product.variants.find((v) => v.color?.color_code === color) ?? product.variants[0]);
							},
							className: `size-4 rounded-full transition border-2 ${variant.color?.color_code === color ? "border-primary scale-110" : "border-transparent"}`,
							style: { backgroundColor: color },
							"aria-label": `Select color ${color}`
						}, color));
					})()
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm text-accent-foreground leading-tight",
				children: product.name
			}), /* @__PURE__ */ jsx(Price, { pricing: product.pricing })]
		})]
	});
}
//#endregion
export { Price as n, ProductCard as t };
