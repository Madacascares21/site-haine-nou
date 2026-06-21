type Category = {
    name: string
    media: { url: string }
}

type Color = {
    name: string
    code: string
}

interface CategoryResponseData {
    categories_connection: {
        nodes: Category[]
        pageInfo: {
            total: number
            pageSize: number
            pageCount: number
            page: number
        }
    }
}


interface ColorsResponseData {
    colors_connection: {
        nodes: Color[]
        pageInfo: {
            total: number
            pageSize: number
            pageCount: number
            page: number
        }
    }
}

