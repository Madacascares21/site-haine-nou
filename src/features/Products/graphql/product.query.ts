import { gql } from "graphql-request"

const nodes = `
     documentId
      name
      description
      slug
      categories {
        name
      }
                updatedAt

      sub_categories {
        name
      }
        seo{
          name
          description
          media{
            url
          }
        }
      pricing {
        original_price
        discounted_price
        final_price
      }
      variants {
        documentId
        updatedAt
        available
        name
        media {
          url
        }
        size {
          name
        }
        color {
          color_code
          name
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
        size: { name: { in: $sizes } }
        color: { color_code: { in: $colors } }
      }
    }

    pagination: { pageSize: $pageSize, page: $page }
  ) {
    nodes {
      documentId
      name
            description
seo{
          name
          description
          media{
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
      name
        documentId
        available
        updatedAt
        media {
          url
        }
        size {
          name
        }
        color {
          color_code
          name
        }
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}



`

export const GET_CARD_PRODUCTS = gql`
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
        size: { name: { in: $sizes } }
        color: { color_code: { in: $colors } }
      }
    }

    pagination: { pageSize: $pageSize, page: $page }
  ) {
    nodes {
      documentId
      name
      slug
      seo{
          name
          description
          media{
            url
          }
        }
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
      variants {
      updatedAt
      name
      available
        documentId
        media {
          url
        }
        size {
          name
        }
        color {
          color_code
          name
        }
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}
`

export const GET_PRODUCT_BY_DOCUMENT_ID = gql`
query ($productId: ID, $variantId: ID) {
  products_connection(filters: { documentId: { eq: $productId } }) {
    nodes {
      documentId
      name
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
      variants_connection(filters: { documentId: { eq: $variantId } }) {
        nodes {
             updatedAt
      name
      available
        documentId
        media {
          url
        }
        size {
          name
        }
        color {
          color_code
          name
        }
        }
      }
    }
  }
}

`




export const ID_TO_PRODUCTS = gql`
query ($productId: ID!, $variantId: ID!, $quantity: Int) {
  products_connection(filters: { documentId: { eq: $productId } }) {
    nodes {
      documentId
      name
      slug
      categories {
        name
      }
      sub_categories {
        name
      }
      pricing {
        original_price
        discounted_price
        final_price
      }
      variants_connection(filters: { documentId: { eq: $variantId } }) {
        nodes {
          available
          color {
            color_code
            name
          }
          name
          size {
            name
          }
          media {
            url
          }
        }
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}
`
export const similarProduct = `
      categories_connection {
        nodes {
          products {
            ${nodes}
          }
        }
      }`
export const GET_PRODUCT_BY_SLUG = gql`
 query (
  $slug: String
  
) {
  products_connection(
    filters:  {
       slug:  {
          eq: $slug
       }
    }

  ) {
    nodes {
      ${nodes} ${similarProduct}
    }
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
       name
             updatedAt

      available
        documentId
        media {
          url
        }
        size {
          name
        }
        color {
          color_code
          name
        }
        
        
      }
      }
    }
  }
}

`