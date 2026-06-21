// Types matching the provided products_connection data structure

export interface ProductMedia {
  url: string
}

export interface ProductVariant {
  documentId: string
  available: boolean
  name: string
  media: ProductMedia[]
  size: { name: string }
  color: { name: string; color_code: string }
}

export interface ProductPricing {
  original_price: number
  discounted_price: number
  final_price: number
}

export interface Product {
  documentId: string
  name: string
  slug: string
  categories: { name: string }[]
  sub_categories: { name: string }[]
  pricing: ProductPricing
  variants: ProductVariant[]
}

// A line in the checkout cart: a specific variant of a product plus quantity
export interface CartItem {
  product: Product
  variant: ProductVariant
  quantity: number
}

// Sample data straight from the provided structure
export const products: Product[] = [
  {
    documentId: "m2j7bn0j15bqxfotuu6u0q66",
    name: "Tricou monocromatic",
    slug: "tricou-monocromatic",
    categories: [{ name: "man" }],
    sub_categories: [{ name: "tricou-barbati" }],
    pricing: { original_price: 129.99, discounted_price: 99.99, final_price: 99.99 },
    variants: [
      {
        documentId: "khylzrp8mw3kpzarbbn4oggo",
        available: true,
        name: "Tricou monocromatic Bej xs",
        media: [{ url: "/uploads/756_HX_80_X_050_1_1185064_3_a156b40816.avif" }],
        size: { name: "XS" },
        color: { name: "bej", color_code: "#e1c37b" },
      },
      {
        documentId: "zmiiahi43i5c2o195jby113k",
        available: true,
        name: "oyfuofuf",
        media: [{ url: "/uploads/756_HX_09_M_051_1_1182492_3_3b510d249f.avif" }],
        size: { name: "M" },
        color: { name: "gri", color_code: "#919191" },
      },
    ],
  },
  {
    documentId: "cx9783ted5v512auozx4opte",
    name: "Tricou din bumbac basic",
    slug: "tricou-din-bumbac-basic",
    categories: [{ name: "man" }],
    sub_categories: [{ name: "tricou-barbati" }],
    pricing: { original_price: 39.99, discounted_price: 19.99, final_price: 19.99 },
    variants: [
      {
        documentId: "n8fetx6aamu8lqpfb43nl28u",
        available: true,
        name: "Tricou din bumbac basic",
        media: [{ url: "/uploads/295_HL_99_X_001_1_1165426_32e27febc1.avif" }],
        size: { name: "XS" },
        color: { name: "negru", color_code: "#000000" },
      },
    ],
  },
]

// Build an initial cart from the sample data
export const initialCart: CartItem[] = [
  { product: products[0], variant: products[0].variants[0], quantity: 1 },
  { product: products[1], variant: products[1].variants[0], quantity: 2 },
]

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 2,
  }).format(value)
}
