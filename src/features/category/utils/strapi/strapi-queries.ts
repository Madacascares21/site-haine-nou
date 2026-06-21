import { gql } from 'graphql-request'


`      categories {
        products {
          slug
        }
      }`

const nodes = `
      documentId
      title
      seo {
      title
      description
      media {
        url
      }
    }
      slug
      pricing {
          original_price
          discounted_price
          final_price
        }
      categories {
        name
      }
        sub_categories {
        name
      }
      description
      updatedAt
      variants {
        documentId
        sku
        variant_name
        available
        updatedAt
        images {
          url
        }
        attributes {
          material
          size
          color {
            code
            name
          }
          
        }
      }
    `


export const GET_PRODUCTS = gql`
query (
  $category: String
  $subCategory: String
  $page: Int
  $pageSize: Int
  $sortBy: [String]
  $colors: [String]
  $sizes: [String]
  $minPrice: Float
  $maxPrice: Float
) {
  products_connection(
    sort: $sortBy
    filters: {
      categories: { name: { eq: $category } }
      sub_categories: { name: { eq: $subCategory } }
      pricing: { final_price: { gte: $minPrice, lte: $maxPrice } }

      variants: {
        attributes: { size: { in: $sizes }, color: { code: { in: $colors } } }
      }
    }

    pagination: { pageSize: $pageSize, page: $page }
  ) {
    nodes {${nodes}}
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}


`


export const GET_SITEMAP_PRODUCTS = gql`
query{
  products_connection{
    nodes {${nodes}}
     pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}




`


const similarProduct = `
      categories_connection {
        nodes {
          products {
            ${nodes}
          }
        }
      }`



export const GET_CATEGORIES = gql`
query{
  categories_connection {
    nodes {
      name
      media {
        url
      }
    }
  }
}
`

export const GET_COLORS = gql`
query{
  colors_connection {
    nodes {
      code
      name
    }
  }
}
`


export const GET_PRODUCT_BY_DOCUMENTID = gql`
query ($productID: ID , $variantID:ID) {
  products_connection(filters: { documentId: { eq: $productID } }) {
    nodes {
      ${nodes}
      variants_connection(filters:  {
         documentId:  {
            eq: $variantID
         }
      }) {
        nodes {
        documentId
        sku
        variant_name
        available
        updatedAt
        images {
          url
        }
        attributes {
          material
          size
          color {
            code
            name
          }
        }
      }
      }
    }
  }
}

`


export const MUTATE_ORDER = gql`
mutation ($data: OrderInput!) {
  createOrder(data: $data) {
   documentId
  }
}

`


