import fs from 'fs/promises';
import path from 'path';

export interface BannerData {
  title: string;
  buttonText: string;
  description?: string;
  backgroundImage: string;
  alignment: string;
  buttonLink: string;
}

export interface ProductCard {
  productImage: string;
  productTitle: string;
  productDesc: string;
}

export interface HomepageContent {
  banners: BannerData[];
  products: ProductCard[];
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'homePageContent.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const content: HomepageContent = JSON.parse(fileContents);
  return content;
}

//In future for graphql integration:
// import { request, gql } from 'graphql-request';
// import type { HomepageContent } from './types';

// const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT!; {in .env file define GRAPHQL_ENDPOINT}

// export async function getHomepageContent(): Promise<HomepageContent> {
//   const query = gql`
//     query GetHomepageContent {
//       homepage {
//         banners {
//           title
//           buttonText
//           description
//           backgroundImage
//           alignment
//           buttonLink
//         }
//         products {
//           productImage
//           productTitle
//           productDesc
//         }
//       }
//     }
//   `;

//   const response = await request(GRAPHQL_ENDPOINT, query);
//   return response.homepage;
// }
