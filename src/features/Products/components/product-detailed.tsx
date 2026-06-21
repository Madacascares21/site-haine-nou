
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck
} from 'lucide-react'
import { useMemo, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, formatPrice, getStrapiMedia } from '@/lib/utils'
import type { Product } from '../type'
import { ALL_SIZES, discountPercent, groupVariantsByColor } from '../utils/utils'

const COLOR_LABELS: Record<string, string> = {
  red: 'Roșu',
  negru: 'Negru',
  black: 'Negru',
}

function colorLabel(name: string) {
  return COLOR_LABELS[name] ?? name.charAt(0).toUpperCase() + name.slice(1)
}

export function ProductDetail({ product }: { product: Product }) {
  const colorGroups = useMemo(
    () => groupVariantsByColor(product.variants),
    [product.variants],
  )

  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)

  const activeColor = colorGroups[activeColorIndex]
  const availableSizes = new Set(activeColor?.sizes.map((s) => s.name))
  const gallery = activeColor?.media ?? []
  // const discount = discountPercent(product.pricing.final_price as any)

  function selectColor(index: number) {
    setActiveColorIndex(index)
    setActiveImageIndex(0)
    setSelectedSize(null)
    setAdded(false)
  }

  function stepImage(dir: number) {
    if (gallery.length === 0) return
    setActiveImageIndex((prev) => (prev + dir + gallery.length) % gallery.length)
  }

  function handleAddToCart() {
    if (!selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-16 lg:py-12">
      {/* Gallery */}
      <section className="flex flex-col-reverse gap-4 md:flex-row md:gap-5">
        {/* Thumbnails */}
        <div className="flex gap-3 md:flex-col">
          {gallery.map((media, i) => (
            <button
              key={media.url}
              onClick={() => setActiveImageIndex(i)}
              aria-label={`Vezi imaginea ${i + 1}`}
              aria-current={i === activeImageIndex}
              className={cn(
                'relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-md border bg-muted transition md:w-20',
                i === activeImageIndex
                  ? 'border-foreground'
                  : 'border-border hover:border-muted-foreground',
              )}
            >
              <img
                src={getStrapiMedia(media.url) || '/placeholder.svg'}
                alt={`${product.name} - miniatură ${i + 1}`}
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="group relative aspect-[3/4] flex-1 overflow-hidden rounded-xl border border-border bg-muted">
          {gallery[activeImageIndex] && (
            <img
              src={getStrapiMedia(gallery[activeImageIndex].url) || '/placeholder.svg'}
              alt={`${product.name} în ${colorLabel(activeColor.name)}`}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          )}

          {/* {discount > 0 && (
            <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
              -{discount}%
            </Badge>
          )} */}

          {product.pricing.original_price > product.pricing.final_price && (
            <div className="absolute left-4 top-4 rounded-md bg-accent px-1.5 py-0.5 text-xs font-medium text-accent-foreground">
              -{product.pricing.original_price - product.pricing.final_price} RON
            </div>
          )}

          <button
            onClick={() => setWishlisted((w) => !w)}
            aria-label={wishlisted ? 'Elimină de la favorite' : 'Adaugă la favorite'}
            aria-pressed={wishlisted}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-background"
          >
            <Heart
              className={cn('size-5', wishlisted && 'fill-accent text-accent')}
            />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                onClick={() => stepImage(-1)}
                aria-label="Imaginea anterioară"
                className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur transition hover:bg-background group-hover:opacity-100"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => stepImage(1)}
                aria-label="Imaginea următoare"
                className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur transition hover:bg-background group-hover:opacity-100"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {gallery.map((m, i) => (
              <span
                key={m.url}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === activeImageIndex
                    ? 'w-6 bg-foreground'
                    : 'w-1.5 bg-foreground/30',
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Buy box */}
      <section className="lg:sticky lg:top-6 lg:self-start">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>Acasă</li>
            <li aria-hidden>/</li>
            <li className="capitalize">{product.categories[0]?.name}</li>
            <li aria-hidden>/</li>
            <li className="capitalize">
              {product.sub_categories[0]?.name.replace(/-/g, ' ')}
            </li>
          </ol>
        </nav>

        <h1 className="font-heading text-4xl leading-none tracking-tight text-balance md:text-5xl">
          {product.name}
        </h1>

        {/* Rating */}
        {true && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex items-center" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'size-4',
                    'fill-yellow-300 text-accent'
                  )}
                />
              ))}
            </div>
            <span className="font-medium">{5}</span>
            <span className="text-muted-foreground">
              ({100} recenzii)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mt-5 flex items-end gap-3">
          <span className="text-3xl font-semibold tracking-tight">
            {formatPrice(product.pricing.final_price)}
          </span>
          {product.pricing.original_price > product.pricing.final_price && (
            <span className="pb-1 text-lg text-muted-foreground line-through">
              {formatPrice(product.pricing.original_price)}
            </span>
          )}
          {/* {discount > 0 && (
            <span className="pb-1 text-sm font-medium text-accent">
              Economisești{' '}
              {formatPrice(
                product.pricing.original_price - product.pricing.final_price,
              )}
            </span>
          )} */}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Preț cu TVA inclus. Transport calculat la finalizarea comenzii.
        </p>

        <Separator className="my-6" />

        {/* Color selection */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Culoare:{' '}
              <span className="text-muted-foreground">
                {colorLabel(activeColor.name)}
              </span>
            </span>
          </div>
          <div className="mt-3 flex gap-3">
            {colorGroups.map((group, i) => (
              <button
                key={group.name}
                onClick={() => selectColor(i)}
                aria-label={`Culoare ${colorLabel(group.name)}`}
                aria-pressed={i === activeColorIndex}
                className={cn(
                  'relative size-10 rounded-full border p-0.5 transition',
                  i === activeColorIndex
                    ? 'border-foreground'
                    : 'border-border hover:border-muted-foreground',
                )}
              >
                <span
                  className="block size-full rounded-full ring-1 ring-inset ring-black/10"
                  style={{ backgroundColor: group.colorCode }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Size selection */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mărime</span>
            <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Ghid de mărimi
            </button>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {ALL_SIZES.map((size) => {
              const inStock = availableSizes.has(size)
              const isSelected = selectedSize === size
              return (
                <button
                  key={size}
                  disabled={!inStock}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={isSelected}
                  className={cn(
                    'relative flex h-11 items-center justify-center rounded-md border text-sm font-medium transition',
                    isSelected &&
                    'border-foreground bg-foreground text-background',
                    !isSelected &&
                    inStock &&
                    'border-border hover:border-foreground',
                    !inStock &&
                    'cursor-not-allowed border-dashed border-border text-muted-foreground/40',
                  )}
                >
                  {size}
                </button>
              )
            })}
          </div>
          {!selectedSize && (
            <p className="mt-2 text-xs text-muted-foreground">
              Selectează o mărime pentru a continua.
            </p>
          )}
        </div>

        {/* Quantity + add to cart */}
        <div className="mt-6 flex items-stretch gap-3">
          <div className="flex items-center rounded-md border border-border">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Scade cantitatea"
              className="flex size-11 items-center justify-center text-muted-foreground transition hover:text-foreground"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium" aria-live="polite">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(9, q + 1))}
              aria-label="Crește cantitatea"
              className="flex size-11 items-center justify-center text-muted-foreground transition hover:text-foreground"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="h-11 flex-1 text-sm"
          >
            {added ? (
              <>
                <Check className="size-4" /> Adăugat în coș
              </>
            ) : selectedSize ? (
              <>Adaugă în coș · {formatPrice(product.pricing.final_price * quantity)}</>
            ) : (
              'Selectează mărimea'
            )}
          </Button>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={() => setWishlisted((w) => !w)}
          className="mt-3 h-11 w-full text-sm"
        >
          <Heart className={cn('size-4', wishlisted && 'fill-accent text-accent')} />
          {wishlisted ? 'Salvat la favorite' : 'Adaugă la favorite'}
        </Button>

        {/* Assurances */}
        <ul className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 text-sm">
          <li className="flex items-center gap-3">
            <Truck className="size-4 text-muted-foreground" />
            Livrare gratuită la comenzi peste 150 RON
          </li>
          <li className="flex items-center gap-3">
            <RotateCcw className="size-4 text-muted-foreground" />
            Retur gratuit în 30 de zile
          </li>
          <li className="flex items-center gap-3">
            <ShieldCheck className="size-4 text-muted-foreground" />
            Plată securizată
          </li>
        </ul>

        {/* Description + details */}
        <div className="mt-8">
          {/* <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {product.description}
          </p> */}

          <Accordion type="multiple" className="mt-4 w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-sm">
                Detalii produs
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  {/* {product.details?.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {d}
                    </li>
                  ))} */}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="composition">
              <AccordionTrigger className="text-sm">
                Compoziție și întreținere
              </AccordionTrigger>
              <AccordionContent>
                <dl className="grid gap-2 text-sm">
                  {/* {product.composition?.map((c) => (
                    <div
                      key={c.label}
                      className="flex justify-between gap-4 border-b border-border pb-2 last:border-0"
                    >
                      <dt className="text-muted-foreground">{c.label}</dt>
                      <dd className="font-medium">{c.value}</dd>
                    </div>
                  ))} */}
                </dl>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-sm">
                Livrare și retur
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Comenzile sunt expediate în 1–2 zile lucrătoare. Livrarea
                  standard durează 2–4 zile lucrătoare. Returul este gratuit în
                  termen de 30 de zile de la primire.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  )
}
