import HeroCarousel from '#/components/hero-carousel'
import CategoryBannerSection from '#/components/product-category-banner'
import { site } from '#/features/header/constant'
import BestPrice from '#/features/Products/components/best-seller'
import NewProducts from '#/features/Products/components/new-product-carousel-list'
import FeaturedProducts from '#/features/Products/components/tshirt-product-carousel-list'
import { seo } from '#/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => {

    const canonical = `${import.meta.env.VITE_SITE_URL}`
    return seo({
      title: `Acasa | ${site.name}`,
      description: "Auxload Store – haine Gen Z cu imprimeuri trendy și stil modern. Livrare gratuită în Breaza.",
      canonical,
      type: "website",
    })
  }
  , component: Home

})

function Home() {
  return (
    <main>
      <HeroCarousel />
      <CategoryBannerSection />
      <NewProducts />
      <FeaturedProducts />
      <BestPrice />
    </main>
  )
}
