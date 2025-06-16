import axios from 'axios';
import dotenv from 'dotenv';
import csv from 'csvtojson';
import { createClient } from '@sanity/client';
import slugify from 'slugify';

dotenv.config();

interface ProductRow {
  SKU: string;
  ID: string;
  'name__default': string;
  'longDescription__default': string;
  'category-id': string;
  amount: string;
  currency: string;
  'onlineFlag__default': string;
  variants: string;
  lastModified_date: string;
}

// Setup Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_TOKEN!,
  useCdn: false,
  apiVersion: '2023-10-01',
});

// 1. Get Bearer token from SFCC
async function getBearerToken(): Promise<string> {
  const { SFCC_AUTH_URL, SFCC_CLIENT_ID, SFCC_CLIENT_SECRET } = process.env;

  const authHeader = Buffer.from(`${SFCC_CLIENT_ID}:${SFCC_CLIENT_SECRET}`).toString('base64');

  const response = await axios.post(SFCC_AUTH_URL!, null, {
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
}

// 2. Fetch CSV feed from SFCC
async function fetchCSVFeed(token: string): Promise<string> {
  const response = await axios.get(process.env.SFCC_FEED_URL!, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'text',
  });
  return response.data;
}

// 3. Map a row to a Sanity product document
function mapToSanityDoc(row: ProductRow) {
  const safeId = slugify(row.ID || row['name__default'] || 'untitled', {
    lower: true,
    strict: true,
  });

  const parsedDate = new Date(row.lastModified_date?.trim());
  const lastModified = !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null;

  return {
    _id: safeId,
    _type: 'product',
    sku: row.SKU,
    productId: row.ID,
    title: row['name__default'],
    slug: { current: safeId },
    description: row['longDescription__default'],
    category: row['category-id'],
    price: parseFloat(row.amount),
    currency: row.currency,
    orderable: row['onlineFlag__default'] === 'TRUE',
    variants: row.variants,
    lastModified,
    // image: null, // Optional: populate if you have images later
  };
}

// 4. Import to Sanity in batches
async function importToSanity(data: ProductRow[], batchSize = 200) {
  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);

    const docsToImport = await Promise.all(
      batch.map(async (row) => {
        try {
          const doc = mapToSanityDoc(row);

          const existing = await client.fetch(`*[_type == "product" && _id == $id][0]`, {
            id: doc._id,
          });

          if (existing?.lastModified === doc.lastModified) {
            console.log(`Skipped (unchanged): ${doc.title}`);
            skipped++;
            return null;
          }

          return doc;
        } catch (err) {
          console.error(`Error mapping row ${row.ID}:`, err);
          failed++;
          return null;
        }
      })
    );

    const validDocs = docsToImport.filter(Boolean) as any[];

    if (validDocs.length > 0) {
      await Promise.allSettled(validDocs.map((doc) => client.createOrReplace(doc)));

      validDocs.forEach((doc) => {
        console.log(`Imported: ${doc.title}`);
        imported++;
      });
    }
  }

  console.log('\n --- Import Summary ---');
  console.log(`Imported: ${imported}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
}

// 5. Main
(async () => {
  try {
    const token = await getBearerToken();
    const csvData = await fetchCSVFeed(token);
    const jsonData: ProductRow[] = await csv().fromString(csvData);

    console.log(`Fetched ${jsonData.length} rows from SFCC.`);
    await importToSanity(jsonData);
    console.log('Import completed!');
  } catch (error) {
    console.error('Import failed:', error);
  }
})();
