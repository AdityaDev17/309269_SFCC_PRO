// src/app/api/sync-sfcc/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Sanity webhook received:', body);

    // Validate webhook secret (optional)
    const secret = req.headers.get('x-webhook-secret');
    if (process.env.WEBHOOK_SECRET && secret !== process.env.WEBHOOK_SECRET) {
      console.warn('Unauthorized webhook request.');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Extract basic fields
    const { _type, productId, name, description } = body;

    if (!_type || !productId) {
      return NextResponse.json({ message: 'Missing required fields (_type or productId)' }, { status: 400 });
    }

    // Only sync if the document is a product or variant
    if (_type !== 'product' && _type !== 'variant') {
      return NextResponse.json({ message: 'Not a product or variant. Skipping.' }, { status: 200 });
    }

    // Step 1: Get bearer token from SCAPI
    const authUrl = process.env.SFCC_SCAPI_AUTH_URL!;
    const clientId = process.env.SFCC_ADMIN_CLIENT_ID!;
    const clientSecret = process.env.SFCC_ADMIN_CLIENT_SECRET!;

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenRes = await axios.post(
      authUrl,
      new URLSearchParams({ grant_type: 'client_credentials', scope: `SALESFORCE_COMMERCE_API:${process.env.SFCC_TENANT} sfcc.products.rw` }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenRes.data.access_token;
    console.log('SCAPI Token acquired');

    // Step 2: Construct PATCH URL
    const baseUrl = process.env.SFCC_SCAPI_BASE_URL!;
    const version = process.env.SFCC_SCAPI_VERSION!;
    const orgId = process.env.SFCC_ORGANIZATION_ID!;
    const siteId = process.env.SFCC_SITE_ID!;
    const patchUrl = `${baseUrl}/product/products/${version}/organizations/${orgId}/products/${productId}`;

    // Step 3: Build PATCH payload
    const patchBody: any = {};

    if (name) {
      patchBody.name = { default: name };
    }

    if (description) {
      patchBody.longDescription = {
        default: {
          markup: description,
          source: description,
        },
      };
    }

    // Step 4: Make PATCH call to SCAPI
    const patchRes = await axios.patch(patchUrl, patchBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-dw-client-site-id': siteId,
      },
    });

    console.log('SFCC PATCH successful:', patchRes.data);

    return NextResponse.json({ message: 'Product updated in SFCC', data: patchRes.data });
  } catch (error) {
    console.error('Error syncing with SFCC:', error);
    return NextResponse.json(
      {
        message: 'Error syncing with SFCC',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
