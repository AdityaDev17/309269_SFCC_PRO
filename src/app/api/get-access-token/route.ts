export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const urlencoded = new URLSearchParams();

    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", process.env.AGENT_FORCE_CLIENT_ID || "");
    urlencoded.append(
      "client_secret",
      process.env.AGENT_FORCE_CLIENT_SECRET || ""
    );

    const response = await fetch(
      "https://accenture51.my.salesforce.com/services/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie:
            "BrowserId=iXou41ZKEfCqa4ciahzaDw; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1",
        },
        body: urlencoded,
        redirect: "follow",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error || "error" },
        { status: response.status }
      );
    }

    return NextResponse.json({ accessToken: result.access_token });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
 