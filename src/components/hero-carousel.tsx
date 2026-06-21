import { faker } from "@faker-js/faker"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Container from "./container"

// 1. Define the TypeScript interface for your slide data
interface SlideData {
  id: string
  title: string
  description: string
  cta: string
}

// Mock data generation
const slides: SlideData[] = Array.from({ length: 1 }, () => ({
  id: "assfaf",
  title: "Vara asta tu surprinzi pe toata lumea",
  description: "Haine trendy pentru ati arata toate formele",
  cta: faker.helpers.arrayElement(["Learn More", "Get Started", "Shop Now", "Discover"]),
}))

// 2. Create the Custom Slide Component
// const CustomSlide = ({ slide }: { slide: SlideData }) => {
//   return (
//     <div className="relative aspect-[16/9] w-full h-[600px] overflow-hidden rounded-xl border bg-background">
//       {/* Ecommerce hero layout */}
//       <Container className="relative flex h-full items-center justify-between gap-10 z-10">
//         {/* Content */}
//         <div className="max-w-2xl">
//           {/* Dynamic Tag */}
//           {/* {slide.tag && (
//         <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20">
//           {slide.tag}
//         </span>
//       )} */}

//           {/* Title */}
//           <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4 text-balance">
//             {slide.title}
//           </h1>

//           {/* Description */}
//           <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-md leading-relaxed">
//             {slide.description}
//           </p>

//           {/* Action Button */}
//           <div className="flex gap-4">
//             <Button
//               size="lg"
//               className="shadow-lg transition-all hover:opacity-90 active:scale-95"
//             >
//               Shop Now
//             </Button>
//           </div>
//         </div>

//         {/* Product Image */}
//         <div className="relative flex-1 h-full flex items-center justify-center">
//           <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden bg-muted">
//             <img
//               src={"https://magazinuldetricouri.ro/poze_prod_m/1/max_tricou-barbati-morgan-stedman.jpg"}
//               alt={slide.title}
//               className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
//             />
//           </div>
//         </div>
//       </Container>
//     </div>
//   )
// }

const CustomSlide = ({ slide }: { slide: SlideData }) => {
  return (
    <div className="relative h-[700px] w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-background via-background to-muted/40">


      <Container className="relative z-10 flex h-full items-center justify-between gap-12">

        {/* Left content */}
        <div className="flex-1 max-w-xl">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            New Collection Available
          </div>


          {/* Title */}
          <h1 className="text-5xl font-black tracking-tight md:text-7xl leading-[0.95]">
            {slide.title}
          </h1>


          {/* Description */}
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {slide.description}
          </p>


          {/* Stats */}
          {/* <div className="mt-8 flex gap-6">

            <div className="rounded-2xl border bg-background/60 px-5 py-4 backdrop-blur-xl">
              <p className="text-2xl font-bold">4.9★</p>
              <p className="text-xs text-muted-foreground">
                Customer Rating
              </p>
            </div>

            <div className="rounded-2xl border bg-background/60 px-5 py-4 backdrop-blur-xl">
              <p className="text-2xl font-bold">
                10K+
              </p>
              <p className="text-xs text-muted-foreground">
                Orders Sold
              </p>
            </div>

          </div> */}


          {/* Buttons */}
          <div className="mt-8 flex gap-4">

            <Button
              size="lg"
              className="rounded-full px-8 shadow-xl transition hover:scale-105"
            >
              Shop Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8"
            >
              View Details
            </Button>

          </div>

        </div>



        {/* Product showcase */}
        <div className="relative flex-1 h-full flex items-center justify-center">


          {/* Discount card */}
          <div className="absolute right-0 top-24 z-20 rounded-2xl border bg-background/80 px-5 py-4 shadow-xl backdrop-blur-xl">
            <p className="text-sm text-muted-foreground">
              Limited Offer
            </p>
            <p className="text-3xl font-black text-primary">
              -40%
            </p>
          </div>



          {/* Main product */}
          <div className="relative">

            <div className="absolute inset-0 rounded-[40px] bg-primary/20 blur-3xl" />

            <div className="relative h-[420px] w-[420px] overflow-hidden rounded-[40px] border bg-background shadow-2xl">

              <img
                src={"http://localhost:1337/uploads/a2183884_2832_4f4c_90d6_8e7f547a86ba_83be8e757a.png"}
                alt={slide.title}
                className="
              h-full
              w-full
              object-top
              object-cover
              transition-all
              duration-700
              hover:scale-110
            "
              />

            </div>


            {/* Floating product info */}
            <div className="absolute -bottom-8 -left-10 w-64 rounded-3xl border bg-background/90 p-5 shadow-2xl backdrop-blur-xl">

              <p className="text-sm text-muted-foreground">
                Featured Product
              </p>

              <h3 className="mt-1 font-bold">
                Tricou Skets
              </h3>


              <div className="mt-3 flex items-center justify-between">

                <span className="text-xl font-black">
                  29.99 Lei
                </span>

                <Button size="sm" className="rounded-full">
                  Add
                </Button>

              </div>

            </div>


          </div>

        </div>


      </Container>
    </div>
  )
}



// 3. Main Example Component
const HeroCarousel = () => {
  return (
    <div className="">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              {/* Render your custom slide component here */}
              <CustomSlide slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
}

export default HeroCarousel