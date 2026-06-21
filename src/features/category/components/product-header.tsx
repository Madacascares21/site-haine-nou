import { getRouteApi } from "@tanstack/react-router";
import Container from "#/components/container";

const categoryRouteApi = getRouteApi('/c/$category/{-$subCategory}');


export function ProductHeader() {
  const params = categoryRouteApi.useParams()
  return (
    <header className=" bg-card">
      <Container className="">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">{params.subCategory ? params.subCategory.charAt(0).toUpperCase() + params.subCategory.slice(1): params.category.charAt(0).toUpperCase() + params.category.slice(1)}</h1>
            {/* <p className="mt-1 text-muted-foreground">Discover our curated selection of premium products</p> */}
          </div>

        </div>
      </Container>
    </header>
  )
}
