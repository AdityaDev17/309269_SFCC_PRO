import { NextRequest, NextResponse } from "next/server";
 
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { sessionId, text, accessToken } = body;
 
        if (!sessionId || !text || !accessToken) {
            return NextResponse.json({ error: "Missing sessionId, text, or accessToken" }, { status: 400 });
        }
 
        const payload = {
            message: {
                sequenceId: 1,
                type: "Text",
                text: text,
            },
            variables: [],
        };
 
        const response = await fetch(
            `https://api.salesforce.com/einstein/ai-agent/v1/sessions/${sessionId}/messages`,
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
            message: result?.messages?.[0]?.message,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}