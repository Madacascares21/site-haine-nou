import { s as slugToTitle, c as cn } from './utils-D6pEwd0q.mjs';
import { g as generatedData } from './nodemailer-D4bWEl0n.mjs';
import { R as Route, C as Container, j as Sheet, k as SheetTrigger, B as Button, l as SheetContent, m as SheetHeader, n as SheetTitle, L as Label$1, g as Skeleton, b as buttonVariants } from './router-DVmJmQLB.mjs';
import { a as ProductCard } from './product-card-CKxu8irN.mjs';
import { A as Accordion$1, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from './accordion-tH7yuVoM.mjs';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useRouterState, getRouteApi } from '@tanstack/react-router';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { SlidersHorizontalIcon, Search, CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react';
import { Checkbox, Select, Slider } from 'radix-ui';
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
import 'class-variance-authority';
import 'nodemailer';
import './kysely-adapter-2JZcyMF-.mjs';
import 'node:fs/promises';
import 'node:os';
import './schema-DNbTVeE0.mjs';
import 'zustand';
import 'zustand/middleware';
import './constants-BaiN9-he.mjs';
import '@tanstack/react-query';
import 'next-themes';
import 'sonner';
import '@tanstack/react-form';
import 'uploadthing/server';
import '@tanstack/react-router-ssr-query';

function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx("nav", {
    role: "navigation",
    "aria-label": "pagination",
    "data-slot": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  });
}
function PaginationContent({ className, ...props }) {
  return /* @__PURE__ */ jsx("ul", {
    "data-slot": "pagination-content",
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  });
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx("li", {
    "data-slot": "pagination-item",
    ...props
  });
}
function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return /* @__PURE__ */ jsx("a", {
    "aria-current": isActive ? "page" : void 0,
    "data-slot": "pagination-link",
    "data-active": isActive,
    className: cn(buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size
    }), className),
    ...props
  });
}
function PaginationPrevious({ className, ...props }) {
  return /* @__PURE__ */ jsxs(PaginationLink, {
    "aria-label": "Go to previous page",
    size: "default",
    className: cn("gap-1 px-2.5 sm:pl-2.5", className),
    ...props,
    children: [/* @__PURE__ */ jsx(ChevronLeftIcon, {}), /* @__PURE__ */ jsx("span", {
      className: "hidden sm:block",
      children: "Previous"
    })]
  });
}
function PaginationNext({ className, ...props }) {
  return /* @__PURE__ */ jsxs(PaginationLink, {
    "aria-label": "Go to next page",
    size: "default",
    className: cn("gap-1 px-2.5 sm:pr-2.5", className),
    ...props,
    children: [/* @__PURE__ */ jsx("span", {
      className: "hidden sm:block",
      children: "Next"
    }), /* @__PURE__ */ jsx(ChevronRightIcon, {})]
  });
}
var categoryRouteApi$4 = getRouteApi("/c/$category/{-$subCategory}");
var CategoryPagination = () => {
  const { page } = categoryRouteApi$4.useSearch();
  const { pageInfo: { pageCount } } = categoryRouteApi$4.useLoaderData();
  return /* @__PURE__ */ jsx(Pagination, {
    className: "mt-6 col-span-full",
    children: /* @__PURE__ */ jsxs(PaginationContent, { children: [
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationPrevious, {
        "aria-disabled": page === 1,
        search: ((prev) => ({
          ...prev,
          page: Math.max(1, prev.page - 1)
        }))
      }) }),
      Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationLink, {
        search: ((prev) => ({
          ...prev,
          page: p
        })),
        isActive: p === page,
        children: p
      }) }, p)),
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationNext, {
        "aria-disabled": page === pageCount,
        search: ((prev) => ({
          ...prev,
          page: Math.min(pageCount, prev.page + 1)
        }))
      }) })
    ] })
  });
};
var categoryRouteApi$3 = getRouteApi("/c/$category/{-$subCategory}");
function ProductGrid() {
  const products = categoryRouteApi$3.useLoaderData();
  const loading = useRouterState().isLoading;
  const navigate = categoryRouteApi$3.useNavigate();
  if (loading) return /* @__PURE__ */ jsx("div", {
    className: "grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxs("div", {
      className: "space-y-4",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "aspect-4/5 w-full rounded-none" }),
        /* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" })]
        }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-24" })
      ]
    }, i))
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
    className: "grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  gap-1  ",
    children: products.nodes.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.slug))
  }), products.nodes.length === 0 && /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center justify-center py-16 px-4",
    children: [
      /* @__PURE__ */ jsx("div", {
        className: "rounded-full bg-muted p-4 mb-4",
        children: /* @__PURE__ */ jsx(Search, { className: "h-8 w-8 text-muted-foreground" })
      }),
      /* @__PURE__ */ jsx("h3", {
        className: "text-xl font-semibold mb-2",
        children: "No products found"
      }),
      /* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground text-center mb-6 max-w-sm",
        children: "We couldn't find any products matching your filters."
      }),
      /* @__PURE__ */ jsx(Button, {
        onClick: () => {
          navigate({ search: {
            maxPrice: 1e3,
            minPrice: 0,
            page: 1,
            pageSize: 12,
            sortBy: "alphabetical-asc"
          } });
        },
        children: "Clear Filters"
      })
    ]
  })] });
}
function Select$1({ ...props }) {
  return /* @__PURE__ */ jsx(Select.Root, {
    "data-slot": "select",
    ...props
  });
}
function SelectValue({ ...props }) {
  return /* @__PURE__ */ jsx(Select.Value, {
    "data-slot": "select-value",
    ...props
  });
}
function SelectTrigger({ className, size = "default", children, ...props }) {
  return /* @__PURE__ */ jsxs(Select.Trigger, {
    "data-slot": "select-trigger",
    "data-size": size,
    className: cn("flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", className),
    ...props,
    children: [children, /* @__PURE__ */ jsx(Select.Icon, {
      asChild: true,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" })
    })]
  });
}
function SelectContent({ className, children, position = "item-aligned", align = "center", ...props }) {
  return /* @__PURE__ */ jsx(Select.Portal, { children: /* @__PURE__ */ jsxs(Select.Content, {
    "data-slot": "select-content",
    className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
    position,
    align,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(Select.Viewport, {
        className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
        children
      }),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }) });
}
function SelectItem({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs(Select.Item, {
    "data-slot": "select-item",
    className: cn("relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
    ...props,
    children: [/* @__PURE__ */ jsx("span", {
      "data-slot": "select-item-indicator",
      className: "absolute right-2 flex size-3.5 items-center justify-center",
      children: /* @__PURE__ */ jsx(Select.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) })
    }), /* @__PURE__ */ jsx(Select.ItemText, { children })]
  });
}
function SelectScrollUpButton({ className, ...props }) {
  return /* @__PURE__ */ jsx(Select.ScrollUpButton, {
    "data-slot": "select-scroll-up-button",
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
  });
}
function SelectScrollDownButton({ className, ...props }) {
  return /* @__PURE__ */ jsx(Select.ScrollDownButton, {
    "data-slot": "select-scroll-down-button",
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
  });
}
var SORT_OPTIONS = [
  {
    value: "alphabetical-asc",
    label: "Nume: A \u2192 Z"
  },
  {
    value: "alphabetical-desc",
    label: "Nume: Z \u2192 A"
  },
  {
    value: "price-asc",
    label: "Pret: Crescator"
  },
  {
    value: "price-desc",
    label: "Price: Descrescator"
  },
  {
    value: "new-products",
    label: "Produse-noi"
  }
];
var searchRouterApi = getRouteApi("/c/$category/{-$subCategory}");
function ProductSort() {
  const navigate = searchRouterApi.useNavigate();
  const search = searchRouterApi.useSearch();
  const [filters, setFilters] = useState(search);
  useEffect(() => {
    setFilters(search);
  }, [search]);
  const updateSearch = (updates) => {
    navigate({ search: (prev) => ({
      ...prev,
      ...updates
    }) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
    id: "sortBy",
    className: "text-sm text-muted-foreground",
    children: "Sorteaza dupa:"
  }), /* @__PURE__ */ jsx("div", {
    className: "flex items-center ml-auto",
    children: /* @__PURE__ */ jsxs(Select$1, {
      value: filters.sortBy,
      onValueChange: (value) => updateSearch({ sortBy: value }),
      children: [/* @__PURE__ */ jsx(SelectTrigger, {
        className: "w-40",
        "aria-labelledby": "sortBy",
        children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select..." })
      }), /* @__PURE__ */ jsx(SelectContent, { children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsx(SelectItem, {
        value: opt.value,
        children: opt.label
      }, opt.value)) })]
    })
  })] });
}
function Checkbox$1({ className, ...props }) {
  return /* @__PURE__ */ jsx(Checkbox.Root, {
    "data-slot": "checkbox",
    className: cn("peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary", className),
    ...props,
    children: /* @__PURE__ */ jsx(Checkbox.Indicator, {
      "data-slot": "checkbox-indicator",
      className: "grid place-content-center text-current transition-none",
      children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
    })
  });
}
var categoryRouteApi$2 = getRouteApi("/c/$category/{-$subCategory}");
function ColorFilterSelector() {
  const AVAILABLE_COLORS = generatedData.links.colors_connection.nodes.map((color) => color.color_code);
  const navigate = categoryRouteApi$2.useNavigate();
  const selectedColors = categoryRouteApi$2.useSearch().colors ?? [];
  const toggleColor = (color) => {
    const newColors = selectedColors.includes(color) ? selectedColors.filter((c) => c !== color) : [...selectedColors, color];
    navigate({
      search: (prev) => ({
        ...prev,
        colors: newColors.length > 0 ? newColors : void 0,
        page: 1
      }),
      replace: true
    });
  };
  return /* @__PURE__ */ jsx("div", {
    className: "space-y-3 flex gap-2 p-1",
    children: AVAILABLE_COLORS.map((color) => {
      return /* @__PURE__ */ jsx("button", {
        onClick: () => toggleColor(color),
        className: cn("w-6 h-6 rounded-full  transition-all", selectedColors.includes(color) ? "ring-2 ring-offset-2 ring-primary" : "hover:scale-110"),
        style: { backgroundColor: color },
        "aria-label": `Select color ${color}`
      }, color);
    })
  });
}
function Slider$1({ className, defaultValue, value, min = 0, max = 100, ...props }) {
  const _values = React.useMemo(() => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max], [
    value,
    defaultValue,
    min,
    max
  ]);
  return /* @__PURE__ */ jsxs(Slider.Root, {
    "data-slot": "slider",
    defaultValue,
    value,
    min,
    max,
    className: cn("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className),
    ...props,
    children: [/* @__PURE__ */ jsx(Slider.Track, {
      "data-slot": "slider-track",
      className: cn("relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"),
      children: /* @__PURE__ */ jsx(Slider.Range, {
        "data-slot": "slider-range",
        className: cn("absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")
      })
    }), Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx(Slider.Thumb, {
      "data-slot": "slider-thumb",
      className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    }, index))]
  });
}
var categoryRouteApi$1 = getRouteApi("/c/$category/{-$subCategory}");
var PriceSliderFilter = () => {
  const search = categoryRouteApi$1.useSearch();
  const navigate = categoryRouteApi$1.useNavigate();
  const [priceRange, setPriceRange] = useState([search.minPrice || 0, search.maxPrice || 1e3]);
  useEffect(() => {
    setPriceRange([search.minPrice ?? 0, search.maxPrice ?? 1e3]);
  }, [search.minPrice, search.maxPrice]);
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-4 mt-4",
    children: [/* @__PURE__ */ jsx(Slider$1, {
      value: priceRange,
      min: 0,
      max: 1e3,
      onValueChange: (value) => setPriceRange([value[0], value[1]]),
      onValueCommit: (value) => navigate({ search: (prev) => ({
        ...prev,
        minPrice: value[0],
        maxPrice: value[1]
      }) })
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-between text-xs text-muted-foreground",
      children: [/* @__PURE__ */ jsxs("span", { children: [priceRange[0], " Lei"] }), /* @__PURE__ */ jsxs("span", { children: [priceRange[1], " Lei"] })]
    })]
  });
};
var AVAILABLE_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL"
];
var categoryRouteApi = getRouteApi("/c/$category/{-$subCategory}");
function SizeFilterSelector() {
  const navigate = categoryRouteApi.useNavigate();
  const selectedSizes = categoryRouteApi.useSearch().sizes ?? [];
  const toggleSize = (size) => {
    const newSizes = selectedSizes.includes(size) ? selectedSizes.filter((s) => s !== size) : [...selectedSizes, size];
    navigate({
      search: (prev) => ({
        ...prev,
        sizes: newSizes.length > 0 ? newSizes : void 0,
        page: 1
      }),
      replace: true
    });
  };
  return /* @__PURE__ */ jsx("div", {
    className: "space-y-3",
    children: AVAILABLE_SIZES.map((size) => {
      return /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ jsx(Checkbox$1, {
          id: size,
          checked: selectedSizes.includes(size),
          onCheckedChange: () => toggleSize(size)
        }), /* @__PURE__ */ jsx(Label$1, {
          htmlFor: size,
          className: "text-sm font-normal cursor-pointer",
          children: size
        })]
      }, size);
    })
  });
}
var materials = [
  {
    id: "leather",
    label: "Leather",
    value: "leather"
  },
  {
    id: "suede",
    label: "Suede",
    value: "suede"
  },
  {
    id: "canvas",
    label: "Canvas",
    value: "canvas"
  },
  {
    id: "mesh",
    label: "Mesh",
    value: "mesh"
  },
  {
    id: "synthetic",
    label: "Synthetic",
    value: "synthetic"
  }
];
function ProductFilters() {
  return /* @__PURE__ */ jsx("div", {
    className: "w-full ",
    children: /* @__PURE__ */ jsxs(Accordion$1, {
      type: "multiple",
      defaultValue: [
        "price",
        "color",
        "size",
        "material"
      ],
      className: "w-full",
      children: [
        /* @__PURE__ */ jsxs(AccordionItem, {
          value: "price",
          children: [/* @__PURE__ */ jsx(AccordionTrigger, { children: "Pret" }), /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx(PriceSliderFilter, {}) })]
        }),
        /* @__PURE__ */ jsxs(AccordionItem, {
          value: "color",
          children: [/* @__PURE__ */ jsx(AccordionTrigger, { children: "Culoare" }), /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx(ColorFilterSelector, {}) })]
        }),
        /* @__PURE__ */ jsxs(AccordionItem, {
          value: "size",
          children: [/* @__PURE__ */ jsx(AccordionTrigger, { children: "Marime" }), /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx(SizeFilterSelector, {}) })]
        }),
        /* @__PURE__ */ jsxs(AccordionItem, {
          value: "material",
          children: [/* @__PURE__ */ jsx(AccordionTrigger, { children: "Material (experimental)" }), /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx("div", {
            className: "space-y-3",
            children: materials.map((material) => /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Checkbox$1, { id: material.id }), /* @__PURE__ */ jsx(Label$1, {
                htmlFor: material.id,
                className: "text-sm font-normal cursor-pointer",
                children: material.label
              })]
            }, material.id))
          }) })]
        })
      ]
    })
  });
}
function RouteComponent() {
  const data = Route.useLoaderData();
  const params = Route.useParams();
  return /* @__PURE__ */ jsx("main", {
    className: "flex-1 min-h-screen bg-background",
    children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs("div", {
        className: "mb-8 md:mb-12",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl mb-1  tracking-tight md:text-4xl text-balance",
          children: params.subCategory ? slugToTitle(params.subCategory) : slugToTitle(params.category)
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-xs tracking-widest text-muted-foreground uppercase mb-4",
          children: [
            /* @__PURE__ */ jsx(Link, {
              to: "/",
              children: "Acasa"
            }),
            " / ",
            /* @__PURE__ */ jsx(Link, {
              to: `/c/${params.category}`,
              search: true,
              params,
              from: "/c/$category/{-$subCategory}",
              children: params.category
            }),
            " ",
            params.subCategory ? /* @__PURE__ */ jsxs(Link, {
              to: "/c/$category/{-$subCategory}",
              search: true,
              params,
              from: "/c/$category/{-$subCategory}",
              children: ["/ ", slugToTitle(params.subCategory)]
            }) : null
          ]
        })]
      }),
      /* @__PURE__ */ jsx("div", {
        className: "mb-6 lg:hidden",
        children: /* @__PURE__ */ jsxs(Sheet, { children: [/* @__PURE__ */ jsx(SheetTrigger, {
          asChild: true,
          children: /* @__PURE__ */ jsxs(Button, {
            variant: "outline",
            className: "w-full",
            children: [/* @__PURE__ */ jsx(SlidersHorizontalIcon, { className: "mr-2 h-4 w-4" }), "Filtre"]
          })
        }), /* @__PURE__ */ jsxs(SheetContent, {
          side: "left",
          children: [/* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: "Filtre" }) }), /* @__PURE__ */ jsx("div", {
            className: "mt-6 px-8",
            children: /* @__PURE__ */ jsx(ProductFilters, {})
          })]
        })] })
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col md:flex-row gap-8",
        children: [/* @__PURE__ */ jsx("aside", {
          className: "hidden lg:block w-64 shrink-0",
          children: /* @__PURE__ */ jsx(ProductFilters, {})
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex-1",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between mb-6",
            children: [/* @__PURE__ */ jsxs("p", {
              className: "text-sm text-muted-foreground",
              children: ["Produse gasite: ", data.pageInfo.total]
            }), /* @__PURE__ */ jsx("div", {
              className: "flex items-center gap-2",
              children: /* @__PURE__ */ jsx(ProductSort, {})
            })]
          }), /* @__PURE__ */ jsx(ProductGrid, {})]
        })]
      }),
      /* @__PURE__ */ jsx(CategoryPagination, {})
    ] })
  });
}

export { RouteComponent as component };
//# sourceMappingURL=_category._-_subCategory_-CqX8rAoC.mjs.map
