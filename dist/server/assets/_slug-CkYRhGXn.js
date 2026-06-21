import { r as getStrapiMedia, t as cn } from "./utils-CD9uFQ8X.js";
import { t as Button } from "./button-wioQ1hvF.js";
import { t as useCartStore } from "./store-Bb9j5aDn.js";
import { n as Container } from "./skeleton-Va3ZmfLZ.js";
import { n as Price } from "./product-card-DR3K_pqM.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-zwFtoIDr.js";
import { n as CarouselProductList, t as ProductCarouselLayout } from "./product-carousel-layout-YOpEyD1G.js";
import { useEffect, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Markdown from "react-markdown";
//#region src/features/Products/components/accordeon-content.tsx
function ProductDetailsAccordion({ description, variantSku }) {
	return /* @__PURE__ */ jsxs(Accordion, {
		type: "multiple",
		className: "w-full",
		defaultValue: [
			"description",
			"materials",
			"shipping"
		],
		children: [
			/* @__PURE__ */ jsxs(AccordionItem, {
				value: "description",
				className: "border-b border-border",
				children: [/* @__PURE__ */ jsx(AccordionTrigger, {
					className: "text-sm font-medium hover:no-underline py-4",
					children: "Descriere Produs"
				}), /* @__PURE__ */ jsxs(AccordionContent, {
					className: "text-sm  leading-relaxed pb-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "dark prose prose-sm max-w-none",
						children: /* @__PURE__ */ jsx("article", {
							className: "text-muted-foreground",
							children: /* @__PURE__ */ jsx(Markdown, { children: description || "Nu există o descriere disponibilă pentru acest produs în acest moment." })
						})
					}), variantSku && /* @__PURE__ */ jsxs("p", {
						className: "mt-2 text-xs text-muted-foreground/60",
						children: ["Cod produs (SKU): ", variantSku]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(AccordionItem, {
				value: "materials",
				className: "border-b border-border",
				children: [/* @__PURE__ */ jsx(AccordionTrigger, {
					className: "text-sm font-medium hover:no-underline py-4",
					children: "Materiale și Îngrijire"
				}), /* @__PURE__ */ jsx(AccordionContent, {
					className: "text-sm text-muted-foreground pb-4",
					children: /* @__PURE__ */ jsxs("ul", {
						className: "list-disc pl-4 space-y-1",
						children: [
							/* @__PURE__ */ jsx("li", { children: "Material principal: 100% Bumbac" }),
							/* @__PURE__ */ jsx("li", { children: "Spălare la mașină la maxim 30°C, ciclu scurt" }),
							/* @__PURE__ */ jsx("li", { children: "Nu utilizați înălbitor" }),
							/* @__PURE__ */ jsx("li", { children: "Călcare la maximum 110°C" })
						]
					})
				})]
			}),
			/* @__PURE__ */ jsxs(AccordionItem, {
				value: "shipping",
				className: "border-b border-border",
				children: [/* @__PURE__ */ jsx(AccordionTrigger, {
					className: "text-sm font-medium hover:no-underline py-4",
					children: "Livrare și Retururi"
				}), /* @__PURE__ */ jsxs(AccordionContent, {
					className: "text-sm text-muted-foreground pb-4 space-y-2",
					children: [/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", { children: "Livrare Standard:" }), " Între 2-4 zile lucrătoare prin curier rapid (15,00 LEI sau Gratuit pentru comenzi de peste 200 LEI)."] }), /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", { children: "Retur Simplu:" }), " Aveți la dispoziție 30 de zile de la data achiziției pentru a returna gratuit articolele în magazin sau prin curier."] })]
				})]
			})
		]
	});
}
//#endregion
//#region src/features/Products/components/product-galery.tsx
function ProductGallery({ images, selectedImage, onImageSelect }) {
	const handlePrev = () => {
		onImageSelect(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
	};
	const handleNext = () => {
		onImageSelect(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative w-full aspect-3/4 bg-card rounded-lg overflow-hidden group",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: getStrapiMedia(images[selectedImage].url),
					alt: `${images[selectedImage].url}`,
					className: "w-full h-full object-cover object-center"
				}),
				/* @__PURE__ */ jsx("button", {
					"aria-label": "imagineaa anterioara",
					onClick: handlePrev,
					className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition",
					children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
				}),
				/* @__PURE__ */ jsx("button", {
					"aria-label": "imagineaa urmatoare",
					onClick: handleNext,
					className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition",
					children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex gap-3",
			children: images.map((image, index) => /* @__PURE__ */ jsx("button", {
				onClick: () => onImageSelect(index),
				className: `w-16 h-20 rounded-md overflow-hidden transition ${selectedImage === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"}`,
				children: /* @__PURE__ */ jsx("img", {
					src: getStrapiMedia(image.url),
					alt: `Thumbnail ${index + 1}`,
					className: "w-full h-full object-cover"
				})
			}, index))
		})]
	});
}
//#endregion
//#region src/features/Products/components/variant-selector.tsx
function VariantSelector({ allVariants, selectedVariant, onVariantChange }) {
	const navigate = getRouteApi("/product/$slug").useNavigate();
	const colors = Array.from(new Map(allVariants.map((v) => [v.color.color_code, v.color])).values());
	const sizes = selectedVariant ? Array.from(new Set(allVariants.filter((v) => v.color.color_code === selectedVariant.color.color_code).map((v) => v.size).filter(Boolean))) : [];
	const isColorAvailable = (colorCode) => {
		return allVariants.some((v) => v.color.color_code === colorCode && v.available);
	};
	const isSizeAvailable = (size) => {
		if (!selectedVariant) return false;
		return allVariants.some((v) => v.color.color_code === selectedVariant.color.color_code && v.size.name === size && v.available);
	};
	const getVariantByColorAndSize = (colorCode, size) => {
		return allVariants.find((v) => v.color.color_code === colorCode && v.size.name === size);
	};
	const handleColorClick = (colorCode) => {
		if (selectedVariant?.color.color_code === colorCode) {
			onVariantChange(selectedVariant);
			return;
		}
		const targetVariant = allVariants.find((v) => v.color.color_code === colorCode && v.available);
		navigate({
			search: { variant_name: targetVariant?.name },
			resetScroll: false
		});
		if (targetVariant) onVariantChange(targetVariant);
	};
	const handleSizeClick = (size) => {
		if (!selectedVariant) return;
		const targetVariant = getVariantByColorAndSize(selectedVariant.color.color_code, size);
		navigate({
			search: { variant_name: targetVariant?.name },
			resetScroll: false
		});
		if (targetVariant && targetVariant.available) onVariantChange(targetVariant);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [colors.length > 0 && /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-foreground",
				children: "Culoare"
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-3",
				children: colors.map((color) => {
					const available = isColorAvailable(color.color_code);
					const isSelected = selectedVariant?.color.color_code === color.color_code;
					return /* @__PURE__ */ jsx("button", {
						onClick: () => handleColorClick(color.color_code),
						className: cn("w-10 h-10 rounded-full border-2 transition-all relative", isSelected ? "border-foreground" : "border-border hover:border-muted-foreground", !available && "opacity-50 cursor-not-allowed"),
						style: { backgroundColor: color.color_code },
						title: `${color.name}${!available ? " (unavailable)" : ""}`,
						"aria-label": `${color.name}${!available ? " (unavailable)" : ""}`,
						children: isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center" })
					}, color.color_code);
				})
			})]
		}), sizes.length > 0 && /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-foreground",
				children: "Marime"
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2",
				children: sizes.map((size) => {
					const available = isSizeAvailable(size.name);
					return /* @__PURE__ */ jsx("button", {
						onClick: () => handleSizeClick(size.name),
						className: cn("px-4 py-2 border rounded-md text-sm font-medium transition-all", selectedVariant?.size === size ? "border-foreground bg-primary text-primary-foreground" : "border-border hover:border-muted-foreground text-foreground hover:bg-muted", !available && "opacity-50 cursor-not-allowed"),
						children: size.name
					}, size.name);
				})
			})]
		})]
	});
}
//#endregion
//#region src/routes/product/$slug.tsx?tsr-split=component
function RouteComponent() {
	const productPageRouteApi = getRouteApi("/product/$slug");
	const product = productPageRouteApi.useLoaderData();
	const similarProduct = product.categories_connection.nodes[0].products.filter((p) => p.slug !== product.slug);
	const allVariants = product.variants;
	const search = productPageRouteApi.useSearch();
	const firstVariant = allVariants.filter((v) => v.name === search.variant_name)[0];
	const [selectedVariant, setSelectedVariant] = useState(firstVariant || allVariants[0]);
	const [selectedImage, setSelectedImage] = useState(0);
	const { addItem } = useCartStore();
	const { isOpen, openCart, closeCart, toggleCart } = useCartStore();
	useEffect(() => {
		setSelectedVariant(allVariants.find((v) => v.name === search.variant_name) || allVariants[0]);
		setSelectedImage(0);
	}, [product, search.variant_name]);
	return /* @__PURE__ */ jsx("main", {
		className: "flex-1",
		children: /* @__PURE__ */ jsx("section", {
			className: "py-8",
			children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative",
				children: [/* @__PURE__ */ jsx("div", {
					className: "lg:sticky lg:top-8",
					children: /* @__PURE__ */ jsx(ProductGallery, {
						images: selectedVariant.media,
						selectedImage,
						onImageSelect: setSelectedImage
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-8",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs tracking-widest text-muted-foreground uppercase mb-4",
								children: [
									product.categories[0].name,
									" / ",
									product.sub_categories[0].name
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-4xl font-light tracking-tight mb-2",
								children: product.name
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex mb-4 items-center gap-1 text-yellow-500",
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									fill: "currentColor",
									viewBox: "0 0 24 24",
									width: "18",
									height: "24",
									children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" })
								}, i))
							}),
							/* @__PURE__ */ jsx(Price, {
								className: {
									discount: "text-sm",
									price: "text-2xl"
								},
								pricing: product.pricing
							})
						] }),
						/* @__PURE__ */ jsx(VariantSelector, {
							allVariants,
							selectedVariant,
							onVariantChange: setSelectedVariant
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex gap-4 pt-4",
							children: /* @__PURE__ */ jsx(Button, {
								"aria-label": "Cumpara acum",
								size: "lg",
								className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90",
								onClick: () => {
									addItem(product.documentId, selectedVariant.documentId);
									openCart();
								},
								disabled: !selectedVariant.available,
								children: selectedVariant.available ? "Cumpara Acum!" : "Produs Indisponibil"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "border-t border-border pt-8",
							children: /* @__PURE__ */ jsx(ProductDetailsAccordion, {
								description: product.description,
								variantSku: selectedVariant.name
							})
						})
					]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-16",
				children: /* @__PURE__ */ jsx(ProductCarouselLayout, {
					label: "Produse Similare",
					category: product.categories[0].name,
					subCategory: product.sub_categories[0].name,
					children: /* @__PURE__ */ jsx(CarouselProductList, {
						data: { products_connection: {
							nodes: similarProduct,
							pageInfo: {
								page: 1,
								pageCount: 12,
								pageSize: 3,
								total: 12
							}
						} },
						isPending: false
					})
				})
			})] })
		})
	});
}
//#endregion
export { RouteComponent as component };
