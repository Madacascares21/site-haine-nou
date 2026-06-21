import { a as getProductsServerFunc, r as featuredProductsServerFunc, t as bestPriceServerFunc } from "./product.function-e3JbASGV.js";
import { r as getStrapiMedia, t as cn } from "./utils-CD9uFQ8X.js";
import { t as Button } from "./button-wioQ1hvF.js";
import { t as navigation } from "./constant-BafgMehM.js";
import { n as Container } from "./skeleton-Va3ZmfLZ.js";
import { a as CarouselItem, i as CarouselContent, n as CarouselProductList, o as CarouselNext, r as Carousel, s as CarouselPrevious, t as ProductCarouselLayout } from "./product-carousel-layout-YOpEyD1G.js";
import * as React from "react";
import { isRedirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Tabs } from "radix-ui";
import { useQuery } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";
//#region node_modules/.pnpm/@tanstack+react-start@1.168.26_react-dom@19.2.7_react@19.2.7__react@19.2.7_vite@8.0.16__68350161f4b64bc7f6d2407f118026ba/node_modules/@tanstack/react-start/dist/esm/useServerFn.js
function useServerFn(serverFn) {
	const router = useRouter();
	return React.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
//#endregion
//#region src/components/hero-carousel.tsx
var slides = Array.from({ length: 1 }, () => ({
	id: "assfaf",
	title: "Vara asta tu surprinzi pe toata lumea",
	description: "Haine trendy pentru ati arata toate formele",
	cta: faker.helpers.arrayElement([
		"Learn More",
		"Get Started",
		"Shop Now",
		"Discover"
	])
}));
var CustomSlide = ({ slide }) => {
	return /* @__PURE__ */ jsx("div", {
		className: "relative h-[700px] w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-background via-background to-muted/40",
		children: /* @__PURE__ */ jsxs(Container, {
			className: "relative z-10 flex h-full items-center justify-between gap-12",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex-1 max-w-xl",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-5 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm backdrop-blur-xl",
						children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-green-500 animate-pulse" }), "New Collection Available"]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-5xl font-black tracking-tight md:text-7xl leading-[0.95]",
						children: slide.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-md text-lg leading-relaxed text-muted-foreground",
						children: slide.description
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex gap-4",
						children: [/* @__PURE__ */ jsx(Button, {
							size: "lg",
							className: "rounded-full px-8 shadow-xl transition hover:scale-105",
							children: "Shop Now"
						}), /* @__PURE__ */ jsx(Button, {
							size: "lg",
							variant: "outline",
							className: "rounded-full px-8",
							children: "View Details"
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative flex-1 h-full flex items-center justify-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "absolute right-0 top-24 z-20 rounded-2xl border bg-background/80 px-5 py-4 shadow-xl backdrop-blur-xl",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Limited Offer"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-3xl font-black text-primary",
						children: "-40%"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[40px] bg-primary/20 blur-3xl" }),
						/* @__PURE__ */ jsx("div", {
							className: "relative h-[420px] w-[420px] overflow-hidden rounded-[40px] border bg-background shadow-2xl",
							children: /* @__PURE__ */ jsx("img", {
								src: "http://localhost:1337/uploads/a2183884_2832_4f4c_90d6_8e7f547a86ba_83be8e757a.png",
								alt: slide.title,
								className: "\n              h-full\n              w-full\n              object-top\n              object-cover\n              transition-all\n              duration-700\n              hover:scale-110\n            "
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "absolute -bottom-8 -left-10 w-64 rounded-3xl border bg-background/90 p-5 shadow-2xl backdrop-blur-xl",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Featured Product"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-1 font-bold",
									children: "Tricou Skets"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-3 flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-xl font-black",
										children: "29.99 Lei"
									}), /* @__PURE__ */ jsx(Button, {
										size: "sm",
										className: "rounded-full",
										children: "Add"
									})]
								})
							]
						})
					]
				})]
			})]
		})
	});
};
var HeroCarousel = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "",
		children: /* @__PURE__ */ jsxs(Carousel, {
			className: "w-full",
			children: [
				/* @__PURE__ */ jsx(CarouselContent, { children: slides.map((slide) => /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx(CustomSlide, { slide }) }, slide.id)) }),
				/* @__PURE__ */ jsx(CarouselPrevious, { className: "left-4" }),
				/* @__PURE__ */ jsx(CarouselNext, { className: "right-4" })
			]
		})
	});
};
//#endregion
//#region src/components/ui/tabs.tsx
function Tabs$1({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Root, {
		"data-slot": "tabs",
		"data-orientation": orientation,
		orientation,
		className: cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className),
		...props
	});
}
var tabsListVariants = cva("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function TabsList({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(Tabs.List, {
		"data-slot": "tabs-list",
		"data-variant": variant,
		className: cn(tabsListVariants({ variant }), className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Trigger, {
		"data-slot": "tabs-trigger",
		className: cn("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent", "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Content, {
		"data-slot": "tabs-content",
		className: cn("flex-1 outline-none", className),
		...props
	});
}
//#endregion
//#region src/components/product-category-banner.tsx
function CategoryGrid({ items }) {
	return /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-6",
		children: items.map((cat) => /* @__PURE__ */ jsxs("a", {
			href: "#",
			className: "relative group overflow-hidden rounded-2xl h-40 md:h-56 bg-gray-900",
			children: [
				cat.image && /* @__PURE__ */ jsx("img", {
					src: getStrapiMedia(cat.image),
					alt: cat.label,
					className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-10 p-4 md:p-6 flex flex-col justify-end h-full",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-white text-lg md:text-xl font-bold",
						children: cat.label
					}), /* @__PURE__ */ jsx("span", {
						className: "mt-2 inline-block text-xs md:text-sm text-white/80 group-hover:text-white transition",
						children: "Explore →"
					})]
				})
			]
		}, cat.label))
	});
}
function CategoryBannerSection() {
	const tabs = navigation.filter((item) => item.label === "barbati" || item.label === "femei");
	return /* @__PURE__ */ jsx("section", {
		className: "w-full px-4 md:px-10 py-10",
		children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsx("h2", {
			className: "text-white text-xl md:text-2xl font-semibold mb-4",
			children: "Shop by Category"
		}), /* @__PURE__ */ jsxs(Tabs$1, {
			defaultValue: tabs[0]?.label,
			children: [/* @__PURE__ */ jsx(TabsList, {
				className: "bg-black/20",
				children: tabs.map((tab) => /* @__PURE__ */ jsx(TabsTrigger, {
					value: tab.label,
					children: tab.label === "barbati" ? "Bărbați" : "Femei"
				}, tab.label))
			}), tabs.map((tab) => /* @__PURE__ */ jsx(TabsContent, {
				value: tab.label,
				children: /* @__PURE__ */ jsx(CategoryGrid, { items: tab.children ?? [] })
			}, tab.label))]
		})] })
	});
}
//#endregion
//#region src/features/Products/components/best-seller.tsx
var BestPrice = () => {
	const getProducts = useServerFn(bestPriceServerFunc);
	const { data, isPending } = useQuery({
		queryKey: ["best-price-products"],
		queryFn: () => getProducts(),
		staleTime: 600 * 1e3
	});
	return /* @__PURE__ */ jsx(ProductCarouselLayout, {
		label: "Promotii",
		subCategory: "promotii",
		category: "colectii",
		children: /* @__PURE__ */ jsx(CarouselProductList, {
			data,
			isPending
		})
	});
};
//#endregion
//#region src/features/Products/components/new-product-carousel-list.tsx
var NewProducts = () => {
	const getProducts = useServerFn(getProductsServerFunc);
	const { data, isPending } = useQuery({
		queryKey: ["new-products"],
		queryFn: () => getProducts(),
		staleTime: 600 * 1e3
	});
	return /* @__PURE__ */ jsx(ProductCarouselLayout, {
		label: "Produse Noi",
		category: "produse-noi",
		children: /* @__PURE__ */ jsx(CarouselProductList, {
			data,
			isPending
		})
	});
};
//#endregion
//#region src/features/Products/components/tshirt-product-carousel-list.tsx
var FeaturedProducts = () => {
	const getProducts = useServerFn(featuredProductsServerFunc);
	const { data, isPending } = useQuery({
		queryKey: ["featured-products"],
		queryFn: () => getProducts(),
		staleTime: 600 * 1e3
	});
	return /* @__PURE__ */ jsx(ProductCarouselLayout, {
		label: "Featured",
		category: "colectii",
		subCategory: "featured",
		children: /* @__PURE__ */ jsx(CarouselProductList, {
			data,
			isPending
		})
	});
};
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Home() {
	return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("section", { children: [
		/* @__PURE__ */ jsx(HeroCarousel, {}),
		/* @__PURE__ */ jsx(CategoryBannerSection, {}),
		/* @__PURE__ */ jsx(FeaturedProducts, {}),
		/* @__PURE__ */ jsx(NewProducts, {}),
		/* @__PURE__ */ jsx(BestPrice, {})
	] }) });
}
//#endregion
export { Home as component };
