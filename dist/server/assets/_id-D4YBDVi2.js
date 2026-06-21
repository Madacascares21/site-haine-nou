import { n as formatPrice, r as getStrapiMedia, t as cn } from "./utils-CD9uFQ8X.js";
import { t as Button } from "./button-wioQ1hvF.js";
import { t as Separator$1 } from "./separator-Biude87M.js";
import { i as CardHeader, n as CardContent, t as Card } from "./card-Bqah_F_I.js";
import "react";
import { getRouteApi } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { FileText, Info, Target } from "lucide-react";
import { Tooltip } from "radix-ui";
//#region src/components/ui/tooltip.tsx
function TooltipProvider({ delayDuration = 0, ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Provider, {
		"data-slot": "tooltip-provider",
		delayDuration,
		...props
	});
}
function Tooltip$1({ ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Root, {
		"data-slot": "tooltip",
		...props
	});
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Trigger, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Portal, { children: /* @__PURE__ */ jsxs(Tooltip.Content, {
		"data-slot": "tooltip-content",
		sideOffset,
		className: cn("z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(Tooltip.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })]
	}) });
}
//#endregion
//#region src/features/order/components/order-page.tsx
function OrderDetails() {
	const order = getRouteApi("/order/$id").useLoaderData();
	return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Card, {
		className: "w-full max-w-4xl mx-auto border-none shadow-none md:p-4 font-sans text-slate-800 bg-white",
		children: [
			/* @__PURE__ */ jsxs(CardHeader, {
				className: "px-0 pt-0 pb-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "text-xs text-slate-400 mb-3 tracking-wide",
						children: ["Home > Orders > ", /* @__PURE__ */ jsxs("span", {
							className: "text-slate-600 font-medium",
							children: ["ID ", order.id]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4",
						children: [/* @__PURE__ */ jsxs("h1", {
							className: "text-2xl md:text-3xl font-semibold tracking-tight text-slate-900",
							children: ["Order ID: ", order.id]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2.5",
							children: [/* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								className: "h-10 bg-slate-50/50 border-slate-200 text-slate-700 font-medium gap-2",
								children: [/* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-slate-400" }), "Invoice"]
							}), /* @__PURE__ */ jsxs(Button, {
								className: "h-10 bg-[#0087ff] hover:bg-[#0070d2] text-white font-medium gap-2 shadow-sm",
								children: ["Track order", /* @__PURE__ */ jsx(Target, { className: "w-4 h-4" })]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-6 mt-4 text-sm text-slate-500",
						children: [/* @__PURE__ */ jsxs("span", { children: ["Order date: ", /* @__PURE__ */ jsx("strong", {
							className: "text-slate-700 font-medium",
							children: order.createdAt.toLocaleDateString("ro-Ro")
						})] }), /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5 text-emerald-600 font-medium",
							children: [/* @__PURE__ */ jsx("span", {
								className: "inline-block transform -rotate-45",
								children: "✈"
							}), "Estimated delivery: \"nush coaie\""]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(Separator$1, { className: "bg-slate-100" }),
			/* @__PURE__ */ jsx(CardContent, {
				className: "px-0 py-6 flex flex-col gap-6",
				children: order.products.map((product) => /* @__PURE__ */ jsxs("div", {
					className: "flex gap-5 items-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl",
						children: /* @__PURE__ */ jsx("img", {
							src: getStrapiMedia(product.variant.media[0].url),
							alt: product.product.name
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center w-full",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-base font-medium text-slate-900",
							children: product.product.name
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-400 flex items-center gap-1.5 mt-1",
							children: /* @__PURE__ */ jsxs("div", {
								className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "inline-block h-3 w-3 rounded-full border border-border",
										style: { backgroundColor: product.variant.color.color_code },
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "capitalize",
										children: product.variant.color.name
									}),
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										children: "·"
									}),
									/* @__PURE__ */ jsxs("span", { children: ["Mărime ", product.variant.size.name] })
								]
							})
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "text-right",
							children: [/* @__PURE__ */ jsx("span", {
								className: "block text-base font-semibold text-slate-900",
								children: formatPrice(product.product.pricing.final_price)
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xs text-slate-400",
								children: ["Qty: ", product.quantity]
							})]
						})]
					})]
				}, product.product.documentId))
			}),
			/* @__PURE__ */ jsx(Separator$1, { className: "bg-slate-100" }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-8",
				children: [/* @__PURE__ */ jsx("div", {
					className: "md:col-span-7 flex flex-col justify-between gap-10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-semibold text-slate-900 mb-3",
							children: "Payment"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-sm text-slate-600 flex items-center gap-2",
							children: order.paymentMethod
						})] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-semibold text-slate-900 mb-3",
								children: "Delivery"
							}),
							/* @__PURE__ */ jsxs("address", {
								className: "not-italic text-sm text-slate-600 space-y-0.5 leading-relaxed",
								children: [
									order.address,
									/* @__PURE__ */ jsx("br", {}),
									order.city,
									/* @__PURE__ */ jsx("br", {}),
									order.phone
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[11px] text-slate-400 block",
									children: "Delivery method"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-slate-600 mt-0.5",
									children: order.shippingMethod
								})]
							})
						] })]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:col-span-5",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-semibold text-slate-900 mb-4",
							children: "Order Summary"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-3 text-sm text-slate-600",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ jsx("span", { children: "Subtotal" }), /* @__PURE__ */ jsx("span", {
										className: "text-slate-900 font-medium",
										children: order.total
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: ["Delivery", /* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
											asChild: true,
											children: /* @__PURE__ */ jsx(Info, { className: "w-3.5 h-3.5 text-slate-300 cursor-help" })
										}), /* @__PURE__ */ jsx(TooltipContent, { children: "Standard shipping calculation" })] })]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-slate-900 font-medium",
										children: "$0"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: ["Tax", /* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
											asChild: true,
											children: /* @__PURE__ */ jsx(Info, { className: "w-3.5 h-3.5 text-slate-300 cursor-help" })
										}), /* @__PURE__ */ jsx(TooltipContent, { children: "Calculated VAT/Sales Tax" })] })]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-slate-900 font-medium",
										children: "+$0"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsx(Separator$1, { className: "bg-transparent border-t border-dashed border-slate-200 my-4" }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-base font-medium text-slate-900",
								children: "Total"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-2xl font-bold tracking-tight text-slate-900",
								children: formatPrice(Number(order.total))
							})]
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
//#region src/routes/order/$id.tsx?tsr-split=component
function RouteComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "p-6",
		children: /* @__PURE__ */ jsx(OrderDetails, {})
	});
}
//#endregion
export { RouteComponent as component };
