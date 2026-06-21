import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import CarouselProductList from "./Carousel/carousel-product-list";
import ProductCarouselLayout from "./Carousel/product-carousel-layout";
import { bestPriceServerFunc } from "../functions/product.function";


const BestPrice = () => {
    const getProducts = useServerFn(bestPriceServerFunc)

    const { data, isPending } = useQuery({
        queryKey: ['best-price-products'],
        queryFn: () => getProducts(),
        staleTime: 10 * 60 * 1000
    })


    return (
        <ProductCarouselLayout label="Promotii" subCategory="promotii" category="colectii">
            <CarouselProductList data={data} isPending={isPending} />
        </ProductCarouselLayout>
    );
}

export default BestPrice