import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import CarouselProductList from "./Carousel/carousel-product-list";
import ProductCarouselLayout from "./Carousel/product-carousel-layout";
import { featuredProductsServerFunc } from "../functions/product.function";


const FeaturedProducts = () => {
    const getProducts = useServerFn(featuredProductsServerFunc)

    const { data, isPending } = useQuery({
        queryKey: ['featured-products'],
        queryFn: () => getProducts(),
        staleTime: 10 * 60 * 1000
    })


    return (
        <ProductCarouselLayout label="Featured" category="colectii"  subCategory="featured">
            <CarouselProductList data={data} isPending={isPending} />
        </ProductCarouselLayout>
    );
}

export default FeaturedProducts