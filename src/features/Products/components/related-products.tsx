import Image from 'next/image'
import { formatPrice } from '@/lib/products'

type RelatedItem = {
  name: string
  image: string
  price: number
  original?: number
  color: string
}

const items: RelatedItem[] = [
  {
    name: 'Tricou Berska Roșu',
    image: '/products/tricou-berska-red-1.png',
    price: 44,
    original: 55,
    color: 'Roșu',
  },
  {
    name: 'Tricou Berska Negru',
    image: '/products/tricou-berska-black-1.png',
    price: 44,
    original: 55,
    color: 'Negru',
  },
  {
    name: 'Tricou Berska Negru — Model',
    image: '/products/tricou-berska-black-2.png',
    price: 49,
    color: 'Negru',
  },
  {
    name: 'Tricou Berska Roșu — Spate',
    image: '/products/tricou-berska-red-2.png',
    price: 44,
    original: 55,
    color: 'Roșu',
  },
]

export function RelatedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
          Completează ținuta
        </h2>
        <a
          href="#"
          className="text-sm text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
        >
          Vezi toate
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {items.map((item) => (
          <a key={item.name} href="#" className="group block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-medium leading-tight">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.color}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {formatPrice(item.price)}
                </span>
                {item.original && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(item.original)}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
