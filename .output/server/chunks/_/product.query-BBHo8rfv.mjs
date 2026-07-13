import { GraphQLClient, gql } from 'graphql-request';

var strapi = new GraphQLClient("https://orderly-wonder-8bfec8c76b.strapiapp.com/graphql", { headers: { Authorization: `Bearer 6592dd8962e9ce555c8e87696a21f33f2b16d26d9298bfe34bf6c6f43d2eabf1c8264432825ea39a79bdad41573dff0eb37979cf5075a5f6b30f633ee22029ba3702e0b226afdf5ef007e93886ef624a84562260daa3b316d20d5b4593d184d42cb0fbe47b8057a3d3cc25e1d33a7211ac5d8e1d08a18bf25ecd28ffda1108f9` } });
var nodes = `
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
        qty
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
        qty
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
      qty
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
var updateVariantQTY = gql`  mutation UpdateVariantQty($documentId: ID!, $qty: Int!) {
    updateVariant(
      documentId: $documentId
      data: {
        qty: $qty
      }
    ) {
      documentId
      qty
      updatedAt
    }
  }`;
var GET_BATCH_PRODUCTS_QUERY = gql`query GetBatchProducts($productIds: [ID!], $variantIds: [ID!]) {
  products_connection(filters: { documentId: { in: $productIds } }) {
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
      # This will now filter and return ONLY the variants that are in the user's cart
      variants_connection(filters: { documentId: { in: $variantIds } }) {
        nodes {
          updatedAt
          name
          available
          qty
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
}`;
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

export { GET_CARD_PRODUCTS as G, GET_BATCH_PRODUCTS_QUERY as a, GET_PRODUCT_BY_SLUG as b, GET_PRODUCTS as c, strapi as s, updateVariantQTY as u };
//# sourceMappingURL=product.query-BBHo8rfv.mjs.map
