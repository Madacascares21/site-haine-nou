import { g as getStrapiMedia, c as cn } from './utils-D6pEwd0q.mjs';
import { u as useCartStore, C as Container, B as Button } from './router-DVmJmQLB.mjs';
import { P as Price } from './product-card-CKxu8irN.mjs';
import { A as Accordion$1, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from './accordion-tH7yuVoM.mjs';
import { P as ProductCarouselLayout, e as CarouselProductList } from './product-carousel-layout-DGhrKuby.mjs';
import { useState, useEffect } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import { jsx, jsxs } from 'react/jsx-runtime';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Markdown from 'react-markdown';
import '../virtual/entry.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'drizzle-orm';
import 'drizzle-orm/pg-core';
import 'drizzle-orm/node-postgres';
import '@tanstack/react-router/ssr/server';
import 'node:async_hooks';
import 'node:stream';
import './product.query-BBHo8rfv.mjs';
import 'graphql-request';
import './auth.functions-CXVcUiC-.mjs';
import 'zod';
import 'clsx';
import 'tailwind-merge';
import './kysely-adapter-2JZcyMF-.mjs';
import './nodemailer-D4bWEl0n.mjs';
import 'class-variance-authority';
import 'nodemailer';
import 'node:fs/promises';
import 'node:os';
import './schema-DNbTVeE0.mjs';
import 'zustand';
import 'zustand/middleware';
import 'radix-ui';
import './constants-BaiN9-he.mjs';
import '@tanstack/react-query';
import 'next-themes';
import 'sonner';
import '@tanstack/react-form';
import 'uploadthing/server';
import '@tanstack/react-router-ssr-query';
import 'embla-carousel-react';
import 'embla-carousel-autoplay';

function ProductDetailsAccordion({ description, variantSku }) {
  return /* @__PURE__ */ jsxs(Accordion$1, {
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
            className: "dark prose-headings:text-white prose-sm max-w-none",
            children: /* @__PURE__ */ jsx("article", {
              className: "text-muted-foreground",
              children: /* @__PURE__ */ jsx(Markdown, { children: description || "Nu exist\u0103 o descriere disponibil\u0103 pentru acest produs \xEEn acest moment." })
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
          children: "Materiale \u0219i \xCEngrijire"
        }), /* @__PURE__ */ jsx(AccordionContent, {
          className: "text-sm text-muted-foreground pb-4",
          children: /* @__PURE__ */ jsxs("ul", {
            className: "list-disc pl-4 space-y-1",
            children: [
              /* @__PURE__ */ jsx("li", { children: "Material principal: 100% Bumbac" }),
              /* @__PURE__ */ jsx("li", { children: "Sp\u0103lare la ma\u0219in\u0103 la maxim 30\xB0C, ciclu scurt" }),
              /* @__PURE__ */ jsx("li", { children: "Nu utiliza\u021Bi \xEEn\u0103lbitor" }),
              /* @__PURE__ */ jsx("li", { children: "C\u0103lcare la maximum 110\xB0C" })
            ]
          })
        })]
      }),
      /* @__PURE__ */ jsxs(AccordionItem, {
        value: "shipping",
        className: "border-b border-border",
        children: [/* @__PURE__ */ jsx(AccordionTrigger, {
          className: "text-sm font-medium hover:no-underline py-4",
          children: "Livrare \u0219i Retururi"
        }), /* @__PURE__ */ jsxs(AccordionContent, {
          className: "text-sm text-muted-foreground pb-4 space-y-2",
          children: [/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", { children: "Livrare Standard:" }), " \xCEntre 2-4 zile lucr\u0103toare prin curier rapid (15,00 LEI sau Gratuit pentru comenzi de peste 200 LEI)."] }), /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", { children: "Retur Simplu:" }), " Ave\u021Bi la dispozi\u021Bie 30 de zile de la data achizi\u021Biei pentru a returna gratuit articolele \xEEn magazin sau prin curier."] })]
        })]
      })
    ]
  });
}
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
function VariantSelector({ allVariants, selectedVariant, onVariantChange }) {
  const navigate = getRouteApi("/product/$slug").useNavigate();
  const isVariantAvailable = (variant) => {
    const stockQty = variant?.qty ?? 0;
    return (variant?.available ?? true) && stockQty > 0;
  };
  const colors = Array.from(new Map(allVariants.map((v) => [v.color.color_code, v.color])).values());
  const selectedColorCode = selectedVariant?.color?.color_code;
  const sizes = selectedColorCode ? Array.from(new Map(allVariants.filter((v) => v.color.color_code === selectedColorCode).map((v) => [v.size.name, v.size])).values()) : [];
  const isColorAvailable = (colorCode) => {
    return allVariants.some((v) => v.color.color_code === colorCode && isVariantAvailable(v));
  };
  const isSizeAvailable = (size) => {
    if (!selectedVariant) return false;
    return allVariants.some((v) => v.color.color_code === selectedVariant.color.color_code && v.size.name === size && isVariantAvailable(v));
  };
  const getVariantByColorAndSize = (colorCode, size) => {
    return allVariants.find((v) => v.color.color_code === colorCode && v.size.name === size);
  };
  const handleColorClick = (colorCode) => {
    const targetVariant = allVariants.find((v) => v.color.color_code === colorCode && isVariantAvailable(v));
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
    if (targetVariant && isVariantAvailable(targetVariant)) onVariantChange(targetVariant);
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
          return /* @__PURE__ */ jsx("button", {
            onClick: () => handleColorClick(color.color_code),
            className: cn("w-10 h-10 rounded-full border-2 transition-all relative", selectedVariant?.color.color_code === color.color_code ? "border-foreground" : "border-border hover:border-muted-foreground", !available && "opacity-40 cursor-not-allowed grayscale"),
            style: { backgroundColor: color.color_code },
            title: `${color.name}${!available ? " (out of stock)" : ""}`
          }, color.color_code);
        })
      })]
    }), sizes.length > 0 && /* @__PURE__ */ jsxs("div", {
      className: "space-y-3",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex gap-1 items-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-sm font-semibold text-foreground",
          children: "M\u0103rime"
        }), /* @__PURE__ */ jsxs("span", {
          className: "text-xs",
          children: [
            "(",
            selectedVariant?.qty ?? 0,
            " buc\u0103\u021Bi)"
          ]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex flex-wrap gap-2",
        children: sizes.map((size) => {
          const available = isSizeAvailable(size.name);
          return /* @__PURE__ */ jsx("button", {
            onClick: () => handleSizeClick(size.name),
            className: cn("px-4 py-2 border rounded-md text-sm font-medium transition-all", selectedVariant?.size?.name === size.name ? "border-foreground bg-primary text-primary-foreground" : "border-border hover:border-muted-foreground", !available && "opacity-40 cursor-not-allowed"),
            disabled: !available,
            children: size.name
          }, size.name);
        })
      })]
    })]
  });
}
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
  const { openCart } = useCartStore();
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
                  addItem(product.documentId, selectedVariant.documentId, selectedVariant.qty);
                  openCart();
                },
                disabled: !!(selectedVariant.qty <= 0),
                children: selectedVariant.qty <= 0 ? "Produs Indisponibil" : "Cumpara Acum!"
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

export { RouteComponent as component };
//# sourceMappingURL=_slug-DNnQ83JE.mjs.map
