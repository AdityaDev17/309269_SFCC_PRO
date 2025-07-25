import { NextRequest, NextResponse } from 'next/server';
 
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
    if (_type === 'variant' && !productId ) {
      return NextResponse.json({ message: 'Missing productId for variant' }, { status: 400 });
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
 
    const tokenRes = await fetch(authUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: `SALESFORCE_COMMERCE_API:${process.env.SFCC_TENANT} ${scope}`
      }).toString()
    });

    if (!tokenRes.ok) {
      throw new Error(`Token request failed: ${tokenRes.status} ${tokenRes.statusText}`);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    console.log('SCAPI token acquired');
 
    const baseUrl = process.env.SFCC_API_HOST!;
    const version = process.env.SFCC_API_VERSION!;
    const org = process.env.SFCC_ORGANIZATION_ID!;
    const siteId = process.env.SFCC_SITE_ID!;
 
    let patchUrl = '';
    const patchBody: Record<string, any> = {};
    if (_type === 'product'){
      patchUrl = `${baseUrl}/product/products/${version}/organizations/${org}/products/${productId}`;
      if (name) patchBody.name = { default: name };
      if (description)
        patchBody.longDescription = { default: { markup: description, source: description } };
    } else if (_type === 'variant') {
  // const vid = encodeURIComponent(productId);
  patchUrl = `${baseUrl}/product/products/${version}/organizations/${org}/products/${productId}`;
  if (name) patchBody.name = { default: name };
  if (description) {
    patchBody.longDescription = {
      default: { markup: description, source: description }
    };
  }
} else if (_type === 'campaign') {
      patchUrl = `${baseUrl}/pricing/campaigns/${version}/organizations/${org}/campaigns/${campaignId}?siteId=${siteId}`;
      // if (title) patchBody.description = title;
      if (description) patchBody.description = description;
    } else if (_type === 'promotion') {
      const safePromoID = encodeURIComponent(promotionId);
      patchUrl = `${baseUrl}/pricing/promotions/${version}/organizations/${org}/promotions/${safePromoID}?siteId=${siteId}`;
      if (title) patchBody.name = { default: title};
      if (calloutMsg)
        patchBody.calloutMsg = { default: { markup: calloutMsg, source: calloutMsg } };
    } else {
      return NextResponse.json({ message: 'Unsupported type. Skipping.' }, { status: 200 });
    }
 
    console.log('PATCH URL:', patchUrl);
    console.log('PATCH body:', JSON.stringify(patchBody));
 
    const res = await fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-dw-client-site-id': siteId
      },
      body: JSON.stringify(patchBody)
    });

    if (!res.ok) {
      throw new Error(`SCAPI PATCH failed: ${res.status} ${res.statusText}`);
    }

    const responseData = await res.json();

    console.log(`SCAPI PATCH success for ${_type}`, responseData);
    return NextResponse.json({ message: `${_type} updated in SFCC`, data: responseData });
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('SCAPI sync error:', errorMessage);
    
    // Try to get more detailed error information if it's a fetch response error
    let errorData = errorMessage;
    if (err instanceof Response) {
      try {
        errorData = await err.text();
      } catch {
        errorData = `HTTP ${err.status}: ${err.statusText}`;
      }
    }
    
    return NextResponse.json(
      { message: 'Error syncing with SFCC', error: errorData },
      { status: 500 }
    );
  }
}
