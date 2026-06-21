import { GraphQLClient, gql } from "graphql-request";
//#region src/lib/strapi.ts
var strapi = new GraphQLClient("http://localhost:1337/graphql", { headers: { Authorization: `Bearer 91c0d46d53176ae4e8222a4e1126ff54ccb566f5716284879ebca3feecd9f7f0d2d142c7687d5fb750931edef19c6aca6902879654c8492def4e17cca27beda0476db19c7a73b2901d5db8b8ab4cfdf7bf10854b87401a70455d21f1be66f868a79f63754cda35d852a9c06539a1955c00a4c58149e1adcd537db6453017cbd7` } });
//#endregion
//#region src/features/Products/graphql/product.query.ts
var nodes = `
     documentId
      name
      description
      slug
      categories {
        name
      }
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
    `;
var GET_PRODUCTS = gql`
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



`;
var GET_CARD_PRODUCTS = gql`
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
`;
var GET_PRODUCT_BY_DOCUMENT_ID = gql`
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

`;
gql`
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
`;
var GET_PRODUCT_BY_SLUG = gql`
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
      ${nodes} ${`
      categories_connection {
        nodes {
          products {
            ${nodes}
          }
        }
      }`}
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}


`;
gql`
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

`;
//#endregion
export { strapi as a, GET_PRODUCT_BY_SLUG as i, GET_PRODUCTS as n, GET_PRODUCT_BY_DOCUMENT_ID as r, GET_CARD_PRODUCTS as t };
