import { gql } from "graphql-request";
import path from "path";
import fs from "fs";
import "dotenv/config";
import dotenv from "dotenv";

dotenv.config();


import { GraphQLClient } from 'graphql-request'

export const strapi = new GraphQLClient(
    process.env.VITE_STRAPI_GRAPHQL_URL!,
    {
        headers: {
            Authorization: `Bearer ${process.env.VITE_STRAPI_TOKEN ?? ''}`,
        },
    }
)


export interface Media {
    url: string;
}

export interface SubCategory {
    name: string;
    media: Media | null;
}

export interface Category {
    name: string;
    visible: boolean
    media: Media | null;
    sub_categories_connection: {
        nodes: SubCategory[];
    };
}

export interface Color {
    color_code: string;
    name: string;
}

export interface Size {
    name: string;
}

export interface CategoriesConnection {
    nodes: Category[];
}

export interface ColorsConnection {
    nodes: Color[];
}

export interface SizesConnection {
    nodes: Size[];
}

export interface Data {
    categories_connection: CategoriesConnection;
    colors_connection: ColorsConnection;
    sizes_connection: SizesConnection;
}

export interface ApiResponse {
    data: Data;
}


const query = gql`query ExampleQuery {
  categories_connection {
    nodes {
      name
      visible
      seo {
        name
        description
        media {
          url
        }
      }
      media {
        url
      }

      sub_categories_connection {
        nodes {
          name
          seo {
            name
            description
            media {
              url
            }
          }
          media {
            url
          }
        }
      }
    }
  }
  colors_connection {
    nodes {
      color_code
      name
    }
  }
  sizes_connection {
    nodes {
      name
    }
  }
}

`


const generateData = await strapi.request<ApiResponse>(query)


// const structuredData = {
//     navLinks: generateData.data.categories_connection.nodes.map((link) => {
//         const name = link.name
//         return {
//             name: link.name,
//             media: link.media?.url,
//             sub_categories: link.sub_categories_connection.nodes.map((s) => {
//                 return {
//                     name: s.name,
//                     media: s.media?.url
//                 }
//             })
//         }
//     }),
//     colors: generateData.data.colors_connection.nodes.map((c) => {
//         return {
//             name: c.name,
//             color_code: c.color_code
//         }
//     }),
//     sizes: generateData.data.sizes_connection.nodes.map((s) => {
//         return {
//             name: s.name
//         }
//     })
// }

async function writeDataToFile() {
    const data = generateData

    const outputDir = path.join("src", "generated");
    const outputFile = path.join(outputDir, "constants.ts");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const tsContent =
        `export const generatedData = ${JSON.stringify(data, null, 2)} as const;\n

    `;

    await fs.promises.writeFile(outputFile, tsContent, "utf8");

    console.log("✅ constants.ts generated!");
}

await writeDataToFile();