console.log("ready");
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Sanity webhook received:', body);
 
    const secret = req.headers.get('x-webhook-secret');
    if (process.env.WEBHOOK_SECRET && secret !== process.env.WEBHOOK_SECRET) {
      console.warn('Unauthorized webhook request.');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
 
    const {
      _type,
      productId,
      variantId,
      campaignId,
      promotionId,
      title,
      name,
      description,
      calloutMsg
    } = body;
    console.log(`Received type=${_type}`);
 
    // Validate ID presence per type
    if (
      (_type === 'product' || _type === 'campaign') && !productId && !campaignId
    ) {
      return NextResponse.json({ message: 'Missing productId or campaignId' }, { status: 400 });
    }
    if (_type === 'variant' && (!productId || !variantId)) {
      return NextResponse.json({ message: 'Missing productId or variantId' }, { status: 400 });
    }
    if (_type === 'promotion' && !promotionId) {
      return NextResponse.json({ message: 'Missing promotionId' }, { status: 400 });
    }
 
    // Determine scope and SCAPI URL
    const authUrl = process.env.SFCC_SCAPI_AUTH_URL!;
    const authHeader = Buffer.from(`${process.env.SFCC_CLIENT_ID}:${process.env.SFCC_CLIENT_SECRET}`)
                          .toString('base64');
 
    const scope =
      _type === 'product' || _type === 'variant'
        ? `sfcc.products.rw`
        : `sfcc.promotions.rw`;
 
    const tokenRes = await axios.post(
      authUrl,
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope: `SALESFORCE_COMMERCE_API:${process.env.SFCC_TENANT} ${scope}`
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
 
    const accessToken = tokenRes.data.access_token;
    console.log('SCAPI token acquired');
 
    const baseUrl = process.env.SFCC_API_HOST!;
    const version = process.env.SFCC_API_VERSION!;
    const org = process.env.SFCC_ORGANIZATION_ID!;
    const siteId = process.env.SFCC_SITE_ID!;
 
    let patchUrl = '';
    const patchBody: any = {};
 
    if (_type === 'product'|| _type === 'variant') {
      patchUrl = `${baseUrl}/product/products/${version}/organizations/${org}/products/${productId}`;
      if (name) patchBody.name = { default: name };
      if (description)
        patchBody.longDescription = { default: { markup: description, source: description } };
    } else if (_type === 'campaign') {
      patchUrl = `${baseUrl}/pricing/campaigns/${version}/organizations/${org}/campaigns/${campaignId}?siteId=${siteId}`;
      if (title) patchBody.description = title;
      if (description) patchBody.description = description;
    } else if (_type === 'promotion') {
      patchUrl = `${baseUrl}/pricing/promotions/${version}/organizations/${org}/promotions/${promotionId}?siteId=${siteId}`;
      if (title) patchBody.name = { default: title };
      if (calloutMsg)
        patchBody.calloutMsg = { default: { markup: calloutMsg, source: calloutMsg } };
    } else {
      return NextResponse.json({ message: 'Unsupported type. Skipping.' }, { status: 200 });
    }
 
    console.log('PATCH URL:', patchUrl);
    console.log('PATCH body:', JSON.stringify(patchBody));
 
    const res = await axios.patch(patchUrl, patchBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-dw-client-site-id': siteId
      }
    });
 
    console.log(`SCAPI PATCH success for ${_type}`, res.data);
    return NextResponse.json({ message: `${_type} updated in SFCC`, data: res.data });
  } catch (err: any) {
    console.error('SCAPI sync error:', err.response?.data || err.message || err);
    return NextResponse.json(
      { message: 'Error syncing with SFCC', error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
 
 