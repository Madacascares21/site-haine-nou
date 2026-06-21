import { n as GET_PRODUCTS } from "./product.query-WRJikMRw.js";
import { t as sortByOptionArray } from "./constants-BaiN9-he.js";
import { i as slugToTitle, t as cn } from "./utils-CD9uFQ8X.js";
import { i as generatedData, r as site } from "./constant-BafgMehM.js";
import { n as Container, t as Skeleton } from "./skeleton-Va3ZmfLZ.js";
import "react";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { GraphQLClient } from "graphql-request";
import z from "zod";
import { XIcon } from "lucide-react";
import { Dialog } from "radix-ui";
//#region src/components/ui/sheet.tsx
function Sheet({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Root, {
		"data-slot": "sheet",
		...props
	});
}
function SheetTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Trigger, {
		"data-slot": "sheet-trigger",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Portal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Overlay, {
		"data-slot": "sheet-overlay",
		className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(Dialog.Content, {
		"data-slot": "sheet-content",
		className: cn("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500", side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm", side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm", side === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top", side === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ jsxs(Dialog.Close, {
			className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ jsx(XIcon, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sheet-header",
		className: cn("flex flex-col gap-1.5 p-4", className),
		...props
	});
}
function SheetFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sheet-footer",
		className: cn("mt-auto flex flex-col gap-2 p-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Title, {
		"data-slot": "sheet-title",
		className: cn("font-semibold text-foreground", className),
		...props
	});
}
//#endregion
//#region src/lib/seo.ts
var seo = ({ title, description, keywords, image }) => {
	return [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			name: "keywords",
			content: keywords
		},
		{
			name: "twitter:title",
			content: title
		},
		{
			name: "twitter:description",
			content: description
		},
		{
			name: "twitter:creator",
			content: "@tannerlinsley"
		},
		{
			name: "twitter:site",
			content: "@tannerlinsley"
		},
		{
			name: "og:type",
			content: "website"
		},
		{
			name: "og:title",
			content: title
		},
		{
			name: "og:description",
			content: description
		},
		...image ? [
			{
				name: "twitter:image",
				content: image
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "og:image",
				content: image
			}
		] : []
	];
};
//#endregion
//#region src/features/category/schemas/schema.ts
var filterSearchParamsSchema = z.object({
	page: z.coerce.number().catch(1),
	pageSize: z.coerce.number().catch(12),
	sortBy: z.enum([
		"alphabetical-asc",
		"alphabetical-desc",
		"price-asc",
		"price-desc",
		"new-products"
	]).catch("alphabetical-asc"),
	minPrice: z.number().min(0).catch(0),
	maxPrice: z.number().min(0).catch(1e4),
	materials: z.array(z.string()).optional(),
	colors: z.array(z.string()).optional(),
	sizes: z.array(z.string()).optional(),
	category: z.string().optional(),
	subCategory: z.string().optional()
});
var productVariantSearchParamsSchema = z.object({ variant_name: z.string().optional() });
//#endregion
//#region src/features/category/utils/strapi/graphql-client.ts
var strapi = new GraphQLClient("http://localhost:1337/graphql", { headers: { Authorization: `Bearer 91c0d46d53176ae4e8222a4e1126ff54ccb566f5716284879ebca3feecd9f7f0d2d142c7687d5fb750931edef19c6aca6902879654c8492def4e17cca27beda0476db19c7a73b2901d5db8b8ab4cfdf7bf10854b87401a70455d21f1be66f868a79f63754cda35d852a9c06539a1955c00a4c58149e1adcd537db6453017cbd7` } });
//#endregion
//#region src/features/category/utils/utils.ts
function reduceEmptyKeys(obj) {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (value !== "" && value !== void 0 && value !== null) acc[key] = value;
		return acc;
	}, {});
}
//#endregion
//#region src/features/category/server/getProducts.ts
var getProducts = async (filters) => {
	const variables = {
		page: filters.page,
		pageSize: filters.pageSize,
		sortBy: sortByOptionArray.find((option) => option.name === filters.sortBy)?.value ?? ["name:asc"],
		minPrice: filters.minPrice,
		maxPrice: filters.maxPrice,
		colors: filters.colors,
		sizes: filters.sizes,
		category: filters.category === "produse-noi" ? "" : filters.category,
		subCategory: filters.subCategory
	};
	return await strapi.request(GET_PRODUCTS, reduceEmptyKeys(variables));
};
//#endregion
//#region src/routes/c/$category.{-$subCategory}.tsx
var $$splitComponentImporter = () => import("./_category._-_subCategory_-HXBKMtR5.js");
var Route = createFileRoute("/c/$category/{-$subCategory}")({
	pendingComponent: () => /* @__PURE__ */ jsx(CategorySkeleton, {}),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: filterSearchParamsSchema,
	loaderDeps: ({ search: filters }) => filters,
	loader: async ({ params, deps: { ...filters } }) => {
		return (await getProducts({
			...filters,
			category: params.category,
			subCategory: params.subCategory
		})).products_connection;
	},
	staleTime: 1e3 * 60 * 10,
	head: ({ params }) => {
		let description = "";
		let media = "";
		const category = generatedData.categories_connection.nodes.find((c) => params.category === c.name);
		if (!category) {
			description = "";
			media = "";
		} else if (params.subCategory === void 0) {
			description = category.seo?.description ?? "";
			media = category.seo?.media.url ?? "";
		} else {
			const subCategory = category.sub_categories_connection.nodes?.find((c2) => c2.name === params.subCategory);
			description = subCategory?.seo?.description ?? "";
			media = subCategory?.seo?.media.url ?? "";
		}
		return { meta: [...seo({
			title: `${params.subCategory ? slugToTitle(params.subCategory) : slugToTitle(params.category)} | ${site.name}`,
			description,
			image: media
		})] };
	}
});
var CategorySkeleton = () => {
	return /* @__PURE__ */ jsxs(Container, {
		className: "w-full flex flex-col gap-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between items-center",
			children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-32" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-24" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex gap-8",
			children: [/* @__PURE__ */ jsx("div", {
				className: "w-56 flex flex-col gap-6",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20" }),
						/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-40" }),
						/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-36" })
					]
				}, i))
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ jsx(Skeleton, { className: "w-full h-64 rounded-xl" }),
						/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" }),
						/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" })
					]
				}, i))
			})]
		})]
	});
};
//#endregion
export { SheetContent as a, SheetTitle as c, Sheet as i, SheetTrigger as l, productVariantSearchParamsSchema as n, SheetFooter as o, seo as r, SheetHeader as s, Route as t };
