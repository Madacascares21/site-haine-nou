import HeroCarousel from '#/components/hero-carousel'
import CategoryBannerSection from '#/components/product-category-banner'
import { site } from '#/features/header/constant'
import BestPrice from '#/features/Products/components/best-seller'
import NewProducts from '#/features/Products/components/new-product-carousel-list'
import FeaturedProducts from '#/features/Products/components/tshirt-product-carousel-list'
import { seo } from '#/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: `Home | ${site.name}`,
        description: "Auxload Store – haine Gen Z cu imprimeuri trendy și stil modern. Livrare gratuită în Breaza.",
        image: "/banner.png"
      })
    ]
  }), component: Home

})

function Home() {
  return (
    <main>
        <HeroCarousel />
        <CategoryBannerSection />
        <FeaturedProducts />
        <NewProducts />
        <BestPrice />
    </main>
  )
}
