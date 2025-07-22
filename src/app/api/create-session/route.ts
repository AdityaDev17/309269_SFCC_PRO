import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
 
    const { accessToken } = body;
 
    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
 
    const payload = {
      externalSessionKey: uuidv4(),
      instanceConfig: {
        endpoint: "https://accenture51.my.salesforce.com",
      },
      tz: "America/Los_Angeles",
      variables: [
        {
          name: "$Context.EndUserLanguage",
          type: "Text",
          value: "en_US",
        },
      ],
      featureSupport: "Streaming",
      streamingCapabilities: {
        chunkTypes: ["Text"],
      },
      bypassUser: true,
    };
 
    const response = await fetch(
      "https://api.salesforce.com/einstein/ai-agent/v1/agents/0Xx7y0000002d3hCAA/sessions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );
 
    const result = await response.json();
 
    if (!response.ok) {
      return NextResponse.json({ error: result }, { status: response.status });
    }
 
    return NextResponse.json({
      sessionId: result.sessionId,
      message: result?.messages?.[0]?.message,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}