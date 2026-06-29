import Container from '#/components/container';
import { Button } from '#/components/ui/button';
import CategoryPagination from '#/features/category/components/pagination';
import { ProductGrid } from '#/features/category/components/product-grid';
import { filterSearchParamsSchema } from '#/features/category/schemas/schema';
import { getProducts } from '#/features/category/server/getProducts';
import { createFileRoute, Link } from '@tanstack/react-router';



import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet';

import { SlidersHorizontalIcon } from 'lucide-react';
import { Skeleton } from '#/components/ui/skeleton';
import { ProductSort } from '#/features/category/components/product-sort';
import { ProductFilters } from '#/features/Products/components/product-filter-test';
import { generatedData } from '#/generated/constants';
import { slugToTitle } from '#/lib/utils';
import { seo } from '#/lib/seo';
import { site } from '#/features/header/constant';
export const Route = createFileRoute('/c/$category/{-$subCategory}')({
  pendingComponent: () => <CategorySkeleton />,
  component: RouteComponent,
  validateSearch: filterSearchParamsSchema,
  loaderDeps: ({ search: filters }) => (filters),
  loader: async ({ params, deps: { ...filters } }) => {
    const res = await getProducts({ ...filters, category: params.category, subCategory: params.subCategory })
    return res.products_connection
  },
  staleTime: 10_000 * 6 * 5, // 5 minutes
  head: ({ loaderData, params }) => {
    let description: string = ""
    let media: any = ""
    let categoryName: string = ""

    // 1. Logica ta existentă de identificare a categoriei
    const category = generatedData.links.categories_connection.nodes.find(c => params.category === c.name)
    const canonical = `${import.meta.env.VITE_SITE_URL}/product/${params.category}${params.subCategory ? `/${params.subCategory}` : ''}` // Înlocuit 'null' string cu '' pentru siguranță în URL

    if (!category) {
      description = ""
      media = ""
      categoryName = params.subCategory ? slugToTitle(params.subCategory) : slugToTitle(params.category)
    } else if (params.subCategory === undefined) {
      description = category.seo?.description ?? ""
      media = category.seo?.media.url ?? ""
      categoryName = slugToTitle(category.name)
    } else {
      const subCategory = category.sub_categories_connection.nodes?.find(c2 => c2.name === params.subCategory)
      description = subCategory?.seo?.description ?? ""
      media = subCategory?.seo?.media.url ?? ""
      categoryName = subCategory ? slugToTitle(subCategory.name) : slugToTitle(params.subCategory)
    }

    // 2. Generăm tagurile SEO standard folosind funcția ta
    const seoTags = seo({
      title: `${categoryName} | ${site.name}`,
      description,
      image: media,
      canonical,
    })

    // Dacă loaderData nu are produse sau nu este disponibil, returnăm doar meta tags
    if (!loaderData || !loaderData.nodes) {
      return { ...seoTags }
    }

    // 3. Construim structura JSON-LD pentru ItemList bazată pe produsele din pagină
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: categoryName,
      description: description,
      url: canonical,
      // Mapăm array-ul de produse din loaderData
      itemListElement: loaderData.nodes.map((product, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: `${import.meta.env.VITE_SITE_URL}/product/${product.slug}`,
          image: product.variants[0].media[0].url,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'RON', // Modifică în funcție de moneda magazinului tău
            price: product.pricing.final_price,
          }
        }
      }))
    }

    // 4. Returnăm structura nativă pentru proprietatea `head` din TanStack
    return {
      ...seoTags,
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(jsonLd),
        },
      ],
    }


    // staleTime: 0,
  }
})

function RouteComponent() {

  const data = Route.useLoaderData()

  const params = Route.useParams()


  return <main className="flex-1 min-h-screen bg-background">
    <Container >
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl mb-1  tracking-tight md:text-4xl text-balance">
          {params.subCategory ? slugToTitle(params.subCategory) : slugToTitle(params.category)}
        </h1>
        <p className="text-xs tracking-widest text-muted-foreground uppercase mb-4">
          <Link to='/'>Acasa</Link> / <Link to={`/c/${params.category}`} search params={params} from='/c/$category/{-$subCategory}' >{params.category}</Link> {params.subCategory ? <Link to='/c/$category/{-$subCategory}' search params={params} from='/c/$category/{-$subCategory}' >/ {slugToTitle(params.subCategory)}</Link> : null}
        </p>
      </div>

      <div className="mb-6 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontalIcon className="mr-2 h-4 w-4" />
              Filtre
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filtre</SheetTitle>
            </SheetHeader>
            <div className="mt-6 px-8">
              <ProductFilters />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <ProductFilters />
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Produse gasite: {data.pageInfo.total}
            </p>
            <div className="flex items-center gap-2">
              <ProductSort />
            </div>
          </div>

          <ProductGrid />
        </div>
      </div>
      <CategoryPagination />
    </Container>
  </main>
}

const CategorySkeleton = () => {
  return (
    <Container className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>


      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className="w-56 flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-36" />
            </div>
          ))}
        </div>


        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="w-full h-64 rounded-xl" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}