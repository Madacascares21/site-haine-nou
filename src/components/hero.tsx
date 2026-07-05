import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowRight, Star, Truck } from "lucide-react"
import Container from "./container"
import { Link } from "@tanstack/react-router"

export function MainHero() {
    return (
        <section className="relative overflow-hidden bg-background">
            {/* Filigran supradimensionat */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-display text-[22vw] leading-none text-foreground/[0.03] lg:block"
            >
                VOLT
            </span>

            {/* Bară superioară tip marquee */}
            <div className="border-b border-border">
                <Container className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Colecția 004 — Polar Heavyweight — Disponibilă acum
                    <Star className="h-3.5 w-3.5 fill-current" />
                </Container>
            </div>

            <Container className="grid  grid-cols-1 items-center gap-10  lg:grid-cols-2 lg:gap-8 ">
                {/* Partea de text */}
                <div className="relative z-10 flex flex-col items-start">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
                        Colecție Nouă
                    </span>

                    <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] tracking-tight text-balance sm:text-7xl lg:text-8xl">
                        Creat pentru a
                        <br />
                        <span className="text-primary">IMPESIONA.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                        Polar periat de 500 gsm. Croială oversized, boxy. Conceput să reziste uzurii și să arate
                        impecabil în orice moment. Aceasta este Colecția 004.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            to="/c/$category/{-$subCategory}"
                            params={{ category: "barbati" }}
                            search={(s) => ({
                                ...s,
                                page: s.page ?? 1,
                                pageSize: s.pageSize ?? 24,
                                sortBy: s.sortBy ?? "new-products",
                                minPrice: s.minPrice ?? 0,
                                maxPrice: s.maxPrice ?? 10000,
                            })}
                            className={buttonVariants({ variant: "default" })}
                        >
                            Cumpără colecția
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            to="/c/$category/{-$subCategory}"
                            params={{ category: "produse-noi" }}
                            search={(s) => ({
                                ...s,
                                category: "barbati",
                                subCategory: "tricouri",
                                page: s.page ?? 1,
                                pageSize: s.pageSize ?? 24,
                                sortBy: s.sortBy ?? "new-products",
                                minPrice: s.minPrice ?? 0,
                                maxPrice: s.maxPrice ?? 10000,
                            })}
                            className={buttonVariants({ variant: "outline" })}
                        >
                            Vezi lookbook-ul
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                            <Truck className="h-4 w-4 text-primary" />
                            Transport gratuit pentru comenzi peste 500 lei
                        </span>
                        {/* <span className="inline-flex items-center gap-2">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            4.9 / 5 din peste 2.300 de recenzii
                        </span> */}
                    </div>
                </div>

                {/* Partea produsului — colaj imagini */}
                <div className="relative ">
                    {/* Fundal decorativ */}
                    <div className="absolute inset-x-4 bottom-6 top-10 -rotate-2 rounded-3xl bg-primary/90" />

                    <div className="relative grid grid-cols-3 grid-rows-2 gap-3">
                        {/* Imagine principală */}
                        <div className="relative col-span-2 row-span-3 overflow-hidden rounded-3xl border border-border bg-card">
                            <img
                                src="https://orderly-wonder-8bfec8c76b.media.strapiapp.com/Whats_App_Image_2026_07_04_at_9_51_57_PM_9f7fb62b47.jpeg"
                                alt="Hanorac VOLT Drop 004 charcoal heavyweight"
                                width={900}
                                height={600}
                                className="h-full w-full object-cover"
                            />
                            {/* Etichetă preț */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-border bg-background/85 px-4 py-3 backdrop-blur">
                                <div className="font-display text-2xl leading-none text-primary">489 lei</div>
                                <div className="text-xs uppercase leading-tight tracking-wide text-muted-foreground">
                                    Hanorac
                                    <br />
                                    Heavyweight
                                </div>
                            </div>
                        </div>

                        {/* Imagini secundare */}
                        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                            <img
                                src="https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_3_d3e59b63b8.webp"
                                alt="Hanorac VOLT heavyweight alb ivoire"
                                width={400}
                                height={400}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                            <img
                                src="https://orderly-wonder-8bfec8c76b.media.strapiapp.com/1_org_zoom_52f8e7fe91.webp"
                                alt="Model purtând hanoracul VOLT charcoal cu gluga trasă"
                                width={400}
                                height={400}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                            <img
                                src="https://orderly-wonder-8bfec8c76b.media.strapiapp.com/authenticfacenegru_1800x1800_7ae954e0d8.webp"
                                alt="Prim-plan al șnururilor verde acid și al texturii fleece"
                                width={400}
                                height={400}
                                className="h-full w-full object-cover"
                            />
                            <span className="absolute bottom-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                                4 culori
                            </span>
                        </div> */}
                    </div>
                </div>
            </Container>
        </section>
    )
}