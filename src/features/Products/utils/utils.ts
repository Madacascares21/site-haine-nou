// Types mirroring the GraphQL `products_connection` response shape.

import type { ProductVariant } from "#/features/Products/type"

export type Media = {
  url: string
}

export type Size = {
  name: string
}

export type Color = {
  color_code: string
  name: string
}

export type Variant = {
  documentId: string
  name: string
  media: Media[]
  size: Size
  color: Color
}

export type Pricing = {
  original_price: number
  discounted_price: number
  final_price: number
}

export type Category = {
  name: string
}

export type Product = {
  documentId: string
  name: string
  slug: string
  categories: Category[]
  sub_categories: Category[]
  pricing: Pricing
  variants: Variant[]
  // Extra editorial fields used by the page (optional in the API shape).
  description?: string
  details?: string[]
  composition?: { label: string; value: string }[]
  rating?: { average: number; count: number }
}

// Sample product. In production this is the shape returned by
// data.products_connection.nodes[number]. Media URLs are mapped to local
// generated assets so the gallery renders real imagery.
export const product: Product = {
  documentId: 'wej3ein2wo1dirq9t1xddsll',
  name: 'Tricou Berska',
  slug: 'tricou-berska',
  categories: [{ name: 'man' }],
  sub_categories: [{ name: 'tricou-barbati' }],
  pricing: {
    original_price: 55,
    discounted_price: 44,
    final_price: 44,
  },
  description:
    'Tricou clasic cu croială regular fit, confecționat din bumbac premium cu o textură fină și moale. Un essential versatil, perfect pentru ținute casual de zi cu zi.',
  details: [
    'Croială regular fit',
    'Guler rotund cu ribana elastică',
    'Mâneci scurte tivite',
    'Bumbac premium cu densitate medie',
    'Logo brodat discret pe piept',
  ],
  composition: [
    { label: 'Material exterior', value: '100% Bumbac' },
    { label: 'Întreținere', value: 'Spălare la 30°C' },
    { label: 'Origine', value: 'Fabricat în UE' },
  ],
  rating: { average: 4.6, count: 128 },
  variants: [
    {
      documentId: 'pjvq640tf58iro2yf26onyrc',
      name: 'Tricou Berska Rosu XS',
      media: [
        { url: '/products/tricou-berska-red-1.png' },
        { url: '/products/tricou-berska-red-2.png' },
      ],
      size: { name: 'XS' },
      color: { color_code: '#ff0000', name: 'red' },
    },
    {
      documentId: 'xgzd7df32zcy5vs1x8p98fx5',
      name: 'Tricou Berska Negru M',
      media: [
        { url: '/products/tricou-berska-black-1.png' },
        { url: '/products/tricou-berska-black-2.png' },
      ],
      size: { name: 'M' },
      color: { color_code: '#000000', name: 'negru' },
    },
  ],
}

// All sizes offered for the product line. Variants only exist for a subset,
// so we mark which ones are actually purchasable per color.
export const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const
export type SizeName = (typeof ALL_SIZES)[number]

export function formatPrice(value: number, currency = 'RON') {
  return `${value.toLocaleString('ro-RO')} ${currency}`
}

export function discountPercent(pricing: Pricing) {
  const { original_price, final_price } = pricing
  if (original_price <= 0 || final_price >= original_price) return 0
  return Math.round(((original_price - final_price) / original_price) * 100)
}

// Group variants by color, collecting which sizes are in stock for each color
// and the media to show when that color is selected.
export type ColorGroup = {
  name: string
  colorCode: string
  media: Media[]
  sizes: { name: string; variant: ProductVariant }[]
}

export function groupVariantsByColor(variants: ProductVariant[]): ColorGroup[] {
  const map = new Map<string, ColorGroup>()
  for (const v of variants) {
    const key = v.color.name
    if (!map.has(key)) {
      map.set(key, {
        name: v.color.name,
        colorCode: v.color.color_code,
        media: v.media,
        sizes: [],
      })
    }
    const group = map.get(key)!
    group.sizes.push({ name: v.size.name, variant: v })
  }
  return Array.from(map.values())
}
