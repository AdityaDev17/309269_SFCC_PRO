// studio-C4force/campaign-promotion-sfcc-to-sanity/fetch-campaigns-promotions.ts

import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import { v4 as uuidv4 } from "uuid";  // Unique key generator :contentReference[oaicite:1]{index=1}

dotenv.config();

// Sanitize IDs (letters, numbers, dot, underscore, dash ✳️ no spaces)
function sanitizeId(prefix: string, value: string): string {
  return `${prefix}-${value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9._-]/g, "-")}`;
}

// Normalize host URL
const rawHost = process.env.SFCC_API_HOST!;
const host = rawHost.replace(/^https?:\/\//, "").replace(/\/$/, "");
console.log("SFCC host:", host);

// Initialize Sanity
const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_WRITE_TOKEN!,
  apiVersion: "2025-07-01",
  useCdn: false,
});

// Initialize SFCC API client with fetch
class SfccApiClient {
  private baseURL: string;
  private timeout: number;
  private headers: Record<string, string>;
  private authToken?: string;

  constructor(baseURL: string, timeout = 10_000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.headers = { "Content-Type": "application/json" };
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  async post(path: string, body: any): Promise<{ data: any }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const headers = { ...this.headers };
      if (this.authToken) {
        headers.Authorization = `Bearer ${this.authToken}`;
      }

      const response = await fetch(`${this.baseURL}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

const sfccApi = new SfccApiClient(`https://${host}`);

// Utility to fetch hits
async function fetchHits(path: string) {
  const res = await sfccApi.post(path, {
    limit: 100,
    offset: 0,
    query: { match_all_query: {} },
    sorts: [{ field: "Id", sortOrder: "asc" }],
  });
  return (res.data as { hits: any[] }).hits;
}

// Build Sanity documents with unique keys
function buildDocs(camps: any[], promos: any[]) {
  // Campaign docs
  const campDocs = camps.map(c => ({
    _id: sanitizeId("campaign", c.campaignId),
    _type: "campaign",
    campaignId: c.campaignId,
    title: c.description || c.campaignId,
    description: c.description || "",
    enabled: c.enabled,
    coupons: c.coupons,
    promotions: [] as any[],
    creationDate: c.creationDate,
    lastModified: c.lastModified,
  }));

  // Promotion docs
  const promoDocs = promos.map(p => ({
    _id: sanitizeId("promotion", p.id),
    _type: "promotion",
    promotionId: p.id,
    title: p.name?.default || p.id,
    promotionClass: p.promotionClass || "",
    enabled: p.enabled,
    archived: p.archived,
    calloutMsg: p.calloutMsg?.default?.markup || "",
    campaignAssignments: (p.assignmentInformation.activeCampaignAssignments || []).map((a: any) => ({
      _key: uuidv4(),
      _type: "reference",
      _ref: sanitizeId("campaign", a.campaignId),
    })),
    creationDate: p.creationDate,
    lastModified: p.lastModified,
  }));

  // Link back promotions to campaigns, with keys
  const campIndex = Object.fromEntries(campDocs.map(c => [c._id, c]));
  promoDocs.forEach(p => {
    p.campaignAssignments.forEach((ref: any) => {
      const parent = campIndex[ref._ref];
      if (parent) {
        parent.promotions.push({
          _key: uuidv4(),
          _type: "reference",
          _ref: p._id,
        });
      }
    });
  });

  return { campDocs, promoDocs };
}

// Main sync
async function syncSFCCToSanity() {
  console.log("Requesting SFCC token...");
  const tokenRes = await fetch(
    `https://account.demandware.com/dwsso/oauth2/access_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.SFCC_CLIENT_ID}:${process.env.SFCC_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: `SALESFORCE_COMMERCE_API:${process.env.SFCC_TENANT} sfcc.promotions.rw`,
      }).toString()
    }
  );

  if (!tokenRes.ok) {
    throw new Error(`Token request failed: ${tokenRes.status} ${tokenRes.statusText}`);
  }

  const tokenData = await tokenRes.json();
  const authToken = (tokenData as { access_token: string }).access_token;
  process.env.SFCC_AUTH_TOKEN = authToken;
  sfccApi.setAuthToken(authToken);

  const version = process.env.SFCC_API_VERSION!;
  const org = process.env.SFCC_ORGANIZATION_ID!;
  const siteId = process.env.SFCC_SITE_ID!;
  const pathCamp = `/pricing/campaigns/${version}/organizations/${org}/campaigns?siteId=${siteId}`;
  const pathPromo = `/pricing/promotions/${version}/organizations/${org}/promotions?siteId=${siteId}`;

  console.log("Fetching campaigns & promotions...");
  const [camps, promos] = await Promise.all([fetchHits(pathCamp), fetchHits(pathPromo)]);
  console.log(`Fetched ${camps.length} campaigns and ${promos.length} promotions`);

  const { campDocs, promoDocs } = buildDocs(camps, promos);
  console.log(`Preparing to sync: ${campDocs.length} camp, ${promoDocs.length} promo`);

  const tx = sanity.transaction();
  campDocs.forEach(d => tx.createOrReplace(d));
  promoDocs.forEach(d => tx.createOrReplace(d));
  await tx.commit();

  console.log("Sync complete!");
}

syncSFCCToSanity().catch(err => {
  console.error("Sync failed:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});
