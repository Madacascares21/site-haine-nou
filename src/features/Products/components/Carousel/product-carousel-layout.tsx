
// import Link from "next/link"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import Container from "#/components/container"
import type { ReactNode } from "react"
import type { SortBy } from "../../type"

type ProductCarouselListProps = {
    label: string
    category?: string
    subCategory?: string
    sortBy?: SortBy
    children: ReactNode
}

const ProductCarouselLayout = ({ children, category, subCategory, label, sortBy = "new-products" }: ProductCarouselListProps) => {
    return (
        <section className=" w-full" aria-label={label} >
            <Container >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{label}</h2>
                    {category && <Link className="hover:underline text-sm flex items-center gap-1" to={"/c/$category/{-$subCategory}"} params={{ category, subCategory }} search={((prev: any) => ({ ...prev, sortBy })) as any}
                    >
                        <span>Vezi mai mult...</span>
                        <ArrowRight size={13} />
                    </Link>}

                </div>
                {children}
            </Container>
        </section>

    )
}






export default ProductCarouselLayout