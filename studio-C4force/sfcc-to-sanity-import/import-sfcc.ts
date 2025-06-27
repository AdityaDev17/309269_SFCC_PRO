import axios from 'axios';
import dotenv from 'dotenv';
import csv from 'csvtojson';
import slugify from 'slugify';
import { createClient } from '@sanity/client';

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
  variation_attributes: string;
  size: string;
  color: string;
  product_kind: string;
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_TOKEN!,
  useCdn: false,
  apiVersion: new Date().toISOString().split('T')[0],
});

async function getBearerToken(): Promise<string> {
  const { SFCC_AUTH_URL, SFCC_CLIENT_ID, SFCC_CLIENT_SECRET } = process.env!;
  const authHeader = Buffer.from(`${SFCC_CLIENT_ID}:${SFCC_CLIENT_SECRET}`).toString('base64');
  const res = await axios.post(SFCC_AUTH_URL!, null, {
    headers: { Authorization: `Basic ${authHeader}`, 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return res.data.access_token;
}

async function fetchCSVFeed(token: string): Promise<ProductRow[]> {
  const res = await axios.get(process.env.SFCC_FEED_URL!, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'text',
  });
  return csv().fromString(res.data);
}

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
}

async function importToSanity(rows: ProductRow[], batchSize = 250) {
  const masterProductIds = new Set<string>();
  const variantToParentMap: Record<string, string> = {};
  const variantsByMasterId: Record<string, string[]> = {};

  // Identify master products and their variants
  for (const row of rows) {
    if (row.product_kind === 'master' && row.variants) {
      const masterId = `product-${slugify(row.ID, { lower: true, strict: true })}`;
      masterProductIds.add(masterId);
      const variantIds = row.variants.split(';').map(v => slugify(v.trim(), { lower: true, strict: true })).filter(Boolean);
      variantsByMasterId[masterId] = variantIds.map(v => `variant-${v}`);
      for (const vid of variantIds) {
        variantToParentMap[`variant-${vid}`] = masterId;
      }
    }
  }

  const masterDocs: any[] = [];
  const variantDocs: any[] = [];
  const patchVariants: { patch: { id: string; set: { variants: any[] } } }[] = [];

  for (const row of rows) {
    const safeId = slugify(row.ID, { lower: true, strict: true });
    const commonFields = {
      sku: row.SKU,
      productId: row.ID,
      name: row['name__default'],
      description: row['longDescription__default'],
      categoryId: row['category-id'],
      price: parseFloat(row.amount),
      currency: row.currency,
      isOnline: row['onlineFlag__default'] === 'TRUE',
      lastModified: new Date(row.lastModified_date).toISOString(),
      variationAttributes: row.variation_attributes?.split(';').map(v => v.trim()).filter(Boolean) || [],
      importedAt: new Date().toISOString(),
    };

    if (row.product_kind === 'master') {
      masterDocs.push({
        _id: `product-${safeId}`,
        _type: 'product',
        ...commonFields,
        productKind: 'master',
      });
    }

    if (row.product_kind === 'variant') {
      const variantId = `variant-${safeId}`;
      const parentId = variantToParentMap[variantId];
      if (!parentId || !masterProductIds.has(parentId)) {
        console.warn(`Skipping orphan variant: ${row.ID} — no valid parent master product.`);
        continue;
      }
      variantDocs.push({
        _id: variantId,
        _type: 'variant',
        ...commonFields,
        size: row.size,
        color: row.color,
        productKind: 'variant',
        parentProduct: { _type: 'reference', _ref: parentId },
      });
    }
  }

  // Patches to link variants to master after both exist
  for (const [masterId, variantIds] of Object.entries(variantsByMasterId)) {
    const refs = variantIds.map(vid => ({ _key: vid, _type: 'reference', _ref: vid }));
    patchVariants.push({ patch: { id: masterId, set: { variants: refs } } });
  }

  const applyMutations = async (docs: any[]) => {
    const batches = chunk(docs, batchSize);
    for (const b of batches) {
      await client.mutate(b.map(d => ({ createOrReplace: d })));
    }
  };

  const applyPatches = async (patches: any[]) => {
    const nonNullPatches = patches.filter(Boolean);
    const batches = chunk(nonNullPatches, batchSize);
    for (const b of batches) {
      await client.mutate(b);
    }
  };

  console.log(`Importing ${masterDocs.length} master products...`);
  await applyMutations(masterDocs);

  console.log(`Importing ${variantDocs.length} variants...`);
  await applyMutations(variantDocs);

  console.log(`Patching ${patchVariants.length} master products with variant references...`);
  await applyPatches(patchVariants);

  console.log('Import completed successfully!');
}

(async () => {
  try {
    const token = await getBearerToken();
    const rows = await fetchCSVFeed(token);
    console.log(`Fetched ${rows.length} rows.`);
    await importToSanity(rows);
  } catch (err) {
    console.error('Import failed:', err);
    process.exit(1);
  }
})();
