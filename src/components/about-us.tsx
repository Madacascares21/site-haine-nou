import { Sparkles, Shirt, Truck, ShieldCheck } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03]" />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Povestea Noastră
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Mai mult decât
              <br />
              <span className="text-primary">un magazin de haine.</span>
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-8 text-muted-foreground">
              <p>
                <strong className="text-foreground">Auxload Store</strong> s-a
                născut în Breaza din dorința de a crea haine care îi reprezintă
                cu adevărat pe tinerii din România.
              </p>

              <p>
                Ne inspirăm din scena trap românească, cultura underground și
                cele mai noi trenduri streetwear. Nu vrem să copiem ceea ce este
                popular, ci să construim propria identitate.
              </p>

              <p>
                Credem că hainele sunt o formă de exprimare. De aceea vrem să
                promovăm cultura Generației Z și să construim o comunitate în
                jurul originalității.
              </p>
            </div>
          </div>

          {/* Features */}
          {/* <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <h3 className="text-3xl font-bold">
              Nu vindem doar haine.
            </h3>

            <p className="mt-3 text-muted-foreground">
              Construim un brand românesc pentru oamenii care își creează
              propriul stil.
            </p>

            <div className="mt-8 space-y-4">
              <Feature
                icon={<Truck className="h-5 w-5 text-primary" />}
                title="Transport gratuit"
                description="Livrare gratuită pentru toate comenzile."
              />

              <Feature
                icon={<ShieldCheck className="h-5 w-5 text-primary" />}
                title="Verifici înainte să plătești"
                description="Deschizi coletul și verifici produsul înainte de plată."
              />

              <Feature
                icon={<Shirt className="h-5 w-5 text-primary" />}
                title="Inspirat din cultura urbană"
                description="Trap, underground și cele mai fresh influențe streetwear."
              />
            </div>
          </div> */}
           <div className="relative ">
                    {/* Fundal decorativ */}
                    {/* <div className="absolute inset-x-4 bottom-6 top-10 -rotate-2 rounded-3xl bg-primary/90" /> */}

                    <div className="relative grid grid-cols-3 grid-rows-2 gap-3">
                        {/* Imagine principală */}
                        <div className="relative col-span-2 row-span-3 overflow-hidden rounded-3xl border border-border bg-card">
                            <img
                                src="https://cdn.auxload-store.ro/uploads/Whats_App_Image_2026_07_24_at_8_52_44_PM_385215deca.jpeg"
                                alt="Hanorac VOLT Drop 004 charcoal heavyweight"
                                width={900}
                                height={600}
                                className="h-full w-full object-cover"
                            />
                            {/* Etichetă preț */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-border bg-background/85 px-4 py-3 backdrop-blur">
                                <div className="font-display text-2xl leading-none text-primary">49.99 lei</div>
                                <div className="text-xs uppercase leading-tight tracking-wide text-muted-foreground">
                                    Tricou
                                    <br />
                                    Street walk
                                </div>
                            </div>
                        </div>

                        {/* Imagini secundare */}
                        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                            <img
                                src="https://cdn.auxload-store.ro/uploads/Whats_App_Image_2026_07_24_at_8_57_00_PM_85f0b2a3be.jpeg"
                                alt="Hanorac VOLT heavyweight alb ivoire"
                                width={400}
                                height={400}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                            <img
                                src="https://cdn.auxload-store.ro/uploads/Whats_App_Image_2026_07_24_at_9_05_39_PM_f3e4edbc1a.jpeg"
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
        </div>

        
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border p-4 transition-colors hover:bg-muted/50">
      <div className="rounded-xl border bg-background p-3">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}