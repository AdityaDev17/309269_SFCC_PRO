import { NextRequest } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request:NextRequest) {
  const basketDetails = await request.json();
  try {
    const customer = await stripe.customers.create({
      name: "Sanjay Kumar",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    });
    const paymentIntent = await stripe.paymentIntents.create({
      currency: basketDetails?.basketDetails?.basketInfo?.currency,
      amount: basketDetails?.basketDetails?.basketInfo?.productTotal.toFixed(2)
        .toString()
        .replace(".", ""),
      automatic_payment_methods: { enabled: true },
      description: "Software development services",
      customer: customer.id,
      metadata: {
        basketId: basketDetails?.basketDetails?.basketInfo?.basketId,
        addPayment: "cart",
      },
    });
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
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
