import { n as formatPrice, r as getStrapiMedia, t as cn } from "./utils-CD9uFQ8X.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-Bqah_F_I.js";
import "react";
import { Link, getRouteApi } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, Clock, Truck } from "lucide-react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
//#region src/components/ui/badge.tsx
var badgeVariants = cva("inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
		secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
		destructive: "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
		outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		link: "text-primary underline-offset-4 [a&]:hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant = "default", asChild = false, ...props }) {
	return /* @__PURE__ */ jsx(asChild ? Slot.Root : "span", {
		"data-slot": "badge",
		"data-variant": variant,
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region src/features/order/components/order-list-page.tsx
var statusConfigs = {
	delivered: {
		label: "Delivered",
		className: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400",
		icon: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600" })
	},
	processing: {
		label: "Processing",
		className: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400",
		icon: /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-blue-600" })
	},
	shipped: {
		label: "Shipped",
		className: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400",
		icon: /* @__PURE__ */ jsx(Truck, { className: "w-3.5 h-3.5 text-amber-600" })
	}
};
var orderRoute = getRouteApi("/order/");
function OrdersList() {
	const data = orderRoute.useLoaderData();
	console.log("heyyyyyy", data[0].products);
	return /* @__PURE__ */ jsxs("div", {
		className: "w-full max-w-4xl mx-auto font-sans text-slate-800",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "text-xs text-slate-400 mb-3 tracking-wide",
					children: ["Home > ", /* @__PURE__ */ jsx("span", {
						className: "text-slate-600 font-medium",
						children: "Orders"
					})]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl md:text-3xl font-semibold tracking-tight text-slate-900",
					children: "Your Orders"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-slate-500 mt-1",
					children: "Manage and track your recent hardware configurations and purchases."
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-4",
			children: data.map((order) => {
				const status = statusConfigs["processing"];
				return /* @__PURE__ */ jsx(Link, {
					to: "/order/$id",
					params: { id: String(order.id) },
					children: /* @__PURE__ */ jsxs(Card, {
						className: "border  border-slate-100 shadow-sm bg-white hover:border-slate-200 transition-colors",
						children: [/* @__PURE__ */ jsxs(CardHeader, {
							className: "p-6 pb-4   flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 space-y-0",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1 ",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsxs(CardTitle, {
										className: "text-base font-semibold text-slate-900",
										children: ["Order #", order.id]
									}), /* @__PURE__ */ jsxs(Badge, {
										variant: "secondary",
										className: `flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full shadow-none ${status.className}`,
										children: [status.icon, status.label]
									})]
								}), /* @__PURE__ */ jsxs(CardDescription, {
									className: "text-xs text-slate-400",
									children: ["Placed on ", order.createdAt.toLocaleDateString("ro-RO")]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "sm:text-right  ",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-slate-400 block",
									children: "Total Amount"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-lg font-bold text-slate-900",
									children: formatPrice(Number(order.total))
								})]
							})]
						}), /* @__PURE__ */ jsx(CardContent, {
							className: " flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6",
							children: /* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-3 flex-wrap",
								children: order.products.map((p, idx) => /* @__PURE__ */ jsx("div", {
									className: "w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-xl relative group",
									title: p.variant.media[0].url,
									children: /* @__PURE__ */ jsx("img", { src: getStrapiMedia(p.variant.media[0].url || "") })
								}, idx))
							})
						})]
					}, order.id)
				});
			})
		})]
	});
}
//#endregion
//#region src/routes/order/index.tsx?tsr-split=component
function RouteComponent() {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(OrdersList, {}) });
}
//#endregion
export { RouteComponent as component };
