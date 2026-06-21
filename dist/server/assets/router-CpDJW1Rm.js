import { n as createServerFn } from "../server.js";
import { t as auth } from "./auth-B0EeAnYu.js";
import { i as createSsrRpc, n as getSession, r as isAuthenticated } from "./auth.functions-DNA-k0RN.js";
import { i as getProductBySlug } from "./product.function-e3JbASGV.js";
import { t as orderIdSchema } from "./schema-DNbTVeE0.js";
import { a as updateUser, i as signOut, n as deleteUser, o as useSession, t as Spinner } from "./spinner-BCrpBkQY.js";
import { r as getStrapiMedia, t as cn } from "./utils-CD9uFQ8X.js";
import { n as buttonVariants, t as Button } from "./button-wioQ1hvF.js";
import { a as SheetContent, c as SheetTitle, i as Sheet, l as SheetTrigger, n as productVariantSearchParamsSchema, o as SheetFooter, r as seo, s as SheetHeader, t as Route$9 } from "./_category._-_subCategory_-CTJWeR99.js";
import { n as getCartServerFn, r as mergeCartServerFn, t as useCartStore } from "./store-Bb9j5aDn.js";
import { t as useCartProducts } from "./hook-DNBNQI6u.js";
import { n as navigationMenuTriggerStyle$1, r as site, t as navigation } from "./constant-BafgMehM.js";
import { n as Container } from "./skeleton-Va3ZmfLZ.js";
import { t as Separator$1 } from "./separator-Biude87M.js";
import { r as FieldError, s as Input } from "./field-BTpxeqXh.js";
import { t as Label$1 } from "./label-DyfYK2DG.js";
import { useEffect, useRef, useState } from "react";
import { HeadContent, Link, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, notFound, redirect, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { z as z$1 } from "zod";
import { AlertCircle, AlertTriangle, ChevronDown, ChevronDownIcon, CircleCheckIcon, Facebook, ImageOff, InfoIcon, Instagram, Loader2, Loader2Icon, LogOut, MapPin, Menu, MessageCircleHeart, Minus, OctagonXIcon, Plus, Settings, Shield, ShoppingCart, Trash2, TriangleAlertIcon, User, XIcon, Youtube } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";
import { cva } from "class-variance-authority";
import { AlertDialog, Avatar, Collapsible, Dialog, NavigationMenu, Popover, ScrollArea } from "radix-ui";
import { QueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { UTApi, createUploadthing } from "uploadthing/server";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
//#region src/styles.css?url
var styles_default = "/assets/styles-Dwkl0-78.css";
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = useTheme();
	return /* @__PURE__ */ jsx(Toaster, {
		theme,
		className: "toaster group",
		icons: {
			success: /* @__PURE__ */ jsx(CircleCheckIcon, { className: "size-4" }),
			info: /* @__PURE__ */ jsx(InfoIcon, { className: "size-4" }),
			warning: /* @__PURE__ */ jsx(TriangleAlertIcon, { className: "size-4" }),
			error: /* @__PURE__ */ jsx(OctagonXIcon, { className: "size-4" }),
			loading: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" })
		},
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)",
			"--border-radius": "var(--radius)"
		},
		...props
	});
};
//#endregion
//#region src/components/ui/scroll-area.tsx
function ScrollArea$1({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(ScrollArea.Root, {
		"data-slot": "scroll-area",
		className: cn("relative", className),
		...props,
		children: [
			/* @__PURE__ */ jsx(ScrollArea.Viewport, {
				"data-slot": "scroll-area-viewport",
				className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children
			}),
			/* @__PURE__ */ jsx(ScrollBar, {}),
			/* @__PURE__ */ jsx(ScrollArea.Corner, {})
		]
	});
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ jsx(ScrollArea.ScrollAreaScrollbar, {
		"data-slot": "scroll-area-scrollbar",
		orientation,
		className: cn("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
		...props,
		children: /* @__PURE__ */ jsx(ScrollArea.ScrollAreaThumb, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border"
		})
	});
}
//#endregion
//#region src/features/cart/components/cart-sheet.tsx
function CartSheet() {
	const { items, addItem, reduceItem, removeItem, clear, productResults, isLoading } = useCartProducts();
	const { isOpen, openCart, closeCart } = useCartStore();
	const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
	const isAnyLoading = productResults.some((result) => result.isLoading);
	const subtotal = items.reduce((sum, item, index) => {
		const product = productResults[index]?.data?.products_connection?.nodes[0];
		if (!((product?.variants_connection?.nodes[0])?.available ?? true)) return sum;
		return sum + (product?.pricing?.final_price ?? 0) * item.quantity;
	}, 0);
	const shippingCost = subtotal > 0 && subtotal < 150 ? 15 : 0;
	const estimatedTax = subtotal * .08;
	const totalCost = subtotal + shippingCost + estimatedTax;
	return /* @__PURE__ */ jsxs(Sheet, {
		open: isOpen,
		onOpenChange: (open) => {
			if (open) openCart();
			else closeCart();
		},
		children: [/* @__PURE__ */ jsx(SheetTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Button, {
				"aria-label": "Cart Button",
				variant: "ghost",
				className: "relative gap-2",
				children: [/* @__PURE__ */ jsx(ShoppingCart, { className: "h-4 w-4" }), totalQuantity > 0 && /* @__PURE__ */ jsx("span", {
					className: "absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-background",
					children: totalQuantity
				})]
			})
		}), /* @__PURE__ */ jsxs(SheetContent, {
			className: "flex flex-col w-full sm:max-w-md p-6",
			children: [
				/* @__PURE__ */ jsx(SheetHeader, {
					className: "pb-4 border-b",
					children: /* @__PURE__ */ jsxs(SheetTitle, {
						className: "flex items-center gap-2",
						children: [
							"Shopping Cart (",
							items.length,
							" ",
							items.length === 1 ? "item" : "items",
							")",
							isAnyLoading && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })
						]
					})
				}),
				/* @__PURE__ */ jsx(ScrollArea$1, {
					className: "flex-1 my-4 pr-3",
					children: items.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2",
						children: [/* @__PURE__ */ jsx(ShoppingCart, { className: "h-8 w-8 stroke-1" }), /* @__PURE__ */ jsx("p", {
							className: "text-sm",
							children: "Your cart is empty."
						})]
					}) : /* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: items.map((item, index) => {
							const queryResult = productResults[index];
							const serverData = queryResult?.data;
							const isLoading = queryResult?.isLoading;
							const product = serverData?.products_connection.nodes[0];
							const variant = product?.variants_connection.nodes[0];
							const productName = product?.name || "Loading product...";
							const imageUrl = variant?.media[0]?.url;
							const productPrice = product?.pricing.final_price;
							const isAvailable = variant?.available ?? true;
							return /* @__PURE__ */ jsxs("div", {
								className: `flex gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all ${!isAvailable ? "opacity-60 grayscale-[35%] bg-muted/40 border-dashed" : ""}`,
								children: [
									isLoading && /* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10",
										children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "h-20 w-20 rounded-lg border bg-muted flex items-center justify-center overflow-hidden shrink-0 relative",
										children: imageUrl ? /* @__PURE__ */ jsx("img", {
											src: getStrapiMedia(imageUrl),
											alt: productName,
											className: "h-full w-full object-cover transition-all hover:scale-105"
										}) : /* @__PURE__ */ jsx(ImageOff, { className: "h-5 w-5 text-muted-foreground/60" })
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col justify-between flex-1 min-w-0",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "space-y-0.5",
											children: [
												/* @__PURE__ */ jsxs("div", {
													className: "flex items-start justify-between gap-1",
													children: [/* @__PURE__ */ jsx("h4", {
														className: "font-semibold text-sm tracking-tight truncate",
														children: productName
													}), !isAvailable && /* @__PURE__ */ jsxs("span", {
														className: "inline-flex items-center gap-1 shrink-0 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive",
														children: [/* @__PURE__ */ jsx(AlertCircle, { className: "h-2.5 w-2.5" }), "Unavailable"]
													})]
												}),
												productPrice && /* @__PURE__ */ jsxs("p", {
													className: `text-sm font-medium ${!isAvailable ? "line-through text-muted-foreground/70" : "text-muted-foreground"}`,
													children: ["$", productPrice.toFixed(2)]
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
													children: [
														/* @__PURE__ */ jsx("span", {
															className: "inline-block h-3 w-3 rounded-full border border-border",
															style: { backgroundColor: variant?.color.color_code },
															"aria-hidden": "true"
														}),
														/* @__PURE__ */ jsx("span", {
															"aria-hidden": "true",
															children: "·"
														}),
														/* @__PURE__ */ jsx("span", { children: variant?.size.name })
													]
												})
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between mt-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: `flex items-center border rounded-lg bg-background p-0.5 shadow-sm ${!isAvailable ? "opacity-50 pointer-events-none" : ""}`,
												children: [
													/* @__PURE__ */ jsx("button", {
														className: "p-1 rounded-md hover:bg-muted",
														onClick: () => reduceItem(item.productId, item.variantId),
														disabled: !isAvailable,
														children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" })
													}),
													/* @__PURE__ */ jsx("span", {
														className: "w-6 text-center text-xs font-medium",
														children: item.quantity
													}),
													/* @__PURE__ */ jsx("button", {
														className: "p-1 rounded-md hover:bg-muted",
														onClick: () => addItem(item.productId, item.variantId),
														disabled: !isAvailable,
														children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" })
													})
												]
											}), /* @__PURE__ */ jsx(Button, {
												variant: "ghost",
												size: "icon",
												className: "h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10",
												onClick: () => removeItem(item.productId, item.variantId),
												children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
											})]
										})]
									})
								]
							}, `${item.productId}-${item.variantId}`);
						})
					})
				}),
				items.length > 0 && /* @__PURE__ */ jsxs(SheetFooter, {
					className: "pt-4 border-t flex-col gap-4 sm:flex-col block shrink-0",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5 text-sm",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ jsxs("span", {
									className: "font-medium",
									children: ["$", subtotal.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "Shipping"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "Estimated Tax"
								}), /* @__PURE__ */ jsxs("span", {
									className: "font-medium",
									children: ["$", estimatedTax.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between border-t pt-2 mt-1 text-base font-semibold",
								children: [/* @__PURE__ */ jsx("span", { children: "Total Cost" }), /* @__PURE__ */ jsxs("span", { children: ["$", totalCost.toFixed(2)] })]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-2 w-full mt-2",
						children: [/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							onClick: clear,
							className: "flex-1",
							children: "Clear"
						}), /* @__PURE__ */ jsx(Link, {
							to: "/checkout",
							className: cn(buttonVariants({ variant: "default" }), "flex-1"),
							disabled: subtotal === 0,
							children: "Checkout"
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/features/cart/CartAuthSync.tsx
function CartAuthSync() {
	const { data: session } = useSession();
	const { items, setAuthenticated, clear } = useCartStore();
	const prevAuthRef = useRef(null);
	useEffect(() => {
		const isAuthed = !!session?.user;
		const wasAuthed = prevAuthRef.current;
		prevAuthRef.current = isAuthed;
		if (isAuthed && wasAuthed === false) (async () => {
			const guestItems = items;
			if (guestItems.length > 0) await mergeCartServerFn({ data: { items: guestItems } });
			setAuthenticated(true, await getCartServerFn());
			useCartStore.persist.clearStorage();
		})();
		else if (!isAuthed && wasAuthed === true) setAuthenticated(false, []);
		else if (isAuthed && wasAuthed === null) (async () => {
			setAuthenticated(true, await getCartServerFn());
		})();
		else if (!isAuthed && wasAuthed === null) setAuthenticated(false);
	}, [!!session?.user]);
	return null;
}
//#endregion
//#region src/components/ui/popover.tsx
function Popover$1({ ...props }) {
	return /* @__PURE__ */ jsx(Popover.Root, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Popover.Trigger, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(Popover.Content, {
		"data-slot": "popover-content",
		align,
		sideOffset,
		className: cn("z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
//#endregion
//#region src/components/ui/navigation-menu.tsx
function NavigationMenu$1({ className, children, viewport = true, ...props }) {
	return /* @__PURE__ */ jsxs(NavigationMenu.Root, {
		"data-slot": "navigation-menu",
		"data-viewport": viewport,
		className: cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className),
		...props,
		children: [children, viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})]
	});
}
function NavigationMenuList({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.List, {
		"data-slot": "navigation-menu-list",
		className: cn("group flex flex-1 list-none items-center justify-center gap-1", className),
		...props
	});
}
function NavigationMenuItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Item, {
		"data-slot": "navigation-menu-item",
		className: cn("relative", className),
		...props
	});
}
var navigationMenuTriggerStyle = cva("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent");
function NavigationMenuTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(NavigationMenu.Trigger, {
		"data-slot": "navigation-menu-trigger",
		className: cn(navigationMenuTriggerStyle(), "group", className),
		...props,
		children: [
			children,
			" ",
			/* @__PURE__ */ jsx(ChevronDownIcon, {
				className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
				"aria-hidden": "true"
			})
		]
	});
}
function NavigationMenuContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Content, {
		"data-slot": "navigation-menu-content",
		className: cn("top-0 left-0 w-full p-2 pr-2.5 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out md:absolute md:w-auto", "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95", className),
		...props
	});
}
function NavigationMenuViewport({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("absolute top-full left-0 isolate z-50 flex justify-center"),
		children: /* @__PURE__ */ jsx(NavigationMenu.Viewport, {
			"data-slot": "navigation-menu-viewport",
			className: cn("origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]", className),
			...props
		})
	});
}
function NavigationMenuLink({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Link, {
		"data-slot": "navigation-menu-link",
		className: cn("flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", className),
		...props
	});
}
//#endregion
//#region src/features/header/components/brand-link.tsx
var BrandLink = () => {
	return /* @__PURE__ */ jsx(Link, {
		to: "/",
		children: site.name
	});
};
//#endregion
//#region src/components/ui/avatar.tsx
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Root, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Image, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Fallback, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
//#endregion
//#region src/features/auth/user-popover/components/user-avatar.tsx
function UserAvatar({ name, image, className }) {
	const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase();
	return /* @__PURE__ */ jsxs(Avatar$1, {
		className,
		children: [/* @__PURE__ */ jsx(AvatarImage, {
			src: image,
			alt: name
		}), /* @__PURE__ */ jsx(AvatarFallback, { children: initials })]
	});
}
//#endregion
//#region src/routes/sign-in/-components/logout-btn.tsx
var LogOutButton = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleClick = async () => {
		setLoading(true);
		await signOut();
		setLoading(false);
		await router.invalidate();
	};
	return /* @__PURE__ */ jsx(Button, {
		variant: "ghost",
		className: "w-full justify-start gap-2 text-destructive",
		onClick: handleClick,
		disabled: loading,
		children: loading ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }), "Logout"] })
	});
};
//#endregion
//#region src/features/auth/user-popover/components/user-menu-content.tsx
function UserMenuContent({ user, onSettings }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 p-4",
			children: [/* @__PURE__ */ jsx(UserAvatar, {
				name: user.name,
				image: user.image,
				className: "h-12 w-12"
			}), /* @__PURE__ */ jsxs("div", {
				className: "overflow-hidden",
				children: [/* @__PURE__ */ jsx("p", {
					className: "truncate font-medium",
					children: user.name
				}), /* @__PURE__ */ jsx("p", {
					className: "truncate text-sm text-muted-foreground",
					children: user.email
				})]
			})]
		}),
		/* @__PURE__ */ jsx(Separator$1, {}),
		/* @__PURE__ */ jsxs("div", {
			className: "p-2",
			children: [
				/* @__PURE__ */ jsxs(Button, {
					variant: "ghost",
					className: "w-full justify-start gap-2",
					onClick: onSettings,
					children: [/* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }), "Settings"]
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/order",
					className: cn(buttonVariants({ variant: "ghost" }), "w-full justify-start gap-2"),
					children: [/* @__PURE__ */ jsx(MessageCircleHeart, { className: "h-4 w-4" }), "Orders"]
				}),
				/* @__PURE__ */ jsx(LogOutButton, {})
			]
		})
	] });
}
//#endregion
//#region src/components/ui/dialog.tsx
function Dialog$1({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Root, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Portal, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Overlay, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ jsxs(DialogPortal, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(Dialog.Content, {
			"data-slot": "dialog-content",
			className: cn("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg", className),
			...props,
			children: [children, showCloseButton && /* @__PURE__ */ jsxs(Dialog.Close, {
				"data-slot": "dialog-close",
				className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ jsx(XIcon, {}), /* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-2 text-center sm:text-left", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Title, {
		"data-slot": "dialog-title",
		className: cn("text-lg leading-none font-semibold", className),
		...props
	});
}
//#endregion
//#region src/features/auth/user-popover/constants/constants.ts
var SETTINGS_TABS = [{
	id: "info",
	label: "Account Info",
	icon: User
}, {
	id: "security",
	label: "Security",
	icon: Shield
}];
//#endregion
//#region src/features/auth/user-popover/components/settings-sidebar.tsx
function SettingsSidebar({ activeTab, onChange }) {
	return /* @__PURE__ */ jsx("nav", {
		className: "space-y-1 p-2",
		children: SETTINGS_TABS.map((tab) => {
			const Icon = tab.icon;
			return /* @__PURE__ */ jsxs(Button, {
				variant: activeTab === tab.id ? "secondary" : "ghost",
				className: "w-full justify-start gap-2",
				onClick: () => onChange(tab.id),
				children: [/* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }), tab.label]
			}, tab.id);
		})
	});
}
//#endregion
//#region src/features/auth/user-popover/components/tabs/account-info-tab.tsx
var accountInfoSchema = z$1.object({
	name: z$1.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be less than 50 characters.").trim(),
	imageFile: z$1.instanceof(File).nullable().refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max image size is 4MB.").refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .png, .webp and .gif formats are supported.")
});
var MAX_FILE_SIZE = 4 * 1024 * 1024;
var ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif"
];
function AccountInfoTab({ user, onClose }) {
	const [preview, setPreview] = useState(null);
	const form = useForm({
		validators: {
			onSubmit: accountInfoSchema,
			onChange: accountInfoSchema
		},
		defaultValues: {
			name: user.name,
			imageFile: null
		},
		onSubmit: async ({ value }) => {
			let imageUrl = user.image;
			if (value.imageFile) {
				const formData = new FormData();
				formData.append("file", value.imageFile);
				imageUrl = (await (await fetch("/api/upload", {
					method: "POST",
					body: formData
				})).json()).url;
			}
			await updateUser({
				name: value.name,
				image: imageUrl
			});
		}
	});
	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);
	return /* @__PURE__ */ jsxs("form", {
		className: "space-y-6",
		onSubmit: (e) => {
			e.preventDefault();
			e.stopPropagation();
			form.handleSubmit();
		},
		children: [
			/* @__PURE__ */ jsx(form.Field, {
				name: "imageFile",
				validators: { onChange: z$1.instanceof(File).nullable().refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max image size is 4MB.").refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .png, .webp and .gif formats are supported.") },
				children: (field) => /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsx(UserAvatar, {
							name: user.name,
							image: preview || user.image,
							className: "h-16 w-16"
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
							id: field.name,
							name: field.name,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onBlur: field.handleBlur,
							onChange: (e) => {
								const file = e.target.files?.[0] || null;
								field.handleChange(file);
								if (file) {
									if (preview) URL.revokeObjectURL(preview);
									setPreview(URL.createObjectURL(file));
								} else {
									if (preview) URL.revokeObjectURL(preview);
									setPreview(null);
								}
							}
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => {
								document.getElementById(field.name)?.click();
							},
							children: "Change photo"
						})] })]
					}), field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsx(form.Field, {
					name: "name",
					validators: { onChange: z$1.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be less than 50 characters.").trim() },
					children: (field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return /* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ jsx(Label$1, {
									htmlFor: field.name,
									children: "Name"
								}),
								/* @__PURE__ */ jsx(Input, {
									id: field.name,
									name: field.name,
									value: field.state.value,
									onBlur: field.handleBlur,
									onChange: (e) => field.handleChange(e.target.value)
								}),
								isInvalid && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
							]
						});
					}
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx(Label$1, { children: "Email" }), /* @__PURE__ */ jsx(Input, {
						disabled: true,
						defaultValue: user.email
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ jsx(form.Subscribe, {
					selector: (state) => [
						state.canSubmit,
						state.isSubmitting,
						state.isDirty
					],
					children: ([canSubmit, isSubmitting, isDirty]) => /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: !canSubmit || isSubmitting || !isDirty,
						children: isSubmitting ? "Saving..." : "Save changes"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/ui/alert-dialog.tsx
function AlertDialog$1({ ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Root, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Trigger, {
		"data-slot": "alert-dialog-trigger",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Portal, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Overlay, {
		"data-slot": "alert-dialog-overlay",
		className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function AlertDialogContent({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialog.Content, {
		"data-slot": "alert-dialog-content",
		"data-size": size,
		className: cn("group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-dialog-header",
		className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Title, {
		"data-slot": "alert-dialog-title",
		className: cn("text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Description, {
		"data-slot": "alert-dialog-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		variant,
		size,
		asChild: true,
		children: /* @__PURE__ */ jsx(AlertDialog.Action, {
			"data-slot": "alert-dialog-action",
			className: cn(className),
			...props
		})
	});
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		variant,
		size,
		asChild: true,
		children: /* @__PURE__ */ jsx(AlertDialog.Cancel, {
			"data-slot": "alert-dialog-cancel",
			className: cn(className),
			...props
		})
	});
}
//#endregion
//#region src/features/auth/user-popover/components/danger-zone.tsx
function DangerZone() {
	const [open, setOpen] = useState(false);
	const form = useForm({
		defaultValues: {},
		onSubmit: async () => {
			await deleteUser({ callbackURL: "/goodbye" });
			toast.warning("Check your email to delete your account!");
			setOpen(false);
		}
	});
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-lg border border-destructive/20 bg-destructive/5 p-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 text-destructive" }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx("h4", {
						className: "font-medium text-destructive",
						children: "Danger Zone"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "This action cannot be undone."
					}),
					/* @__PURE__ */ jsxs(AlertDialog$1, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ jsx(AlertDialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs(Button, {
								variant: "destructive",
								size: "sm",
								children: [/* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete Account"]
							})
						}), /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: "Are you sure?" }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Your account will be permanently deleted." })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ jsx(form.Subscribe, {
							selector: (state) => [state.isSubmitting],
							children: ([isSubmitting]) => /* @__PURE__ */ jsx(AlertDialogAction, {
								onClick: (e) => {
									e.preventDefault();
									form.handleSubmit();
								},
								disabled: isSubmitting,
								children: isSubmitting ? "Deleting..." : "Delete"
							})
						})] })] })]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/features/auth/user-popover/components/tabs/security-tab.tsx
function SecurityTab() {
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ jsx(DangerZone, {})
	});
}
//#endregion
//#region src/features/auth/user-popover/components/settings-dialog.tsx
function SettingsDialog({ open, onOpenChange, user }) {
	const [activeTab, setActiveTab] = useState("info");
	const [sheetOpen, setSheetOpen] = useState(false);
	const currentTitle = activeTab === "info" ? "Account Info" : "Security";
	return /* @__PURE__ */ jsx(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsx(DialogContent, {
			className: "overflow-hidden p-0 sm:max-w-2xl",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex h-125",
				children: [/* @__PURE__ */ jsxs("aside", {
					className: "hidden w-56 border-r bg-muted/30 md:flex md:flex-col",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "border-b p-4",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-semibold",
							children: "Account Settings"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Manage your account"
						})]
					}), /* @__PURE__ */ jsx(SettingsSidebar, {
						activeTab,
						onChange: setActiveTab
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-1 flex-col",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 border-b p-4 md:hidden",
							children: [/* @__PURE__ */ jsxs(Sheet, {
								open: sheetOpen,
								onOpenChange: setSheetOpen,
								children: [/* @__PURE__ */ jsx(SheetTrigger, {
									asChild: true,
									children: /* @__PURE__ */ jsx(Button, {
										variant: "ghost",
										size: "icon",
										children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
									})
								}), /* @__PURE__ */ jsxs(SheetContent, {
									side: "left",
									className: "w-64 p-0",
									children: [/* @__PURE__ */ jsx("div", {
										className: "border-b p-4",
										children: /* @__PURE__ */ jsx("h2", {
											className: "font-semibold",
											children: "Account Settings"
										})
									}), /* @__PURE__ */ jsx(SettingsSidebar, {
										activeTab,
										onChange: (tab) => {
											setActiveTab(tab);
											setSheetOpen(false);
										}
									})]
								})]
							}), /* @__PURE__ */ jsx("h2", {
								className: "font-semibold",
								children: currentTitle
							})]
						}),
						/* @__PURE__ */ jsx(DialogHeader, {
							className: "hidden p-6 pb-0 md:block",
							children: /* @__PURE__ */ jsx(DialogTitle, { children: currentTitle })
						}),
						/* @__PURE__ */ jsx("main", {
							className: "flex-1 overflow-y-auto p-6",
							children: activeTab === "info" ? /* @__PURE__ */ jsx(AccountInfoTab, {
								user,
								onClose: () => onOpenChange(false)
							}) : /* @__PURE__ */ jsx(SecurityTab, {})
						})
					]
				})]
			})
		})
	});
}
//#endregion
//#region src/routes/sign-in/-components/login-btn.tsx
var LoginButton = () => {
	return /* @__PURE__ */ jsx(Link, {
		className: cn(buttonVariants({ variant: "default" })),
		to: "/sign-in",
		children: "Get started"
	});
};
//#endregion
//#region src/features/auth/user-popover/components/user-popover.tsx
function UserPopover() {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const { isPending, data } = useSession();
	if (isPending) return /* @__PURE__ */ jsx(Spinner, {});
	if (!data) return /* @__PURE__ */ jsxs(Popover$1, {
		open: popoverOpen,
		onOpenChange: setPopoverOpen,
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "icon",
				className: "h-10 w-10 rounded-full",
				"aria-label": "Open login menu",
				children: /* @__PURE__ */ jsx(User, { className: "size-5" })
			})
		}), /* @__PURE__ */ jsx(PopoverContent, {
			align: "end",
			className: "w-64",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "font-medium",
					children: "Welcome"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Log in to get started and access your account."
				})] }), /* @__PURE__ */ jsx(LoginButton, {})]
			})
		})]
	});
	const user = {
		email: data.user.email || "",
		name: data.user.name || "",
		image: data.user.image || ""
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Popover$1, {
		open: popoverOpen,
		onOpenChange: setPopoverOpen,
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				className: "h-10 w-10 rounded-full p-0",
				"aria-label": "Open user menu",
				children: /* @__PURE__ */ jsx(UserAvatar, {
					name: user.name,
					image: user.image,
					className: "size-8"
				})
			})
		}), /* @__PURE__ */ jsx(PopoverContent, {
			align: "end",
			className: "w-64 p-0",
			children: /* @__PURE__ */ jsx(UserMenuContent, {
				user,
				onSettings: () => {
					setPopoverOpen(false);
					setSettingsOpen(true);
				}
			})
		})]
	}), /* @__PURE__ */ jsx(SettingsDialog, {
		open: settingsOpen,
		onOpenChange: setSettingsOpen,
		user
	})] });
}
//#endregion
//#region src/components/ui/collapsible.tsx
function Collapsible$1({ ...props }) {
	return /* @__PURE__ */ jsx(Collapsible.Root, {
		"data-slot": "collapsible",
		...props
	});
}
function CollapsibleTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Collapsible.CollapsibleTrigger, {
		"data-slot": "collapsible-trigger",
		...props
	});
}
function CollapsibleContent({ ...props }) {
	return /* @__PURE__ */ jsx(Collapsible.CollapsibleContent, {
		"data-slot": "collapsible-content",
		...props
	});
}
//#endregion
//#region src/features/header/components/mobile-navigation.tsx
var MobileNavigation = () => {
	return /* @__PURE__ */ jsxs(Sheet, { children: [/* @__PURE__ */ jsx(SheetTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(Button, {
			variant: "ghost",
			size: "icon",
			className: "md:hidden",
			"aria-label": "Open Menu",
			children: /* @__PURE__ */ jsx(Menu, { className: "size-5" })
		})
	}), /* @__PURE__ */ jsxs(SheetContent, {
		side: "right",
		className: "w-[300px] p-6 flex flex-col justify-between",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col h-full",
			children: [/* @__PURE__ */ jsx(SheetHeader, {
				className: "text-left pb-4 border-b",
				children: /* @__PURE__ */ jsx(SheetTitle, {
					asChild: true,
					children: /* @__PURE__ */ jsx(BrandLink, {})
				})
			}), /* @__PURE__ */ jsx("nav", {
				className: "mt-4 flex flex-col gap-1 overflow-y-auto pr-1",
				children: navigation.map((item) => {
					if (!item.children?.length) return /* @__PURE__ */ jsx(Link, {
						to: item.to,
						className: "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
						children: item.label
					}, item.label);
					return /* @__PURE__ */ jsxs(Collapsible$1, {
						className: "w-full",
						children: [/* @__PURE__ */ jsxs(CollapsibleTrigger, {
							className: "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180",
							children: [item.label, /* @__PURE__ */ jsx(ChevronDown, { className: "size-4 transition-transform duration-200" })]
						}), /* @__PURE__ */ jsx(CollapsibleContent, {
							className: "ml-2 mt-1 border-l pl-2 flex flex-col gap-0.5",
							children: (item.children ?? []).map((child) => /* @__PURE__ */ jsx(Link, {
								to: child.to,
								className: "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
								children: child.label
							}, child.label))
						})]
					}, item.label);
				})
			})]
		}), /* @__PURE__ */ jsx("div", { className: "mt-auto border-t pt-4" })]
	})] });
};
//#endregion
//#region src/features/header/components/header.tsx
var Header = () => {
	return /* @__PURE__ */ jsxs("header", {
		className: "z-20 border-b bg-background",
		children: [/* @__PURE__ */ jsx("div", {
			className: "h-8 bg-primary flex items-center justify-center text-primary-foreground text-xs",
			children: /* @__PURE__ */ jsx("span", { children: "Transport gratuit la comenzi de peste 500 de lei" })
		}), /* @__PURE__ */ jsxs(Container, {
			className: "flex py-2 items-center justify-between",
			children: [
				/* @__PURE__ */ jsx(BrandLink, {}),
				/* @__PURE__ */ jsx(Navigation, {}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex",
					children: [/* @__PURE__ */ jsx(CTA, {}), /* @__PURE__ */ jsx(MobileNavigation, {})]
				})
			]
		})]
	});
};
var CTA = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ jsx(UserPopover, {}), /* @__PURE__ */ jsx(CartSheet, {})]
	});
};
var Navigation = () => {
	return /* @__PURE__ */ jsx(NavigationMenu$1, {
		className: "hidden md:block",
		children: /* @__PURE__ */ jsx(NavigationMenuList, { children: navigation.map((navItem) => {
			if (!navItem.visible) return;
			if (!navItem.children || navItem.children.length === 0) return /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(LinkItem, {
				label: navItem.label,
				to: navItem.to
			}) }, navItem.label);
			return /* @__PURE__ */ jsx(DropdownLinkItem, {
				children: navItem.children,
				label: navItem.label
			}, navItem.label);
		}) })
	});
};
var DropdownLinkItem = ({ children, label }) => {
	return /* @__PURE__ */ jsxs(NavigationMenuItem, { children: [/* @__PURE__ */ jsx(NavigationMenuTrigger, { children: label.charAt(0).toUpperCase() + label.slice(1) }), /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsx("ul", {
		className: "grid w-[400px] gap-1 p-3",
		children: children.map((child) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavigationMenuLink, {
			asChild: true,
			className: "flex-row",
			children: /* @__PURE__ */ jsxs(Link, {
				to: child.to,
				params: {
					category: label,
					subCategory: child.label
				},
				className: "flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-accent hover:text-accent-foreground group text-left",
				children: [
					child.image && /* @__PURE__ */ jsx("div", {
						className: "h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border flex items-center justify-center bg-muted",
						children: /* @__PURE__ */ jsx("img", {
							src: getStrapiMedia(child.image),
							alt: child.label,
							className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 space-y-0.5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-sm font-semibold tracking-wide",
							children: child.label
						}), child.description && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground font-light leading-relaxed line-clamp-2",
							children: child.description
						})]
					}),
					/* @__PURE__ */ jsx(ChevronRightIcon$1, { className: "h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5" })
				]
			})
		}) }, child.label))
	}) })] });
};
var LinkItem = ({ label, to, className }) => {
	return /* @__PURE__ */ jsx(NavigationMenuLink, {
		asChild: true,
		className: cn(navigationMenuTriggerStyle$1(), className),
		children: /* @__PURE__ */ jsx(Link, {
			to,
			children: label.charAt(0).toUpperCase() + label.slice(1)
		})
	});
};
var ChevronRightIcon$1 = ({ className }) => /* @__PURE__ */ jsx("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	fill: "none",
	viewBox: "0 0 24 24",
	strokeWidth: 2,
	stroke: "currentColor",
	className,
	children: /* @__PURE__ */ jsx("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		d: "M8.25 4.5l7.5 7.5-7.5 7.5"
	})
});
//#endregion
//#region src/components/footer.tsx
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-foreground text-black",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl px-6 py-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-10 md:grid-cols-5",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "mb-8 text-lg font-semibold",
						children: "Magazin online"
					}), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-4 text-sm",
						children: [
							/* @__PURE__ */ jsx("li", { children: "Întrebări frecvente" }),
							/* @__PURE__ */ jsx("li", { children: "Comanda mea (oaspete)" }),
							/* @__PURE__ */ jsx("li", { children: "Retragerea din contract" }),
							/* @__PURE__ */ jsx("li", { children: "Returnarea mărfurilor" }),
							/* @__PURE__ */ jsx("li", { children: "Reclamații" }),
							/* @__PURE__ */ jsx("li", { children: "Contul meu" }),
							/* @__PURE__ */ jsx("li", { children: "Programul de fidelitate F.A.Q." })
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "mb-8 text-lg font-semibold",
						children: "Informații"
					}), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-4 text-sm",
						children: [/* @__PURE__ */ jsx("li", { children: "Aplicație pentru descărcare" }), /* @__PURE__ */ jsx("li", { children: "Program de loialitate" })]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "mb-8 text-lg font-semibold",
						children: "Ai nevoie de ajutor?"
					}), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-5 text-sm",
						children: [
							/* @__PURE__ */ jsx("li", { children: "Serviciul Clienți" }),
							/* @__PURE__ */ jsx("li", { children: "Formular de contact" }),
							/* @__PURE__ */ jsx("li", {
								className: "pt-4 text-base font-bold",
								children: "+40 316301973"
							}),
							/* @__PURE__ */ jsx("li", {
								className: "text-xs",
								children: "luni - vineri 9:00 - 16:00"
							}),
							/* @__PURE__ */ jsx("li", {
								className: "font-semibold",
								children: "info.ro@gate.shop"
							})
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "mb-8 text-lg font-semibold",
						children: "Condiții"
					}), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-4 text-sm",
						children: [
							/* @__PURE__ */ jsx("li", { children: "Politica de confidențialitate" }),
							/* @__PURE__ */ jsx("li", { children: "Cookies" }),
							/* @__PURE__ */ jsx("li", { children: "Termeni și condiții" })
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "mb-8 text-lg font-semibold",
						children: "Social media"
					}), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-5 text-sm",
						children: [
							/* @__PURE__ */ jsxs("li", {
								className: "flex gap-3 items-center",
								children: [/* @__PURE__ */ jsx(Facebook, { size: 15 }), "Facebook"]
							}),
							/* @__PURE__ */ jsxs("li", {
								className: "flex gap-3 items-center",
								children: [/* @__PURE__ */ jsx(Instagram, { size: 15 }), "Instagram"]
							}),
							/* @__PURE__ */ jsxs("li", {
								className: "flex gap-3 items-center",
								children: [/* @__PURE__ */ jsx(Youtube, { size: 15 }), "YouTube"]
							})
						]
					})] })
				]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "border-t border-gray-300",
			children: /* @__PURE__ */ jsxs("div", {
				className: "py-10 flex flex-col items-center gap-10",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-2xl tracking-[0.35em]",
					children: "gate.shop"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ jsx(MapPin, { size: 16 }), "RO/RO"]
				})]
			})
		})]
	});
}
//#endregion
//#region src/routes/__root.tsx
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TanStack Start Starter" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", {
			className: "w-full  h-screen  flex flex-col",
			children: [
				/* @__PURE__ */ jsx(Header, {}),
				/* @__PURE__ */ jsx(Toaster$1, {}),
				/* @__PURE__ */ jsx(CartAuthSync, {}),
				children,
				/* @__PURE__ */ jsx(Footer, {}),
				/* @__PURE__ */ jsx(Scripts, {})
			]
		})]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$5 = () => import("./routes-CJvMTFlU.js");
