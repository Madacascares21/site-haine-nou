import Container from '#/components/container'
import { Button } from '#/components/ui/button'
import { useCartStore } from '#/features/cart/store'
import { productVariantSearchParamsSchema } from '#/features/category/schemas/schema'
import { site } from '#/features/header/constant'
import { ProductDetailsAccordion } from '#/features/Products/components/accordeon-content'
import CarouselProductList from '#/features/Products/components/Carousel/carousel-product-list'
import ProductCarouselLayout from '#/features/Products/components/Carousel/product-carousel-layout'
import Price from '#/features/Products/components/price'
import ProductGallery from '#/features/Products/components/product-galery'
import VariantSelector from '#/features/Products/components/variant-selector'
import { getProductBySlug } from '#/features/Products/functions/product.function'
import type { ProductVariant } from '#/features/Products/type'
import { seo } from '#/lib/seo'
import { createFileRoute, getRouteApi, notFound } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/product/$slug')({


    component: RouteComponent,
    validateSearch: productVariantSearchParamsSchema,
    loaderDeps: ({ search: { variant_name } }) => ({ variant_name }),
    notFoundComponent: () => <span className='text-6xl font-bold '>No products</span>,
    loader: async ({ params }) => {
        const res = await getProductBySlug(params.slug)
        if (res.products_connection.nodes.length === 0) {
            throw notFound();
        }

        return res.products_connection.nodes[0]


    },
    pendingComponent: () => <div aria-label='Pagina se incarca...' className='text-center py-20 flex-1 min-h-screen w-full '>Loading...</div>,
    // head: ({ loaderData }) => ({
    //     meta: [
    //         ...seo({
    //             title: `${loaderData?.title} | ${siteConfig.siteName}`,
    //             description: loaderData?.seo?.description || "",
    //             image: loaderData?.seo?.media?.url || ""
    //         })
    //     ]
    // }),
    // head: ({ loaderData }) => ({
    //     meta: [
    //         ...seo({
    //             title: `${loaderData?.name} | ${site.name}`,
    //             description: loaderData?.seo?.description || "",
    //             image: loaderData?.seo?.media?.url || ""
    //         })
    //     ]
    // }),
    head: ({ loaderData, params }) => {

        const canonical = `${import.meta.env.VITE_SITE_URL}/product/${params.slug}`
        const standardSeo = seo({
            title: `${loaderData?.name} | ${site.name}`,
            description: loaderData?.seo?.description ??
                `${loaderData?.name}. ${loaderData?.description?.slice(0, 150)}`,
            image: loaderData?.seo?.media?.url,
            canonical,
            type: "product",
        })

        // Dacă nu avem date din loader, returnăm doar SEO standard
        if (!loaderData) return standardSeo

        // 2. Construim structura JSON-LD folosind datele tale din loaderData
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: loaderData.name,
            image: loaderData.seo?.media?.url,
            description: loaderData.seo?.description || loaderData.description,
            sku: loaderData.variants[0].name,
            offers: {
                '@type': 'Offer',
                url: canonical,
                priceCurrency: 'RON', // Modifică în USD/EUR în funcție de magazin
                price: loaderData.pricing.final_price,
                itemCondition: 'https://schema.org',
                availability: loaderData.variants[0].available
                    ? 'https://schema.org'
                    : 'https://schema.org',
            },
        }

        const meta = Array.isArray(standardSeo) ? standardSeo : standardSeo.meta || []
        const links = Array.isArray(standardSeo) ? [] : standardSeo.links || []

        return {
            meta: [
                ...meta,
                {
                    tagName: 'script',
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(jsonLd),
                },
            ],
            links,
        }
    },
    staleTime: 10_000 * 6 * 5
})

function RouteComponent() {

    const productPageRouteApi = getRouteApi('/product/$slug');
    const product = productPageRouteApi.useLoaderData()
    const similarProduct = product.categories_connection.nodes[0].products.filter(p => p.slug !== product.slug)
    const allVariants = product.variants
    const search = productPageRouteApi.useSearch()
    const firstVariant = allVariants.filter(v => v.name === search.variant_name)[0]
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(firstVariant || allVariants[0])
    const [selectedImage, setSelectedImage] = useState(0)
    const { addItem } = useCartStore()
    const { openCart } = useCartStore();

    // inside RouteComponent
    useEffect(() => {
        const firstVariant = allVariants.find(v => v.name === search.variant_name) || allVariants[0];
        setSelectedVariant(firstVariant);
        setSelectedImage(0); // reset gallery to first image
    }, [product, search.variant_name]);
    return (
        <main className='flex-1'>
            <section className="py-8">
                <Container>
                    {/* 1. Am adăugat `items-start` ca grid-ul să nu forțeze înălțimea galeriei în mod implicit */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">

                        {/* 2. Wrapper pentru Galerie: devine sticky pe ecrane mari (lg:) */}
                        <div className="lg:sticky lg:top-8">
                            <ProductGallery
                                images={selectedVariant.media}
                                selectedImage={selectedImage}
                                onImageSelect={setSelectedImage}
                            />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col gap-8">
                            {/* Breadcrumb & Title */}
                            <div>
                                <p className="text-xs tracking-widest text-muted-foreground uppercase mb-4">
                                    {product.categories[0].name} / {product.sub_categories[0].name}
                                </p>

                                <h1 className="text-4xl font-light tracking-tight mb-2">{product.name}</h1>

                                <div className="flex mb-4 items-center gap-1 text-yellow-500">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="18" height="24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                {/* Price */}
                                <Price className={{ discount: "text-sm", price: "text-2xl" }} pricing={product.pricing} />
                            </div>

                            <VariantSelector
                                allVariants={allVariants}
                                selectedVariant={selectedVariant}
                                onVariantChange={setSelectedVariant}
                            />

                            {/* Actions */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    aria-label='Cumpara acum'
                                    size="lg"
                                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                    onClick={() => {
                                        addItem(product.documentId!, selectedVariant.documentId!)
                                        openCart()
                                    }}
                                    disabled={!!(selectedVariant.qty <= 0)}
                                >
                                    {selectedVariant.qty <= 0 ? "Produs Indisponibil" :  "Cumpara Acum!"}
                                </Button>
                            </div>

                            {/* Product Details */}
                            <div className="border-t border-border pt-8">
                                <ProductDetailsAccordion
                                    description={product.description}
                                    variantSku={selectedVariant.name}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Spatiu intre detalii si Produse Similare */}
                    <div className="mt-16">
                        <ProductCarouselLayout label='Produse Similare' category={product.categories[0].name} subCategory={product.sub_categories[0].name}>
                            <CarouselProductList data={{
                                products_connection: {
                                    nodes: similarProduct, pageInfo: {
                                        page: 1, pageCount: 12, pageSize: 3, total: 12
                                    }
                                }
                            }}
                                isPending={false}
                            />
                        </ProductCarouselLayout>
                    </div>
                </Container>
            </section></main>
    )
}
