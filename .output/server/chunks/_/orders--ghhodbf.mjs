import { f as formatPrice, g as getStrapiMedia, c as cn } from './utils-D6pEwd0q.mjs';
import { C as Container } from './router-DVmJmQLB.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-7KWXlboP.mjs';
import { Link, getRouteApi } from '@tanstack/react-router';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { Clock } from 'lucide-react';
import { Slot } from 'radix-ui';
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
var statusConfigs = {
  processing: {
    label: "\xCEn procesare",
    className: "bg-muted text-muted-foreground border-border",
    icon: /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" })
  }};
var orderRoute = getRouteApi("/orders/");
function OrdersList() {
  const data = orderRoute.useLoaderData();
  return /* @__PURE__ */ jsx("main", {
    className: "flex-1 min-h-screen",
    children: /* @__PURE__ */ jsxs(Container, {
      className: "font-sans text-foreground",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "text-xs text-muted-foreground mb-3 tracking-wide",
            children: [
              "Acas\u0103 >",
              " ",
              /* @__PURE__ */ jsx("span", {
                className: "text-foreground font-medium",
                children: "Comenzi"
              })
            ]
          }),
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl md:text-3xl font-semibold tracking-tight",
            children: "Comenzile tale"
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm text-muted-foreground mt-1",
            children: "Gestioneaz\u0103 \u0219i urm\u0103re\u0219te comenzile \u0219i configura\u021Biile hardware recente."
          })
        ]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex flex-col gap-4",
        children: data.map((order) => {
          const status = statusConfigs.processing;
          return /* @__PURE__ */ jsx(Link, {
            to: "/orders/$id",
            params: { id: String(order.id) },
            children: /* @__PURE__ */ jsxs(Card, {
              className: "\r\n                                    border-border\r\n                                    bg-card\r\n                                    shadow-sm\r\n                                    hover:border-primary/40\r\n                                    transition-colors\r\n                                    ",
              children: [/* @__PURE__ */ jsxs(CardHeader, {
                className: "\r\n                                        p-6 pb-4\r\n                                        flex flex-col\r\n                                        sm:flex-row\r\n                                        sm:items-center\r\n                                        sm:justify-between\r\n                                        gap-4\r\n                                        space-y-0\r\n                                        ",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-1",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [/* @__PURE__ */ jsxs(CardTitle, {
                      className: "text-base font-semibold",
                      children: ["Comanda #", order.id]
                    }), /* @__PURE__ */ jsxs(Badge, {
                      variant: "outline",
                      className: `
                                                    flex items-center gap-1.5
                                                    px-2.5 py-0.5
                                                    text-xs
                                                    font-medium
                                                    rounded-full
                                                    shadow-none
                                                    ${status.className}
                                                    `,
                      children: [status.icon, status.label]
                    })]
                  }), /* @__PURE__ */ jsxs(CardDescription, { children: [
                    "Plasat\u0103 \xEEn data de",
                    " ",
                    order.createdAt.toLocaleDateString("ro-RO")
                  ] })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "sm:text-right",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-xs text-muted-foreground block",
                    children: "Valoare total\u0103"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-lg font-bold",
                    children: formatPrice(Number(order.total))
                  })]
                })]
              }), /* @__PURE__ */ jsx(CardContent, {
                className: "\r\n                                        flex flex-col\r\n                                        sm:flex-row\r\n                                        sm:items-center\r\n                                        sm:justify-between\r\n                                        gap-6\r\n                                        ",
                children: /* @__PURE__ */ jsx("div", {
                  className: "flex items-center gap-3 flex-wrap",
                  children: order.products.map((p, idx) => /* @__PURE__ */ jsx("div", {
                    className: "\r\n                                                    w-12 h-12\r\n                                                    bg-muted\r\n                                                    border-border\r\n                                                    border\r\n                                                    rounded-lg\r\n                                                    flex items-center\r\n                                                    justify-center\r\n                                                    overflow-hidden\r\n                                                    ",
                    children: /* @__PURE__ */ jsx("img", {
                      className: "object-cover w-full h-full",
                      src: getStrapiMedia(p.variant.media[0].url || "")
                    })
                  }, idx))
                })
              })]
            })
          }, order.id);
        })
      })]
    })
  });
}
function RouteComponent() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(OrdersList, {}) });
}

export { RouteComponent as component };
//# sourceMappingURL=orders--ghhodbf.mjs.map
