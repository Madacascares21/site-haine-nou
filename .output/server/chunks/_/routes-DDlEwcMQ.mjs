import { c as cn, g as getStrapiMedia, a as getProductsServerFunc, d as featuredProductsServerFunc, e as bestPriceServerFunc } from './utils-D6pEwd0q.mjs';
import { n as navigation } from './nodemailer-D4bWEl0n.mjs';
import { C as Container, b as buttonVariants } from './router-DVmJmQLB.mjs';
import { C as Carousel, a as CarouselContent, b as CarouselItem, c as CarouselPrevious, d as CarouselNext, P as ProductCarouselLayout, e as CarouselProductList } from './product-carousel-layout-DGhrKuby.mjs';
import * as React from 'react';
import { Link, useRouter, isRedirect } from '@tanstack/react-router';
import { jsxs, jsx } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { Star, ArrowRight, Truck } from 'lucide-react';
import { Tabs } from 'radix-ui';
import { useQuery } from '@tanstack/react-query';
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
import 'nodemailer';
import './kysely-adapter-2JZcyMF-.mjs';
import 'node:fs/promises';
import 'node:os';
import './schema-DNbTVeE0.mjs';
import 'zustand';
import 'zustand/middleware';
import './constants-BaiN9-he.mjs';
import 'next-themes';
import 'sonner';
import '@tanstack/react-form';
import 'uploadthing/server';
import '@tanstack/react-router-ssr-query';
import './product-card-CKxu8irN.mjs';
import 'embla-carousel-react';
import 'embla-carousel-autoplay';

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
var CONTACTS = {
  whatsapp: "https://wa.me/0791687852?text=Bun\u0103!%20A\u0219%20dori%20un%20tricou%20personalizat",
  instagram: "https://instagram.com/auxload",
  email: "hello@yourbrand.com"
};
function WhatsAppIcon(props) {
  return /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    ...props,
    children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
  });
}
function InstagramIcon(props) {
  return /* @__PURE__ */ jsxs("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...props,
    children: [
      /* @__PURE__ */ jsx("rect", {
        x: "2",
        y: "2",
        width: "20",
        height: "20",
        rx: "5",
        ry: "5"
      }),
      /* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
      /* @__PURE__ */ jsx("line", {
        x1: "17.5",
        y1: "6.5",
        x2: "17.51",
        y2: "6.5"
      })
    ]
  });
}
function EmailIcon(props) {
  return /* @__PURE__ */ jsxs("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...props,
    children: [/* @__PURE__ */ jsx("rect", {
      x: "2",
      y: "4",
      width: "20",
      height: "16",
      rx: "2"
    }), /* @__PURE__ */ jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })]
  });
}
var SOCIALS = [
  {
    label: "WhatsApp",
    href: CONTACTS.whatsapp,
    handle: "Discut\u0103 pe chat",
    Icon: WhatsAppIcon
  },
  {
    label: "Instagram",
    href: CONTACTS.instagram,
    handle: "@auxload",
    Icon: InstagramIcon
  },
  {
    label: "Email",
    href: `mailto:${CONTACTS.email}`,
    handle: CONTACTS.email,
    Icon: EmailIcon
  }
];
function CollaborateSection() {
  return /* @__PURE__ */ jsx("section", {
    id: "collaborate",
    className: "w-full bg-background px-4 py-20 md:py-28",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto flex max-w-3xl flex-col items-center text-center",
      children: [
        /* @__PURE__ */ jsx("span", {
          className: "mb-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground",
          children: "Hai s\u0103 cre\u0103m ceva"
        }),
        /* @__PURE__ */ jsx("h2", {
          className: "text-balance text-3xl font-bold tracking-tight md:text-5xl",
          children: "Vrei un tricou personalizat sau o colaborare?"
        }),
        /* @__PURE__ */ jsx("p", {
          className: "mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg",
          children: "Fie c\u0103 ai \xEEn minte un design personalizat sau vrei s\u0103 facem echip\u0103 pentru un proiect, mi-ar pl\u0103cea s\u0103 aud de tine. Contacteaz\u0103-m\u0103 pe oricare dintre canalele mele \u0219i hai s\u0103 d\u0103m via\u021B\u0103 ideii tale."
        }),
        /* @__PURE__ */ jsx("div", {
          className: "mt-10 grid w-full gap-4 sm:grid-cols-3",
          children: SOCIALS.map(({ label, href, handle, Icon }) => /* @__PURE__ */ jsxs("a", {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-card-foreground transition-colors hover:border-foreground/30 hover:bg-accent",
            children: [
              /* @__PURE__ */ jsx("span", {
                className: "flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105",
                children: /* @__PURE__ */ jsx(Icon, { className: "size-6" })
              }),
              /* @__PURE__ */ jsx("span", {
                className: "font-semibold",
                children: label
              }),
              /* @__PURE__ */ jsx("span", {
                className: "text-sm text-muted-foreground",
                children: handle
              })
            ]
          }, label))
        })
      ]
    })
  });
}
function MainHero() {
  return /* @__PURE__ */ jsxs("section", {
    className: "relative overflow-hidden bg-background",
    children: [
      /* @__PURE__ */ jsx("span", {
        "aria-hidden": "true",
        className: "pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-display text-[22vw] leading-none text-foreground/[0.03] lg:block",
        children: "VOLT"
      }),
      /* @__PURE__ */ jsx("div", {
        className: "border-b border-border",
        children: /* @__PURE__ */ jsxs(Container, {
          className: "mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary",
          children: [
            /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 fill-current" }),
            "Colec\u021Bia 004 \u2014 Polar Heavyweight \u2014 Disponibil\u0103 acum",
            /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 fill-current" })
          ]
        })
      }),
      /* @__PURE__ */ jsxs(Container, {
        className: "grid  grid-cols-1 items-center gap-10  lg:grid-cols-2 lg:gap-8 ",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "relative z-10 flex flex-col items-start",
          children: [
            /* @__PURE__ */ jsx("span", {
              className: "inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground",
              children: "Colec\u021Bie Nou\u0103"
            }),
            /* @__PURE__ */ jsxs("h1", {
              className: "mt-6 font-display text-6xl uppercase leading-[0.9] tracking-tight text-balance sm:text-7xl lg:text-8xl",
              children: [
                "Creat pentru a",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", {
                  className: "text-primary",
                  children: "IMPESIONA."
                })
              ]
            }),
            /* @__PURE__ */ jsx("p", {
              className: "mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty",
              children: "Polar periat de 500 gsm. Croial\u0103 oversized, boxy. Conceput s\u0103 reziste uzurii \u0219i s\u0103 arate impecabil \xEEn orice moment. Aceasta este Colec\u021Bia 004."
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "mt-8 flex flex-wrap items-center gap-3",
              children: [/* @__PURE__ */ jsxs(Link, {
                to: "/c/$category/{-$subCategory}",
                params: { category: "barbati" },
                search: (s) => ({
                  ...s,
                  page: s.page ?? 1,
                  pageSize: s.pageSize ?? 24,
                  sortBy: s.sortBy ?? "new-products",
                  minPrice: s.minPrice ?? 0,
                  maxPrice: s.maxPrice ?? 1e4
                }),
                className: buttonVariants({ variant: "default" }),
                children: ["Cump\u0103r\u0103 colec\u021Bia", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
              }), /* @__PURE__ */ jsx(Link, {
                to: "/c/$category/{-$subCategory}",
                params: { category: "produse-noi" },
                search: (s) => ({
                  ...s,
                  category: "barbati",
                  subCategory: "tricouri",
                  page: s.page ?? 1,
                  pageSize: s.pageSize ?? 24,
                  sortBy: s.sortBy ?? "new-products",
                  minPrice: s.minPrice ?? 0,
                  maxPrice: s.maxPrice ?? 1e4
                }),
                className: buttonVariants({ variant: "outline" }),
                children: "Vezi lookbook-ul"
              })]
            }),
            /* @__PURE__ */ jsx("div", {
              className: "mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground",
              children: /* @__PURE__ */ jsxs("span", {
                className: "inline-flex items-center gap-2",
                children: [/* @__PURE__ */ jsx(Truck, { className: "h-4 w-4 text-primary" }), "Transport gratuit pentru comenzi peste 500 lei"]
              })
            })
          ]
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative ",
          children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-x-4 bottom-6 top-10 -rotate-2 rounded-3xl bg-primary/90" }), /* @__PURE__ */ jsxs("div", {
            className: "relative grid grid-cols-3 grid-rows-2 gap-3",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "relative col-span-2 row-span-3 overflow-hidden rounded-3xl border border-border bg-card",
                children: [/* @__PURE__ */ jsx("img", {
                  src: "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/Whats_App_Image_2026_07_04_at_9_51_57_PM_9f7fb62b47.jpeg",
                  alt: "Hanorac VOLT Drop 004 charcoal heavyweight",
                  width: 900,
                  height: 600,
                  className: "h-full w-full object-cover"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-border bg-background/85 px-4 py-3 backdrop-blur",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "font-display text-2xl leading-none text-primary",
                    children: "489 lei"
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "text-xs uppercase leading-tight tracking-wide text-muted-foreground",
                    children: [
                      "Hanorac",
                      /* @__PURE__ */ jsx("br", {}),
                      "Heavyweight"
                    ]
                  })]
                })]
              }),
              /* @__PURE__ */ jsx("div", {
                className: "relative overflow-hidden rounded-2xl border border-border bg-card",
                children: /* @__PURE__ */ jsx("img", {
                  src: "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_3_d3e59b63b8.webp",
                  alt: "Hanorac VOLT heavyweight alb ivoire",
                  width: 400,
                  height: 400,
                  className: "h-full w-full object-cover"
                })
              }),
              /* @__PURE__ */ jsx("div", {
                className: "relative overflow-hidden rounded-2xl border border-border bg-card",
                children: /* @__PURE__ */ jsx("img", {
                  src: "https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_52f8e7fe91.webp",
                  alt: "Model purt\xE2nd hanoracul VOLT charcoal cu gluga tras\u0103",
                  width: 400,
                  height: 400,
                  className: "h-full w-full object-cover"
                })
              })
            ]
          })]
        })]
      })
    ]
  });
}
var HeroCarousel = () => {
  return /* @__PURE__ */ jsx("section", {
    className: "",
    children: /* @__PURE__ */ jsxs(Carousel, {
      className: "w-full",
      children: [
        /* @__PURE__ */ jsx(CarouselContent, { children: /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx(MainHero, {}) }) }),
        /* @__PURE__ */ jsx(CarouselPrevious, { className: "left-4" }),
        /* @__PURE__ */ jsx(CarouselNext, { className: "right-4" })
      ]
    })
  });
};
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
function CategoryGrid({ items, gender }) {
  return /* @__PURE__ */ jsx("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-6",
    children: items.map((cat) => /* @__PURE__ */ jsxs(Link, {
      to: "/c/$category/{-$subCategory}",
      params: {
        category: gender,
        subCategory: cat.label
      },
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
            children: "Explore \u2192"
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
      className: "text-2xl font-semibold mb-4",
      children: "Categorii de haine"
    }), /* @__PURE__ */ jsxs(Tabs$1, {
      defaultValue: tabs[0]?.label,
      children: [/* @__PURE__ */ jsx(TabsList, {
        className: "bg-black/20",
        children: tabs.map((tab) => /* @__PURE__ */ jsx(TabsTrigger, {
          value: tab.label,
          children: tab.label === "barbati" ? "B\u0103rba\u021Bi" : "Femei"
        }, tab.label))
      }), tabs.map((tab) => /* @__PURE__ */ jsx(TabsContent, {
        value: tab.label,
        children: /* @__PURE__ */ jsx(CategoryGrid, {
          items: tab.children ?? [],
          gender: tab.label
        })
      }, tab.label))]
    })] })
  });
}
var BestPrice = () => {
  const getProducts = useServerFn(bestPriceServerFunc);
  const { data, isPending } = useQuery({
    queryKey: ["best-price-products"],
    queryFn: () => getProducts(),
    staleTime: 600 * 1e3
  });
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(ProductCarouselLayout, {
    label: "Promotii",
    subCategory: "promotii",
    category: "colectii",
    children: /* @__PURE__ */ jsx(CarouselProductList, {
      data,
      isPending
    })
  }) });
};
var NewProducts = () => {
  const getProducts = useServerFn(getProductsServerFunc);
  const { data, isPending } = useQuery({
    queryKey: ["new-products"],
    queryFn: () => getProducts(),
    staleTime: 600 * 1e3
  });
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(ProductCarouselLayout, {
    label: "Produse Noi",
    category: "produse-noi",
    children: /* @__PURE__ */ jsx(CarouselProductList, {
      data,
      isPending
    })
  }) });
};
var FeaturedProducts = () => {
  const getProducts = useServerFn(featuredProductsServerFunc);
  const { data, isPending } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => getProducts(),
    staleTime: 600 * 1e3
  });
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(ProductCarouselLayout, {
    label: "Special Alese",
    category: "colectii",
    subCategory: "featured",
    children: /* @__PURE__ */ jsx(CarouselProductList, {
      data,
      isPending
    })
  }) });
};
function Home() {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(HeroCarousel, {}),
    /* @__PURE__ */ jsx(CategoryBannerSection, {}),
    /* @__PURE__ */ jsx(NewProducts, {}),
    /* @__PURE__ */ jsx(FeaturedProducts, {}),
    /* @__PURE__ */ jsx(BestPrice, {}),
    /* @__PURE__ */ jsx(CollaborateSection, {})
  ] });
}

export { Home as component };
//# sourceMappingURL=routes-DDlEwcMQ.mjs.map
