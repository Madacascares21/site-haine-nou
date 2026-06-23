import { navigation } from "#/features/header/constant";
import { getStrapiMedia } from "#/lib/utils";
import { Link } from "@tanstack/react-router";
import Container from "./container";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

function CategoryGrid({
    items,
    gender
}: {
    items: NonNullable<(typeof navigation)[number]["children"]>;
    gender: string
}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {items.map((cat) => (
                <Link
                    key={cat.label}
                    to="/c/$category/{-$subCategory}"
                    params={{
                        category: gender, subCategory: cat.label
                    }}
                    className="relative group overflow-hidden rounded-2xl h-40 md:h-56 bg-gray-900"
                >
                    {cat.image && (
                        <img
                            src={getStrapiMedia(cat.image)}
                            alt={cat.label}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    )}

                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />

                    <div className="relative z-10 p-4 md:p-6 flex flex-col justify-end h-full">
                        <h3 className="text-white text-lg md:text-xl font-bold">
                            {cat.label}
                        </h3>

                        <span className="mt-2 inline-block text-xs md:text-sm text-white/80 group-hover:text-white transition">
                            Explore →
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default function CategoryBannerSection() {
    const tabs = navigation.filter(
        (item) => item.label === "barbati" || item.label === "femei"
    );

    return (
        <section className="w-full px-4 md:px-10 py-10">
            <Container>
                <h2 className="text-2xl font-semibold mb-4">
                    Categorii de haine
                </h2>

                <Tabs defaultValue={tabs[0]?.label}>
                    <TabsList className="bg-black/20">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.label}>
                                {tab.label === "barbati" ? "Bărbați" : "Femei"}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map((tab) => (
                        <TabsContent key={tab.label} value={tab.label}>
                            <CategoryGrid items={tab.children ?? []} gender={tab.label} />
                        </TabsContent>
                    ))}
                </Tabs>
            </Container>
        </section>
    );
}