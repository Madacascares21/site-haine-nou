import { c as createServerFn, d as db, o as order, a as cartItems } from '../virtual/entry.mjs';
import { c as createServerRpc } from './createServerRpc-TRTdhlJ7.mjs';
import { s as strapi, u as updateVariantQTY } from './product.query-BBHo8rfv.mjs';
import { g as getSession } from './auth.functions-CXVcUiC-.mjs';
import { o as orderFieldsSchema } from './schema-DMuWdX5T.mjs';
import { b as batchProductsServerFn, f as formatPrice } from './utils-D6pEwd0q.mjs';
import { s as sendEmail, a as site } from './nodemailer-D4bWEl0n.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { eq } from 'drizzle-orm';
import { render, Html, Head, Preview, Body, Container, Section, Text, Row, Hr, Column, Img } from '@react-email/components';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'drizzle-orm/pg-core';
import 'drizzle-orm/node-postgres';
import '@tanstack/react-router';
import '@tanstack/react-router/ssr/server';
import 'node:async_hooks';
import 'node:stream';
import 'graphql-request';
import 'zod';
import 'react-phone-number-input';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import 'nodemailer';

var ClothingPlaceholder$1 = ({ bg = "#ECEAE6" }) => /* @__PURE__ */ jsx(Section, {
  style: {
    width: 70,
    height: 78,
    backgroundColor: bg,
    borderRadius: 6,
    textAlign: "center"
  },
  children: /* @__PURE__ */ jsx(Text, {
    style: {
      fontSize: 28,
      margin: 20
    },
    children: "\u25FB"
  })
});
var MetaCell$1 = ({ label, value }) => /* @__PURE__ */ jsxs(Column, {
  style: { padding: 12 },
  children: [/* @__PURE__ */ jsx(Text, {
    style: styles$1.label,
    children: label
  }), /* @__PURE__ */ jsx(Text, {
    style: styles$1.value,
    children: value
  })]
});
var OrderItem$1 = ({ item }) => /* @__PURE__ */ jsxs(Row, {
  style: { padding: "16px 0" },
  children: [
    /* @__PURE__ */ jsx(Column, {
      width: "80",
      children: item.imageUrl ? /* @__PURE__ */ jsx(Img, {
        src: item.imageUrl,
        alt: item.name,
        width: "70",
        height: "78",
        style: {
          borderRadius: 6,
          objectFit: "cover"
        }
      }) : /* @__PURE__ */ jsx(ClothingPlaceholder$1, { bg: item.placeholderBg })
    }),
    /* @__PURE__ */ jsxs(Column, { children: [
      /* @__PURE__ */ jsx(Text, {
        style: styles$1.itemName,
        children: item.name
      }),
      /* @__PURE__ */ jsxs(Text, {
        style: styles$1.muted,
        children: ["SKU: ", item.sku]
      }),
      /* @__PURE__ */ jsxs(Text, {
        style: styles$1.muted,
        children: [
          "Culoare: ",
          item.color,
          " \xB7 M\u0103rime: ",
          item.size,
          " \xB7 Cantitate: ",
          item.qty
        ]
      })
    ] }),
    /* @__PURE__ */ jsx(Column, {
      align: "right",
      children: /* @__PURE__ */ jsx(Text, {
        style: styles$1.value,
        children: formatPrice(item.price * item.qty)
      })
    })
  ]
});
var DEFAULT_ITEMS$1 = [{
  id: 1,
  name: "Blazer supradimensionat din l\xE2n\u0103 Merino",
  sku: "MW-BLZ-CHR-L",
  color: "C\u0103rbune",
  size: "L / EU 52",
  qty: 1,
  price: 289
}, {
  id: 2,
  name: "Pantaloni lejeri din in",
  sku: "LN-TRS-IVR-M",
  color: "Filde\u0219",
  size: "M / EU 48",
  qty: 1,
  price: 149
}];
function ClientOrderEmail({ brandName = "ARKT", brandTagline = "STUDIO", orderNumber = "ORD-2026-88471", orderDate = "22 iunie 2026", estimatedDelivery = "27\u201330 iunie 2026", customerName = "Alex Ionescu", subtotal = 438, shippingCost = 0, taxRate = 0.19, total = 521.22, items = DEFAULT_ITEMS$1, shippingAddress = {
  name: "Alex Ionescu",
  line1: "Str. Independen\u021Bei 14",
  line2: "Ploie\u0219ti, Prahova 100001",
  country: "Rom\xE2nia"
}, payment = {
  method: "Visa",
  last4: "4291"
} }) {
  const firstName = customerName.split(" ")[0];
  const tax = subtotal * taxRate;
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsxs(Preview, { children: [
      "Comanda ta de la ",
      brandName,
      " a fost confirmat\u0103"
    ] }),
    /* @__PURE__ */ jsx(Body, {
      style: styles$1.body,
      children: /* @__PURE__ */ jsxs(Container, {
        style: styles$1.container,
        children: [
          /* @__PURE__ */ jsxs(Section, {
            style: styles$1.header,
            children: [/* @__PURE__ */ jsx(Text, {
              style: styles$1.logo,
              children: brandName
            }), /* @__PURE__ */ jsx(Text, {
              style: styles$1.tagline,
              children: brandTagline
            })]
          }),
          /* @__PURE__ */ jsxs(Section, {
            style: styles$1.banner,
            children: [
              /* @__PURE__ */ jsx(Text, {
                style: styles$1.success,
                children: "\u2713 COMAND\u0102 CONFIRMAT\u0102"
              }),
              /* @__PURE__ */ jsxs(Text, {
                style: styles$1.title,
                children: [
                  "\xCE\u021Bi mul\u021Bumim, ",
                  firstName,
                  "!"
                ]
              }),
              /* @__PURE__ */ jsx(Text, {
                style: styles$1.subtitle,
                children: "Comanda ta a fost recep\u021Bionat\u0103 \u0219i este \xEEn curs de preg\u0103tire."
              })
            ]
          }),
          /* @__PURE__ */ jsx(Section, {
            style: styles$1.meta,
            children: /* @__PURE__ */ jsxs(Row, { children: [
              /* @__PURE__ */ jsx(MetaCell$1, {
                label: "Num\u0103r comand\u0103",
                value: orderNumber
              }),
              /* @__PURE__ */ jsx(MetaCell$1, {
                label: "Data comenzii",
                value: orderDate
              }),
              /* @__PURE__ */ jsx(MetaCell$1, {
                label: "Livrare estimat\u0103",
                value: estimatedDelivery
              })
            ] })
          }),
          /* @__PURE__ */ jsxs(Section, {
            style: styles$1.content,
            children: [
              /* @__PURE__ */ jsx(Text, {
                style: styles$1.label,
                children: "Produsele tale"
              }),
              items.map((item) => /* @__PURE__ */ jsx(OrderItem$1, { item }, item.id)),
              /* @__PURE__ */ jsx(Hr, {}),
              /* @__PURE__ */ jsxs(Row, { children: [/* @__PURE__ */ jsxs(Column, { children: [
                /* @__PURE__ */ jsx(Text, { children: "Subtotal" }),
                /* @__PURE__ */ jsx(Text, { children: "Livrare" }),
                /* @__PURE__ */ jsx(Text, { children: "TVA" }),
                /* @__PURE__ */ jsx(Text, {
                  style: styles$1.total,
                  children: "Total"
                })
              ] }), /* @__PURE__ */ jsxs(Column, {
                align: "right",
                children: [
                  /* @__PURE__ */ jsx(Text, { children: formatPrice(subtotal) }),
                  /* @__PURE__ */ jsx(Text, { children: shippingCost ? formatPrice(shippingCost) : "Gratuit\u0103" }),
                  /* @__PURE__ */ jsx(Text, { children: formatPrice(tax) }),
                  /* @__PURE__ */ jsx(Text, {
                    style: styles$1.total,
                    children: formatPrice(total)
                  })
                ]
              })] }),
              /* @__PURE__ */ jsx(Hr, {}),
              /* @__PURE__ */ jsxs(Row, { children: [/* @__PURE__ */ jsxs(Column, { children: [/* @__PURE__ */ jsx(Text, {
                style: styles$1.label,
                children: "Adres\u0103 de livrare"
              }), /* @__PURE__ */ jsxs(Text, { children: [
                shippingAddress.name,
                /* @__PURE__ */ jsx("br", {}),
                shippingAddress.line1,
                /* @__PURE__ */ jsx("br", {}),
                shippingAddress.line2,
                /* @__PURE__ */ jsx("br", {}),
                shippingAddress.country
              ] })] }), /* @__PURE__ */ jsxs(Column, { children: [
                /* @__PURE__ */ jsx(Text, {
                  style: styles$1.label,
                  children: "Plat\u0103"
                }),
                /* @__PURE__ */ jsxs(Text, { children: [
                  payment.method,
                  " care se termin\u0103 \xEEn ",
                  payment.last4
                ] }),
                /* @__PURE__ */ jsx(Text, { children: "\u2713 Plat\u0103 verificat\u0103" })
              ] })] }),
              /* @__PURE__ */ jsx(Section, { style: {
                textAlign: "center",
                marginTop: 25
              } })
            ]
          }),
          /* @__PURE__ */ jsx(Section, {
            style: styles$1.footer,
            children: /* @__PURE__ */ jsx(Text, {
              style: styles$1.logo,
              children: brandName
            })
          })
        ]
      })
    })
  ] });
}
var styles$1 = {
  body: {
    backgroundColor: "#F8F6F2",
    fontFamily: "Arial, sans-serif"
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    border: "1px solid #E0DDD7"
  },
  header: {
    backgroundColor: "#1A1A1A",
    padding: "30px",
    textAlign: "center"
  },
  logo: {
    color: "#fff",
    fontSize: "22px",
    letterSpacing: "0.25em"
  },
  tagline: {
    color: "#777",
    fontSize: "11px",
    letterSpacing: "0.3em"
  },
  banner: {
    backgroundColor: "#AA4A44",
    padding: "30px",
    textAlign: "center"
  },
  success: {
    color: "#7DB89A",
    fontSize: "12px"
  },
  title: {
    color: "#fff",
    fontSize: "24px"
  },
  subtitle: { color: "#7DB89A" },
  meta: { backgroundColor: "#EFECE6" },
  content: { padding: "40px" },
  label: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#999"
  },
  value: { color: "#1A1A1A" },
  itemName: { fontWeight: 600 },
  muted: {
    color: "#777",
    fontSize: "13px"
  },
  total: {
    fontWeight: 700,
    fontSize: "16px"
  },
  footer: {
    backgroundColor: "#1A1A1A",
    padding: "30px",
    textAlign: "center"
  }
};
var ClothingPlaceholder = ({ bg = "#ECEAE6" }) => /* @__PURE__ */ jsx(Section, {
  style: {
    width: 70,
    height: 78,
    backgroundColor: bg,
    borderRadius: 6,
    textAlign: "center"
  },
  children: /* @__PURE__ */ jsx(Text, {
    style: {
      fontSize: 28,
      margin: 20
    },
    children: "\u25FB"
  })
});
var MetaCell = ({ label, value }) => /* @__PURE__ */ jsxs(Column, {
  style: { padding: 12 },
  children: [/* @__PURE__ */ jsx(Text, {
    style: styles.label,
    children: label
  }), /* @__PURE__ */ jsx(Text, {
    style: styles.value,
    children: value
  })]
});
var OrderItem = ({ item }) => /* @__PURE__ */ jsxs(Row, {
  style: { padding: "16px 0" },
  children: [
    /* @__PURE__ */ jsx(Column, {
      width: "80",
      children: item.imageUrl ? /* @__PURE__ */ jsx(Img, {
        src: item.imageUrl,
        alt: item.name,
        width: "70",
        height: "78",
        style: {
          borderRadius: 6,
          objectFit: "cover"
        }
      }) : /* @__PURE__ */ jsx(ClothingPlaceholder, { bg: item.placeholderBg })
    }),
    /* @__PURE__ */ jsxs(Column, { children: [
      /* @__PURE__ */ jsx(Text, {
        style: styles.itemName,
        children: item.name
      }),
      /* @__PURE__ */ jsxs(Text, {
        style: styles.muted,
        children: ["SKU: ", item.sku]
      }),
      /* @__PURE__ */ jsxs(Text, {
        style: styles.muted,
        children: [
          "Culoare: ",
          item.color,
          " \xB7 M\u0103rime: ",
          item.size,
          " \xB7 Cantitate: ",
          item.qty
        ]
      })
    ] }),
    /* @__PURE__ */ jsx(Column, {
      align: "right",
      children: /* @__PURE__ */ jsx(Text, {
        style: styles.value,
        children: formatPrice(item.price * item.qty)
      })
    })
  ]
});
var DEFAULT_ITEMS = [{
  id: 1,
  name: "Blazer supradimensionat din l\xE2n\u0103 Merino",
  sku: "MW-BLZ-CHR-L",
  color: "C\u0103rbune",
  size: "L / EU 52",
  qty: 1,
  price: 289
}, {
  id: 2,
  name: "Pantaloni lejeri din in",
  sku: "LN-TRS-IVR-M",
  color: "Filde\u0219",
  size: "M / EU 48",
  qty: 1,
  price: 149
}];
function AdminOrderEmail({ brandName = "ARKT", brandTagline = "STUDIO", orderNumber = "ORD-2026-88471", orderDate = "22 iunie 2026", estimatedDelivery = "27\u201330 iunie 2026", customerName = "Alex Ionescu", subtotal = 438, shippingCost = 0, taxRate = 0.19, total = 521.22, items = DEFAULT_ITEMS, shippingAddress = {
  name: "Alex Ionescu",
  line1: "Str. Independen\u021Bei 14",
  line2: "Ploie\u0219ti, Prahova 100001",
  country: "Rom\xE2nia"
}, payment = {
  method: "Visa",
  last4: "4291"
} }) {
  const firstName = customerName.split(" ")[0];
  const tax = subtotal * taxRate;
  return /* @__PURE__ */ jsxs(Html, { children: [/* @__PURE__ */ jsx(Head, {}), /* @__PURE__ */ jsx(Body, {
    style: styles.body,
    children: /* @__PURE__ */ jsxs(Container, {
      style: styles.container,
      children: [
        /* @__PURE__ */ jsxs(Section, {
          style: styles.header,
          children: [/* @__PURE__ */ jsx(Text, {
            style: styles.logo,
            children: brandName
          }), /* @__PURE__ */ jsx(Text, {
            style: styles.tagline,
            children: brandTagline
          })]
        }),
        /* @__PURE__ */ jsxs(Section, {
          style: styles.banner,
          children: [
            /* @__PURE__ */ jsx(Text, {
              style: styles.success,
              children: "\u2713 COMAND\u0102 CONFIRMAT\u0102"
            }),
            /* @__PURE__ */ jsxs(Text, {
              style: styles.title,
              children: [
                "Comanda de la ",
                firstName,
                "!"
              ]
            }),
            /* @__PURE__ */ jsx(Text, {
              style: styles.subtitle,
              children: "Comanda a fost recep\u021Bionat\u0103 \u0219i este \xEEn curs de preg\u0103tire."
            })
          ]
        }),
        /* @__PURE__ */ jsx(Section, {
          style: styles.meta,
          children: /* @__PURE__ */ jsxs(Row, { children: [
            /* @__PURE__ */ jsx(MetaCell, {
              label: "Num\u0103r comand\u0103",
              value: orderNumber
            }),
            /* @__PURE__ */ jsx(MetaCell, {
              label: "Data comenzii",
              value: orderDate
            }),
            /* @__PURE__ */ jsx(MetaCell, {
              label: "Livrare estimat\u0103",
              value: estimatedDelivery
            })
          ] })
        }),
        /* @__PURE__ */ jsxs(Section, {
          style: styles.content,
          children: [
            /* @__PURE__ */ jsx(Text, {
              style: styles.label,
              children: "Produsele comandate"
            }),
            items.map((item) => /* @__PURE__ */ jsx(OrderItem, { item }, item.id)),
            /* @__PURE__ */ jsx(Hr, {}),
            /* @__PURE__ */ jsxs(Row, { children: [/* @__PURE__ */ jsxs(Column, { children: [
              /* @__PURE__ */ jsx(Text, { children: "Subtotal" }),
              /* @__PURE__ */ jsx(Text, { children: "Livrare" }),
              /* @__PURE__ */ jsx(Text, { children: "TVA" }),
              /* @__PURE__ */ jsx(Text, {
                style: styles.total,
                children: "Total"
              })
            ] }), /* @__PURE__ */ jsxs(Column, {
              align: "right",
              children: [
                /* @__PURE__ */ jsx(Text, { children: formatPrice(subtotal) }),
                /* @__PURE__ */ jsx(Text, { children: shippingCost ? formatPrice(shippingCost) : "Gratuit\u0103" }),
                /* @__PURE__ */ jsx(Text, { children: formatPrice(tax) }),
                /* @__PURE__ */ jsx(Text, {
                  style: styles.total,
                  children: formatPrice(total)
                })
              ]
            })] }),
            /* @__PURE__ */ jsx(Hr, {}),
            /* @__PURE__ */ jsxs(Row, { children: [/* @__PURE__ */ jsxs(Column, { children: [/* @__PURE__ */ jsx(Text, {
              style: styles.label,
              children: "Adres\u0103 de livrare"
            }), /* @__PURE__ */ jsxs(Text, { children: [
              shippingAddress.name,
              /* @__PURE__ */ jsx("br", {}),
              shippingAddress.line1,
              /* @__PURE__ */ jsx("br", {}),
              shippingAddress.line2,
              /* @__PURE__ */ jsx("br", {}),
              shippingAddress.country
            ] })] }), /* @__PURE__ */ jsxs(Column, { children: [
              /* @__PURE__ */ jsx(Text, {
                style: styles.label,
                children: "Plat\u0103"
              }),
              /* @__PURE__ */ jsxs(Text, { children: [
                payment.method,
                " care se termin\u0103 \xEEn ",
                payment.last4
              ] }),
              /* @__PURE__ */ jsx(Text, { children: "\u2713 Plat\u0103 verificat\u0103" })
            ] })] }),
            /* @__PURE__ */ jsx(Section, { style: {
              textAlign: "center",
              marginTop: 25
            } })
          ]
        }),
        /* @__PURE__ */ jsx(Section, {
          style: styles.footer,
          children: /* @__PURE__ */ jsx(Text, {
            style: styles.logo,
            children: brandName
          })
        })
      ]
    })
  })] });
}
var styles = {
  body: {
    backgroundColor: "#F8F6F2",
    fontFamily: "Arial, sans-serif"
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    border: "1px solid #E0DDD7"
  },
  header: {
    backgroundColor: "#1A1A1A",
    padding: "30px",
    textAlign: "center"
  },
  logo: {
    color: "#fff",
    fontSize: "22px",
    letterSpacing: "0.25em"
  },
  tagline: {
    color: "#777",
    fontSize: "11px",
    letterSpacing: "0.3em"
  },
  banner: {
    backgroundColor: "#AA4A44",
    padding: "30px",
    textAlign: "center"
  },
  success: {
    color: "#7DB89A",
    fontSize: "12px"
  },
  title: {
    color: "#fff",
    fontSize: "24px"
  },
  subtitle: { color: "#7DB89A" },
  meta: { backgroundColor: "#EFECE6" },
  content: { padding: "40px" },
  label: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#999"
  },
  value: { color: "#1A1A1A" },
  itemName: { fontWeight: 600 },
  muted: {
    color: "#777",
    fontSize: "13px"
  },
  total: {
    fontWeight: 700,
    fontSize: "16px"
  },
  footer: {
    backgroundColor: "#1A1A1A",
    padding: "30px",
    textAlign: "center"
  }
};
var createOrder = async (data) => {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");
  const getProducts = async () => {
    const res = await batchProductsServerFn({ data: { items: data.cartItems } });
    return await Promise.all(data.cartItems.map(async (item) => {
      const product = res.products_connection.nodes.find((a) => a.documentId === item.productId);
      const variant = product?.variants_connection.nodes.find((a) => a.documentId === item.variantId);
      if (!product || !variant) throw new Error("Product or variant not found");
      const newQty = variant.qty - item.quantity;
      if (newQty < 0 || void 0) throw Error("Unul dintre produse nu este disponibil!");
      await strapi.request(updateVariantQTY, {
        documentId: item.variantId,
        qty: newQty
      });
      return {
        product,
        variant,
        quantity: item.quantity
      };
    }));
  };
  const rawProducts = await getProducts();
  const subtotal = rawProducts.reduce((acc, item) => {
    return acc + Number(item.product.pricing.final_price) * item.quantity;
  }, 0);
  const itemsInJSON = JSON.stringify(rawProducts);
  const [newOrder] = await db.insert(order).values({
    userId: session.user.id ?? null,
    email: session.user.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    address: data.address,
    city: data.city,
    zip: data.zip,
    shippingMethod: data.shippingMethod,
    paymentMethod: data.payment,
    products: itemsInJSON,
    total: String(subtotal)
  }).returning();
  await db.delete(cartItems).where(eq(cartItems.userId, session.user.id));
  const items = rawProducts.map((item) => {
    return {
      color: item.variant.color.name,
      id: item.variant.documentId || "",
      name: item.product.name,
      price: item.product.pricing.final_price,
      qty: item.quantity,
      size: item.variant.size.name,
      sku: item.variant.name,
      imageUrl: item.variant.media[0].url
    };
  });
  const clientEmailHtml = await render(ClientOrderEmail({
    brandName: site.name,
    customerName: session.user.name,
    items,
    orderDate: newOrder.createdAt.toLocaleDateString(),
    orderNumber: "98",
    subtotal,
    shippingCost: 0,
    total: subtotal,
    taxRate: 0,
    shippingAddress: {
      country: "Romania",
      line1: data.address,
      line2: data.city,
      name: session.user.name
    },
    payment: {
      method: data.payment,
      last4: "xxxx"
    }
  }));
  await sendEmail({
    subject: " Comanda ta a fost inregistrata cu success",
    text: "d",
    to: session.user.email,
    html: clientEmailHtml
  });
  await sendEmail({
    subject: " O noua comanda a fost inregistrata",
    text: "d",
    to: "gd69435@gmail.com",
    html: await render(AdminOrderEmail({
      brandName: site.name,
      customerName: session.user.name,
      items,
      orderDate: newOrder.createdAt.toLocaleDateString(),
      orderNumber: "98",
      subtotal,
      shippingCost: 0,
      total: subtotal,
      taxRate: 0,
      shippingAddress: {
        country: "Romania",
        line1: data.address,
        line2: data.city,
        name: session.user.name
      },
      payment: {
        method: data.payment,
        last4: "xxxx"
      }
    }))
  });
  return newOrder;
};
var createOrderServerFn_createServerFn_handler = createServerRpc({
  id: "8c801c6e7f19e976f6d9810e98c2e7ad8b2015e92eab0286851dc2f4e9da39a9",
  name: "createOrderServerFn",
  filename: "src/features/checkout/server/checkout.ts"
}, (opts) => createOrderServerFn.__executeServer(opts));
var createOrderServerFn = createServerFn({ method: "POST" }).validator(orderFieldsSchema).handler(createOrderServerFn_createServerFn_handler, async ({ data }) => {
  try {
    await createOrder(data);
    return {
      success: true,
      message: "Order created successfully!"
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return {
      success: false,
      message: error.message
    };
    return {
      success: false,
      message: "Failed to create order."
    };
  }
});

export { createOrderServerFn_createServerFn_handler };
//# sourceMappingURL=checkout-BuUbZO-8.mjs.map
