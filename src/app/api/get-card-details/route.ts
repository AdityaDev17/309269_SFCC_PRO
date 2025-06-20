import { NextRequest } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request:NextRequest) {
  const paymentMethodId = await request.json();
  try {
    const paymentMethodDetails = await stripe.paymentMethods.retrieve(paymentMethodId?.paymentMethodId);

    return new Response(
      JSON.stringify({
        paymentMethodDetails
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "X-Content-Type-Options": "nosniff",
          "X-XSS-Protection": "1; mode=block",
        },
      }
    );
  } catch (e:any) {
    return new Response(
      JSON.stringify({
        error: {
          message: e.message,
        },
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "X-Content-Type-Options": "nosniff",
          "X-XSS-Protection": "1; mode=block",
        },
      }
    );
  }
}
