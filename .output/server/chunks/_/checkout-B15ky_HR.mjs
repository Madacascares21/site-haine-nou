import { c as createServerFn } from '../virtual/entry.mjs';
import { c as createSsrRpc } from './auth.functions-CXVcUiC-.mjs';
import { c as checkoutSchema, o as orderFieldsSchema } from './schema-DMuWdX5T.mjs';
import { g as getStrapiMedia, f as formatPrice, c as cn } from './utils-D6pEwd0q.mjs';
import { g as Skeleton, u as useCartStore, L as Label$1, I as Input, e as FieldError, B as Button, h as useCartProducts, i as Separator$1 } from './router-DVmJmQLB.mjs';
import { useNavigate } from '@tanstack/react-router';
import { jsxs, jsx } from 'react/jsx-runtime';
import { ShoppingBag, Truck, CreditCard, Loader2, ImageOff, AlertCircle, CircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup } from 'radix-ui';
import { useForm } from '@tanstack/react-form';
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
import 'zod';
import 'react-phone-number-input';
import './product.query-BBHo8rfv.mjs';
import 'graphql-request';
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
import 'uploadthing/server';
import '@tanstack/react-router-ssr-query';

function OrderSummary() {
  const { items, products, isLoading, queryResult } = useCartProducts();
  const isAnyLoading = queryResult.isLoading || queryResult.isFetching;
  const subtotal = products.reduce((sum, item) => {
    const product = item.product;
    const variant = product?.variants_connection?.nodes?.find((v) => v.documentId === item.variantId);
    const stockQty = variant?.qty ?? 0;
    if (!((variant?.available ?? true) && stockQty > 0)) return sum;
    return sum + (product?.pricing?.final_price ?? 0) * item.quantity;
  }, 0);
  const totalCost = subtotal + 0 + 0;
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
        children: products.map((item) => {
          const product = item.product;
          const variant = product?.variants_connection?.nodes?.find((v) => v.documentId === item.variantId);
          const stockQty = variant?.qty ?? 0;
          const isAvailable = (variant?.available ?? true) && stockQty > 0;
          const productName = product?.name || "Se \xEEncarc\u0103 produsul...";
          const imageUrl = variant?.media?.[0]?.url;
          const finalPrice = product?.pricing?.final_price ?? 0;
          const originalPrice = product?.pricing?.original_price ?? 0;
          return /* @__PURE__ */ jsxs("li", {
            className: `flex gap-4 transition-all relative ${!isAvailable ? "opacity-50 grayscale-[30%]" : ""}`,
            children: [
              isAnyLoading && /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center z-10",
                children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" })
              }),
              /* @__PURE__ */ jsx("div", {
                className: "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted flex items-center justify-center",
                children: imageUrl ? /* @__PURE__ */ jsx("img", {
                  src: getStrapiMedia(imageUrl),
                  alt: productName,
                  className: "object-cover h-full w-full"
                }) : /* @__PURE__ */ jsx(ImageOff, { className: "h-4 w-4 text-muted-foreground/60" })
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "flex min-w-0 flex-1 flex-col",
                children: [
                  /* @__PURE__ */ jsxs("div", {
                    className: "flex items-start justify-between gap-2",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "truncate max-w-[200px] text-sm font-medium text-card-foreground",
                      children: productName
                    }), !isAvailable && /* @__PURE__ */ jsxs("span", {
                      className: "inline-flex items-center gap-1 shrink-0 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive",
                      children: [/* @__PURE__ */ jsx(AlertCircle, { className: "h-2.5 w-2.5" }), "Indisponibil"]
                    })]
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
                    children: [
                      variant?.color?.color_code && /* @__PURE__ */ jsx("span", {
                        className: "inline-block h-3 w-3 rounded-full border",
                        style: { backgroundColor: variant.color.color_code }
                      }),
                      variant?.color?.name && /* @__PURE__ */ jsx("span", {
                        className: "capitalize",
                        children: variant.color.name
                      }),
                      /* @__PURE__ */ jsx("span", {
                        "aria-hidden": "true",
                        children: "\xB7"
                      }),
                      /* @__PURE__ */ jsxs("span", { children: ["M\u0103rime ", variant?.size?.name || "N/A"] })
                    ]
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "mt-auto flex items-center justify-between pt-2",
                    children: [/* @__PURE__ */ jsxs("span", {
                      className: "px-2 py-0.5 text-xs font-medium border rounded-md bg-background text-muted-foreground",
                      children: [
                        item.quantity,
                        " ",
                        /* @__PURE__ */ jsx("span", {
                          className: "text-[10px]",
                          children: "x"
                        })
                      ]
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
        children: "Co\u0219ul t\u0103u este gol."
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
            className: "font-medium",
            children: formatPrice(subtotal)
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between",
          children: [/* @__PURE__ */ jsx("dt", {
            className: "text-muted-foreground",
            children: "Livrare"
          }), /* @__PURE__ */ jsx("dd", {
            className: "font-medium",
            children: "Gratuit"
          })]
        })]
      }),
      /* @__PURE__ */ jsx(Separator$1, { className: "my-6" }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-baseline justify-between",
        children: [/* @__PURE__ */ jsx("span", {
          className: "text-base font-semibold",
          children: "Total"
        }), /* @__PURE__ */ jsx("span", {
          className: "text-xl font-bold",
          children: formatPrice(totalCost)
        })]
      })
    ]
  });
}
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
var createOrderServerFn = createServerFn({ method: "POST" }).validator(orderFieldsSchema).handler(createSsrRpc("8c801c6e7f19e976f6d9810e98c2e7ad8b2015e92eab0286851dc2f4e9da39a9"));
var shippingOptions = [{
  id: "standard",
  label: "Livrare standard",
  description: "2-4 zile lucr\u0103toare",
  price: 19.99
}, {
  id: "free",
  label: "Livrare in Breaza",
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
      if (items.length === 0) return toast.error("Trebuie sa ai cel putin un produs in cos!");
      const response = await createOrderServerFn({ data: {
        ...value,
        cartItems: items
      } });
      if (response.success) {
        toast.success(response.message);
        navigate({
          to: "/orders",
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
            children: "Adres\u0103 de livrare"
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 grid gap-4",
            children: [/* @__PURE__ */ jsx(form.Field, {
              name: "address",
              children: (field) => /* @__PURE__ */ jsxs("div", {
                className: "grid gap-2",
                children: [
                  /* @__PURE__ */ jsx(Label$1, {
                    htmlFor: field.name,
                    children: "Adres\u0103"
                  }),
                  /* @__PURE__ */ jsx(Input, {
                    id: field.name,
                    placeholder: "Strad\u0103, num\u0103r",
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
                      children: "Ora\u0219"
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
                      children: "Cod po\u0219tal"
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
              children: "Metod\u0103 de livrare"
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
              children: "Plat\u0103"
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
            children: isSubmitting ? "Se trimite..." : "Plaseaz\u0103 comanda"
          })
        })
      ]
    })
  });
}
function CheckoutPage() {
  return /* @__PURE__ */ jsxs("main", {
    className: "bg-background z-30 flex-1 ",
    children: [/* @__PURE__ */ jsx("header", {
      className: "border-b border-border",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto flex max-w-6xl items-center gap-2 px-4 py-5",
        children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5 text-foreground" }), /* @__PURE__ */ jsx("span", {
          className: "text-base font-semibold text-foreground",
          children: "Finalizare comand\u0103"
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
function CheckoutSkeleton() {
  return /* @__PURE__ */ jsx("div", {
    className: "w-full flex-1 max-w-6xl mx-auto p-6 bg-[#121212] text-white min-h-screen",
    children: /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-2 space-y-6",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-24 bg-zinc-800" }),
              " ",
              /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-2 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" }),
                    " ",
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" }),
                    " "
                  ]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
                })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-14 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
              })
            ]
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-36 bg-zinc-800" }),
              /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-14 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-3 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "col-span-2 space-y-2",
                  children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-10 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
                })]
              })
            ]
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-40 bg-zinc-800" }),
              /* @__PURE__ */ jsxs("div", {
                className: "p-4 rounded-lg border border-blue-900/50 bg-blue-950/20 flex justify-between items-center",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4 rounded-full bg-blue-800" }),
                    " ",
                    /* @__PURE__ */ jsxs("div", {
                      className: "space-y-2",
                      children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-28 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20 bg-zinc-800" })]
                    })
                  ]
                }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "p-4 rounded-lg border border-zinc-800 bg-zinc-900/20 flex justify-between items-center",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4 rounded-full bg-zinc-800" }), /* @__PURE__ */ jsxs("div", {
                    className: "space-y-2",
                    children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24 bg-zinc-800" })]
                  })]
                }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12 bg-zinc-800" })]
              })
            ]
          })
        ]
      }), /* @__PURE__ */ jsx("div", {
        className: "lg:col-span-1",
        children: /* @__PURE__ */ jsxs("div", {
          className: "p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-6 sticky top-6",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [
                /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-28 bg-zinc-800" }),
                " ",
                /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" }),
                "  "
              ]
            }),
            /* @__PURE__ */ jsx("div", {
              className: "space-y-4",
              children: [1, 2].map((item) => /* @__PURE__ */ jsxs("div", {
                className: "flex space-x-3 items-start justify-between py-2",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex space-x-3",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-12 rounded-md bg-zinc-800 flex-shrink-0" }),
                    " ",
                    /* @__PURE__ */ jsxs("div", {
                      className: "space-y-2",
                      children: [
                        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-36 bg-zinc-800" }),
                        " ",
                        /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24 bg-zinc-800" }),
                        " ",
                        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-8 rounded bg-zinc-800 mt-1" }),
                        "   "
                      ]
                    })
                  ]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "text-right space-y-1",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-12 bg-zinc-800/60 ml-auto" }),
                    " ",
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800 ml-auto" }),
                    "    "
                  ]
                })]
              }, item))
            }),
            /* @__PURE__ */ jsx("hr", { className: "border-zinc-800" }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-3",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex justify-between",
                children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex justify-between",
                children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-14 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" })]
              })]
            }),
            /* @__PURE__ */ jsx("hr", { className: "border-zinc-800" }),
            /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-center pt-2",
              children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-12 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-24 bg-zinc-800" })]
            })
          ]
        })
      })]
    })
  });
}
var SplitComponent = CheckoutPage;

export { SplitComponent as component, CheckoutSkeleton as default };
//# sourceMappingURL=checkout-B15ky_HR.mjs.map
