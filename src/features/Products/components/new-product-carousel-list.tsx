import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import ProductCarouselLayout from "./Carousel/product-carousel-layout";
import CarouselProductList from "./Carousel/carousel-product-list";
import { getProductsServerFunc } from "../functions/product.function";


const NewProducts = () => {
    const getProducts = useServerFn(getProductsServerFunc)

    const { data, isPending } = useQuery({
        queryKey: ['new-products'],
        queryFn: () => getProducts(),
        staleTime: 10 * 60 * 1000
    })


    return (
        <ProductCarouselLayout label="Produse Noi" category="produse-noi">
            <CarouselProductList data={data} isPending={isPending} />
        </ProductCarouselLayout>
    );
}

export default NewProducts