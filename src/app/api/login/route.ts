import { NextRequest, NextResponse } from 'next/server';

import { helpers, ShopperLogin } from "commerce-sdk-isomorphic"

const config = {
  parameters: {
    clientId: "68224742-4e6d-45e3-acf7-2b75d5d2bdb0",
    organizationId: "f_ecom_zzrl_003",
    shortCode: "kv7kzm78",
    siteId: "accPro",
  },
  proxyPath: "http://127.0.0.1:3000",
}

export async function POST(request: NextRequest) {
  try {
    const {email: username, password} = await request.json();
    const loginClient = new ShopperLogin(config);
    const authResponse = await helpers.loginRegisteredUserB2C(loginClient,{username, password, clientSecret: "786YbgQ5H_SKaLmyh8w-5sT8Qza8o6smBrSY0H8nRDk"}, { redirectURI: `${config.proxyPath}/callback` });
    console.log(authResponse);
    return NextResponse.json(authResponse, {
      status: 200
    })
  } catch(error) {
    return NextResponse.json(
      { message: 'Incorrect credentials' },
      { status: 500 }
    );
  }
}