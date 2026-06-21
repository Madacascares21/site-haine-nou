import { n as createServerFn } from "../server.js";
import { i as createSsrRpc } from "./auth.functions-DNA-k0RN.js";
import { n as orderFieldsSchema, t as checkoutSchema } from "./schema-DMuWdX5T.js";
import { n as formatPrice, r as getStrapiMedia, t as cn } from "./utils-CD9uFQ8X.js";
import { t as Button } from "./button-wioQ1hvF.js";
import { t as useCartStore } from "./store-Bb9j5aDn.js";
import { t as useCartProducts } from "./hook-DNBNQI6u.js";
import { t as Separator$1 } from "./separator-Biude87M.js";
import { r as FieldError, s as Input } from "./field-BTpxeqXh.js";
import { t as Label$1 } from "./label-DyfYK2DG.js";
import "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CircleIcon, CreditCard, ImageOff, Loader2, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup } from "radix-ui";
import { useForm } from "@tanstack/react-form";
//#region src/features/checkout/components/order-summary.tsx
function OrderSummary() {
	const { items, productResults, isLoading } = useCartProducts();
	const subtotal = items.reduce((sum, item, index) => {
		const product = productResults[index]?.data?.products_connection?.nodes[0];
		if (!((product?.variants_connection?.nodes[0])?.available ?? true)) return sum;
		return sum + (product?.pricing?.final_price ?? 0) * item.quantity;
	}, 0);
	const shipping = subtotal > 0 && subtotal >= 150 ? 0 : 24.99;
	const total = subtotal + shipping;
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border border-border bg-card p-6 relative overflow-hidden",
		children: [
			isLoading && /* @__PURE__ */ jsx("div", {
				className: "absolute top-4 right-4 animate-spin text-muted-foreground",
				children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "text-lg font-semibold text-card-foreground",
				children: "Comanda ta"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					items.length,
					" ",
					items.length === 1 ? "produs" : "produse"
				]
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "mt-6 flex flex-col gap-5",
				children: items.map((item, index) => {
					const queryResult = productResults[index];
					const serverData = queryResult?.data;
					const isLoading = queryResult?.isLoading;
					const product = serverData?.products_connection?.nodes[0];
					const variant = product?.variants_connection?.nodes[0];
					const productName = product?.name || "Se încarcă produsul...";
					const imageUrl = variant?.media[0]?.url;
					const finalPrice = product?.pricing?.final_price ?? 0;
					const originalPrice = product?.pricing?.original_price ?? 0;
					const isAvailable = variant?.available ?? true;
					return /* @__PURE__ */ jsxs("li", {
						className: `flex gap-4 transition-all relative ${!isAvailable ? "opacity-50 grayscale-[30%]" : ""}`,
						children: [
							isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center z-10" }),
							/* @__PURE__ */ jsx("div", {
								className: "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted flex items-center justify-center",
								children: imageUrl ? /* @__PURE__ */ jsx("img", {
									src: getStrapiMedia(imageUrl),
									alt: productName,
									sizes: "80px",
									className: "object-cover h-full w-full"
								}) : /* @__PURE__ */ jsx(ImageOff, { className: "h-4 w-4 text-muted-foreground/60" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ jsx("p", {
											className: "truncate text-sm font-medium text-card-foreground",
											children: productName
										}), !isAvailable && !isLoading && /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 shrink-0 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive",
											children: [/* @__PURE__ */ jsx(AlertCircle, { className: "h-2.5 w-2.5" }), "Indisponibil"]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
										children: [
											variant?.color?.color_code && /* @__PURE__ */ jsx("span", {
												className: "inline-block h-3 w-3 rounded-full border border-border",
												style: { backgroundColor: variant.color.color_code },
												"aria-hidden": "true"
											}),
											variant?.color?.name && /* @__PURE__ */ jsx("span", {
												className: "capitalize",
												children: variant.color.name
											}),
											/* @__PURE__ */ jsx("span", {
												"aria-hidden": "true",
												children: "·"
											}),
											/* @__PURE__ */ jsxs("span", { children: ["Mărime ", variant?.size?.name || "N/A"] })
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-auto flex items-center justify-between pt-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex items-center",
											children: /* @__PURE__ */ jsxs("span", {
												className: "px-2 py-0.5 text-xs font-medium border rounded-md bg-background text-muted-foreground",
												children: [
													item.quantity,
													" ",
													/* @__PURE__ */ jsx("span", {
														className: "text-[10px]",
														children: "x"
													})
												]
											})
										}), /* @__PURE__ */ jsxs("div", {
											className: "text-right",
											children: [isAvailable && originalPrice > finalPrice && /* @__PURE__ */ jsx("span", {
												className: "mr-2 text-xs text-muted-foreground line-through",
												children: formatPrice(originalPrice * item.quantity)
											}), /* @__PURE__ */ jsx("span", {
												className: `text-sm font-semibold ${!isAvailable ? "line-through text-muted-foreground/60" : "text-card-foreground"}`,
												children: formatPrice(finalPrice * item.quantity)
											})]
										})]
									})
								]
							})
						]
					}, `${item.productId}-${item.variantId}`);
				})
			}),
			items.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "py-8 text-center text-sm text-muted-foreground",
				children: "Coșul tău este gol."
			}),
			/* @__PURE__ */ jsx(Separator$1, { className: "my-6" }),
			/* @__PURE__ */ jsxs("dl", {
				className: "flex flex-col gap-3 text-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Subtotal"
					}), /* @__PURE__ */ jsx("dd", {
						className: "font-medium text-card-foreground",
						children: formatPrice(subtotal)
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Livrare"
					}), /* @__PURE__ */ jsx("dd", {
						className: "font-medium text-card-foreground",
						children: shipping === 0 ? "Gratuit" : formatPrice(shipping)
					})]
				})]
			}),
			/* @__PURE__ */ jsx(Separator$1, { className: "my-6" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-base font-semibold text-card-foreground",
					children: "Total"
				}), /* @__PURE__ */ jsx("span", {
					className: "text-xl font-bold text-card-foreground",
					children: formatPrice(total)
				})]
			})
		]
	});
}
//#endregion
//#region src/components/ui/radio-group.tsx
function RadioGroup$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(RadioGroup.Root, {
		"data-slot": "radio-group",
		className: cn("grid gap-3", className),
		...props
	});
}
function RadioGroupItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(RadioGroup.Item, {
		"data-slot": "radio-group-item",
		className: cn("aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40", className),
		...props,
		children: /* @__PURE__ */ jsx(RadioGroup.Indicator, {
			"data-slot": "radio-group-indicator",
			className: "relative flex items-center justify-center",
			children: /* @__PURE__ */ jsx(CircleIcon, { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" })
		})
	});
}
//#endregion
//#region src/features/checkout/server/checkout.ts
var createOrderServerFn = createServerFn({ method: "POST" }).validator(orderFieldsSchema).handler(createSsrRpc("8c801c6e7f19e976f6d9810e98c2e7ad8b2015e92eab0286851dc2f4e9da39a9"));
//#endregion
//#region src/features/checkout/components/checkout-form.tsx
var shippingOptions = [{
	id: "standard",
	label: "Livrare standard",
	description: "2-4 zile lucrătoare",
	price: 19.99
}, {
	id: "free",
	label: "Ridicare personala",
	description: "Disponibil azi",
	price: 0
}];
function CheckoutForm() {
	const navigate = useNavigate();
	const { items } = useCartStore();
	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			city: "",
			zip: "",
			shippingMethod: "standard",
			payment: "ramburs"
		},
		validators: { onSubmit: checkoutSchema },
		onSubmit: async ({ value }) => {
			const response = await createOrderServerFn({ data: {
				...value,
				cartItems: items
			} });
			if (response.success) {
				toast.success(response.message);
				navigate({
					to: "/",
					reloadDocument: true
				});
			} else {
				toast.error(response.message);
				throw new Error(response.message);
			}
		}
	});
	return /* @__PURE__ */ jsx(form.Subscribe, {
		selector: (state) => state.isSubmitted,
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: (e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			},
			className: "flex flex-col gap-8",
			children: [
				/* @__PURE__ */ jsxs("section", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-semibold text-card-foreground",
						children: "Contact"
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsx(form.Field, {
								name: "firstName",
								children: (field) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label$1, {
											htmlFor: field.name,
											children: "Prenume"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value)
										}),
										field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
									]
								})
							}), /* @__PURE__ */ jsx(form.Field, {
								name: "lastName",
								children: (field) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label$1, {
											htmlFor: field.name,
											children: "Nume"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value)
										}),
										field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
									]
								})
							})]
						}), /* @__PURE__ */ jsx(form.Field, {
							name: "phone",
							children: (field) => /* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label$1, {
										htmlFor: field.name,
										children: "Telefon"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: field.name,
										type: "tel",
										placeholder: "07xx xxx xxx",
										value: field.state.value,
										onBlur: field.handleBlur,
										onChange: (e) => field.handleChange(e.target.value)
									}),
									field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
								]
							})
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-semibold text-card-foreground",
						children: "Adresă de livrare"
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid gap-4",
						children: [/* @__PURE__ */ jsx(form.Field, {
							name: "address",
							children: (field) => /* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label$1, {
										htmlFor: field.name,
										children: "Adresă"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: field.name,
										placeholder: "Stradă, număr",
										value: field.state.value,
										onBlur: field.handleBlur,
										onChange: (e) => field.handleChange(e.target.value)
									}),
									field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
								]
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [/* @__PURE__ */ jsx(form.Field, {
								name: "city",
								children: (field) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-2 sm:col-span-2",
									children: [
										/* @__PURE__ */ jsx(Label$1, {
											htmlFor: field.name,
											children: "Oraș"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value)
										}),
										field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
									]
								})
							}), /* @__PURE__ */ jsx(form.Field, {
								name: "zip",
								children: (field) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label$1, {
											htmlFor: field.name,
											children: "Cod poștal"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: field.name,
											value: field.state.value,
											onBlur: field.handleBlur,
											onChange: (e) => field.handleChange(e.target.value)
										}),
										field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
									]
								})
							})]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Truck, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-card-foreground",
							children: "Metodă de livrare"
						})]
					}), /* @__PURE__ */ jsx(form.Field, {
						name: "shippingMethod",
						children: (field) => /* @__PURE__ */ jsx(RadioGroup$1, {
							value: field.state.value,
							onValueChange: (value) => field.handleChange(value),
							className: "mt-4 grid gap-3",
							children: shippingOptions.map((option) => /* @__PURE__ */ jsxs(Label$1, {
								htmlFor: `ship-${option.id}`,
								className: "flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 transition-colors has-checked:border-primary has-checked:bg-accent",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(RadioGroupItem, {
										id: `ship-${option.id}`,
										value: option.id
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-card-foreground",
										children: option.label
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: option.description
									})] })]
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm font-semibold text-card-foreground",
									children: option.price === 0 ? "Gratuit" : `${option.price.toFixed(2)} RON`
								})]
							}, option.id))
						})
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-card-foreground",
							children: "Plată"
						})]
					}), /* @__PURE__ */ jsx(form.Field, {
						name: "payment",
						children: (field) => /* @__PURE__ */ jsx(RadioGroup$1, {
							value: field.state.value,
							onValueChange: (value) => field.handleChange(value),
							className: "mt-4 grid gap-3",
							children: /* @__PURE__ */ jsxs(Label$1, {
								htmlFor: "pay-ramburs",
								className: "flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors has-checked:border-primary has-checked:bg-accent",
								children: [/* @__PURE__ */ jsx(RadioGroupItem, {
									id: "pay-ramburs",
									value: "ramburs"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium text-card-foreground",
									children: "Ramburs la livrare"
								})]
							})
						})
					})]
				}),
				/* @__PURE__ */ jsx(form.Subscribe, {
					selector: (state) => [state.canSubmit, state.isSubmitting],
					children: ([canSubmit, isSubmitting]) => /* @__PURE__ */ jsx(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: !canSubmit || isSubmitting,
						children: isSubmitting ? "Se trimite..." : "Plasează comanda"
					})
				})
			]
		})
	});
}
//#endregion
//#region src/features/checkout/components/checkout-page.tsx
function CheckoutPage() {
	return /* @__PURE__ */ jsxs("main", {
		className: "bg-background z-30",
		children: [/* @__PURE__ */ jsx("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-6xl items-center gap-2 px-4 py-5",
				children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5 text-foreground" }), /* @__PURE__ */ jsx("span", {
					className: "text-base font-semibold text-foreground",
					children: "Finalizare comandă"
				})]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-8 lg:grid-cols-[1fr_400px]",
				children: [/* @__PURE__ */ jsx("div", {
					className: "order-2 lg:order-1",
					children: /* @__PURE__ */ jsx(CheckoutForm, {})
				}), /* @__PURE__ */ jsx("aside", {
					className: "order-1 lg:order-2 lg:sticky lg:top-8 lg:self-start",
					children: /* @__PURE__ */ jsx(OrderSummary, {})
				})]
			})
		})]
	});
}
//#endregion
//#region src/routes/checkout/index.tsx?tsr-split=component
var SplitComponent = CheckoutPage;
//#endregion
export { SplitComponent as component };