var Route$7 = createFileRoute("/")({
	head: () => ({ meta: [...seo({
		title: `Home | ${site.name}`,
		description: "Auxload Store – haine Gen Z cu imprimeuri trendy și stil modern. Livrare gratuită în Breaza.",
		image: "/banner.png"
	})] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/sign-in/index.tsx
var $$splitComponentImporter$4 = () => import("./sign-in-BY3MCsCD.js");
var Route$6 = createFileRoute("/sign-in/")({
	beforeLoad: async () => {
		if (await getSession()) throw redirect({ to: "/" });
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/features/order/server/order.ts
var getOrderListServerFn = createServerFn().handler(createSsrRpc("c671e96b1f14cdb8d686a520ba822d1b8a905b8a88e4d5d0dd594c1b18dd85ee"));
var getOrderServerFn = createServerFn().validator(orderIdSchema).handler(createSsrRpc("e7c5210c088e840540d2b74578ae3e8758867c0247b7bbf69e2cc141950e85b2"));
//#endregion
//#region src/routes/order/index.tsx
var $$splitComponentImporter$3 = () => import("./order-CsuaOU5w.js");
var Route$5 = createFileRoute("/order/")({
	beforeLoad: async () => await isAuthenticated(),
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	loader: async () => {
		const data = await getOrderListServerFn();
		console.log(data);
		return data;
	}
});
//#endregion
//#region src/routes/checkout/index.tsx
var $$splitComponentImporter$2 = () => import("./checkout-Bc5bASXE.js");
var Route$4 = createFileRoute("/checkout/")({
	beforeLoad: () => isAuthenticated(),
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	pendingComponent: () => /* @__PURE__ */ jsx("div", { children: "Loading..." })
});
//#endregion
//#region src/routes/product/$slug.tsx
var $$splitNotFoundComponentImporter = () => import("./_slug-Cfhb_78R.js");
var $$splitComponentImporter$1 = () => import("./_slug-CkYRhGXn.js");
var Route$3 = createFileRoute("/product/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	validateSearch: productVariantSearchParamsSchema,
	loaderDeps: ({ search: { variant_name } }) => ({ variant_name }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	loader: async ({ params }) => {
		const res = await getProductBySlug(params.slug);
		if (res.products_connection.nodes.length === 0) throw notFound();
		return res.products_connection.nodes[0];
	},
	pendingComponent: () => /* @__PURE__ */ jsx("div", {
		"aria-label": "Pagina se incarca...",
		className: "text-center py-20",
		children: "Loading..."
	}),
	head: ({ loaderData }) => ({ meta: [...seo({
		title: `${loaderData?.name} | ${site.name}`,
		description: loaderData?.seo?.description || "",
		image: loaderData?.seo?.media?.url || ""
	})] })
});
//#endregion
//#region src/routes/order/$id.tsx
var $$splitComponentImporter = () => import("./_id-D4YBDVi2.js");
var Route$2 = createFileRoute("/order/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ params }) => {
		const id = Number(params.id);
		if (Number.isNaN(id)) throw notFound();
		const data = await getOrderServerFn({ data: { orderId: id } });
		console.log("Order id", data.products);
		return data;
	}
});
createUploadthing()({ image: { maxFileSize: "4MB" } }).onUploadComplete(async ({ metadata, file }) => {
	return { url: file.ufsUrl };
});
var utapi = new UTApi();
//#endregion
//#region src/routes/api/upload.ts
var Route$1 = createFileRoute("/api/upload")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const file = (await request.formData()).get("file");
		if (!file) return new Response("No file provided", { status: 400 });
		const uploadedFile = (await utapi.uploadFiles([file]))[0];
		if (!uploadedFile || uploadedFile.error) return Response.json({ error: uploadedFile?.error?.message || "Upload failed" }, { status: 500 });
		return Response.json({ url: uploadedFile.data.ufsUrl });
	} catch (error) {
		return Response.json({ error: "Internal Server Error during upload" }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routes/api/auth/$.ts
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var SignInIndexRoute = Route$6.update({
	id: "/sign-in/",
	path: "/sign-in/",
	getParentRoute: () => Route$8
});
var OrderIndexRoute = Route$5.update({
	id: "/order/",
	path: "/order/",
	getParentRoute: () => Route$8
});
var CheckoutIndexRoute = Route$4.update({
	id: "/checkout/",
	path: "/checkout/",
	getParentRoute: () => Route$8
});
var ProductSlugRoute = Route$3.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => Route$8
});
var OrderIdRoute = Route$2.update({
	id: "/order/$id",
	path: "/order/$id",
	getParentRoute: () => Route$8
});
var ApiUploadRoute = Route$1.update({
	id: "/api/upload",
	path: "/api/upload",
	getParentRoute: () => Route$8
});
var CCategoryChar123SubCategoryChar125Route = Route$9.update({
	id: "/c/$category/{-$subCategory}",
	path: "/c/$category/{-$subCategory}",
	getParentRoute: () => Route$8
});
var rootRouteChildren = {
	IndexRoute,
	ApiUploadRoute,
	OrderIdRoute,
	ProductSlugRoute,
	CheckoutIndexRoute,
	OrderIndexRoute,
	SignInIndexRoute,
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$8
	}),
	CCategoryChar123SubCategoryChar125Route
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/integrations/tanstack-query/root-provider.tsx
function getContext() {
	return { queryClient: new QueryClient() };
}
//#endregion
//#region src/router.tsx
function getRouter() {
	const context = getContext();
	const router = createRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient
	});
	return router;
}
//#endregion
export { getRouter };
