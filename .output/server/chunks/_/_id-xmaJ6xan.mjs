import { g as getStrapiMedia, f as formatPrice, c as cn } from './utils-D6pEwd0q.mjs';
import { C as Container, i as Separator$1 } from './router-DVmJmQLB.mjs';
import { C as Card, a as CardHeader, d as CardContent } from './card-7KWXlboP.mjs';
import { getRouteApi } from '@tanstack/react-router';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Info } from 'lucide-react';
import { Tooltip } from 'radix-ui';
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
import 'react';
import 'zustand';
import 'zustand/middleware';
import './constants-BaiN9-he.mjs';
import '@tanstack/react-query';
import 'next-themes';
import 'sonner';
import '@tanstack/react-form';
import 'uploadthing/server';
import '@tanstack/react-router-ssr-query';

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
function OrderDetails() {
  const order = getRouteApi("/orders/$id").useLoaderData();
  return /* @__PURE__ */ jsx("main", {
    className: "flex-1 min-h-screen",
    children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(Container, {
      className: "p-0",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "p-8",
        children: [
          /* @__PURE__ */ jsxs(CardHeader, {
            className: "px-0 pt-0 pb-6",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "text-xs text-muted-foreground mb-3 tracking-wide",
                children: [
                  "Acas\u0103 > Comenzi >",
                  " ",
                  /* @__PURE__ */ jsxs("span", {
                    className: "text-foreground font-medium",
                    children: ["ID ", order.id]
                  })
                ]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4",
                children: [/* @__PURE__ */ jsxs("h1", {
                  className: "text-2xl md:text-3xl font-semibold tracking-tight",
                  children: ["Comand\u0103 ID: ", order.id]
                }), /* @__PURE__ */ jsx("div", { className: "flex gap-2.5" })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "flex gap-6 mt-4 text-sm text-muted-foreground",
                children: [/* @__PURE__ */ jsxs("span", { children: [
                  "Data comenzii:",
                  " ",
                  /* @__PURE__ */ jsx("strong", {
                    className: "text-foreground font-medium",
                    children: order.createdAt.toLocaleString("ro-RO", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  })
                ] }), /* @__PURE__ */ jsxs("span", {
                  className: "flex items-center gap-1.5 text-primary font-medium",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "inline-block transform -rotate-45",
                    children: "\u2708"
                  }), "Livrare estimat\u0103: \u201Eunknown\u201D"]
                })]
              })
            ]
          }),
          /* @__PURE__ */ jsx(Separator$1, { className: "border-border" }),
          /* @__PURE__ */ jsx(CardContent, {
            className: "px-0 py-6 flex flex-col gap-6 ",
            children: order.products.map((product) => /* @__PURE__ */ jsxs("div", {
              className: "flex gap-5 items-center ",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-16 h-16 bg-muted border border-border rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden",
                children: /* @__PURE__ */ jsx("img", {
                  className: "w-full h-full object-cover",
                  src: getStrapiMedia(product.variant.media[0].url),
                  alt: product.product.name
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex justify-between items-center w-full",
                children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-base font-medium text-foreground",
                  children: product.product.name
                }), /* @__PURE__ */ jsxs("div", {
                  className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className: "inline-block h-3 w-3 rounded-full border border-border",
                      style: { backgroundColor: product.variant.color.color_code }
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "capitalize",
                      children: product.variant.color.name
                    }),
                    /* @__PURE__ */ jsx("span", { children: "\xB7" }),
                    /* @__PURE__ */ jsxs("span", { children: ["M\u0103rime ", product.variant.size.name] })
                  ]
                })] }), /* @__PURE__ */ jsxs("div", {
                  className: "text-right",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "block text-base font-semibold text-foreground",
                    children: formatPrice(product.product.pricing.final_price)
                  }), /* @__PURE__ */ jsxs("span", {
                    className: "text-xs text-muted-foreground",
                    children: ["Cantitate: ", product.quantity]
                  })]
                })]
              })]
            }, product.product.documentId))
          }),
          /* @__PURE__ */ jsx(Separator$1, { className: "border-border" }),
          /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pt-8",
            children: [/* @__PURE__ */ jsx("div", {
              className: "md:col-span-7 flex flex-col justify-between gap-10",
              children: /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-2 gap-6",
                children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-sm font-semibold text-foreground mb-3",
                  children: "Plat\u0103"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-sm text-muted-foreground",
                  children: order.paymentMethod
                })] }), /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", {
                    className: "text-sm font-semibold text-foreground mb-3",
                    children: "Livrare"
                  }),
                  /* @__PURE__ */ jsxs("address", {
                    className: "not-italic text-sm text-muted-foreground leading-relaxed space-y-0.5",
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
                      className: "text-xs text-muted-foreground",
                      children: "Metod\u0103 de livrare"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm text-foreground mt-0.5",
                      children: order.shippingMethod
                    })]
                  })
                ] })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "md:col-span-5",
              children: [
                /* @__PURE__ */ jsx("h3", {
                  className: "text-sm font-semibold text-foreground mb-4",
                  children: "Rezumat comand\u0103"
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "space-y-3 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex justify-between",
                      children: [/* @__PURE__ */ jsx("span", { children: "Subtotal" }), /* @__PURE__ */ jsx("span", {
                        className: "text-foreground font-medium",
                        children: formatPrice(Number(order.total))
                      })]
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex justify-between items-center",
                      children: [/* @__PURE__ */ jsxs("span", {
                        className: "flex items-center gap-1",
                        children: ["Livrare", /* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
                          asChild: true,
                          children: /* @__PURE__ */ jsx(Info, { className: "w-3.5 h-3.5 text-muted-foreground cursor-help" })
                        }), /* @__PURE__ */ jsx(TooltipContent, { children: "Calcul standard transport" })] })]
                      }), /* @__PURE__ */ jsx("span", {
                        className: "text-foreground font-medium",
                        children: formatPrice(0)
                      })]
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex justify-between items-center",
                      children: [/* @__PURE__ */ jsxs("span", {
                        className: "flex items-center gap-1",
                        children: ["Taxe", /* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
                          asChild: true,
                          children: /* @__PURE__ */ jsx(Info, { className: "w-3.5 h-3.5 text-muted-foreground cursor-help" })
                        }), /* @__PURE__ */ jsx(TooltipContent, { children: "TVA / taxe calculate" })] })]
                      }), /* @__PURE__ */ jsxs("span", {
                        className: "text-foreground font-medium",
                        children: [formatPrice(0), " ;)"]
                      })]
                    })
                  ]
                }),
                /* @__PURE__ */ jsx(Separator$1, { className: "border-border my-4 border-dashed" }),
                /* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between items-center",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-base font-medium text-foreground",
                    children: "Total"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-2xl font-bold tracking-tight text-foreground",
                    children: formatPrice(Number(order.total))
                  })]
                })
              ]
            })]
          })
        ]
      })
    }) })
  });
}
function RouteComponent() {
  return /* @__PURE__ */ jsx("div", {
    className: "p-6",
    children: /* @__PURE__ */ jsx(OrderDetails, {})
  });
}

export { RouteComponent as component };
//# sourceMappingURL=_id-xmaJ6xan.mjs.map
