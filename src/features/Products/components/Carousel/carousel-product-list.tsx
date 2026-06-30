import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "#/components/ui/carousel";
import { Skeleton } from "#/components/ui/skeleton";
import type { CardProductResponseData } from "../../type";
import ProductCard from "../product-card";
import Autoplay from "embla-carousel-autoplay"
const CarouselProductList = ({ isPending, data }: { isPending: boolean, data: CardProductResponseData | undefined }) => {




    if (isPending) {
        return (
            <Carousel className="w-full" >
                <CarouselContent>
                    {Array.from({ length: 8 }).map((i, idx) => (
                        <CarouselItem key={idx} className="basis-1/2  md:basis-1/3 lg:basis-1/4 ">
                            <div className="space-y-4" >
                                <Skeleton className="aspect-4/5 w-full rounded-none" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-13" />
                <CarouselNext className="mr-13" />
            </Carousel>
        )

    }
    if (!data || data.products_connection.nodes.length === 0) {
        return (
            <Carousel className="w-full">
                <CarouselContent>
                    <CarouselItem className="basis-1/2  md:basis-1/3 lg:basis-1/4 ">
                        <div className="space-y-4 ">
                            <div className="aspect-4/5 w-full rounded-none" />
                            <div className="space-y-2">
                                <div className="h-4 w-3/4" />
                                <div className="h-4 w-1/2" />
                            </div>
                            <div className="h-6 w-24" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="ml-13" />
                <CarouselNext className="mr-13" />
            </Carousel>
        )
    }
    return (
        <Carousel className="w-full" opts={{
            align: "start",
            loop: true,
        }} plugins={[
            Autoplay({
                delay: 3000,
                stopOnInteraction: true
            }),
        ]}>
            <CarouselContent className="">
                {data.products_connection.nodes.map((product) => (
                    <CarouselItem key={product.name} className="basis-1/2   md:basis-1/3 lg:basis-1/4  ">
                        <ProductCard product={product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-13" />
            <CarouselNext className="mr-13" />
        </Carousel>
    );
}

export default CarouselProductList
