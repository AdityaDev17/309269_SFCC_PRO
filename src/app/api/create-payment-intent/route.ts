import { NextRequest } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const basketDetails = await request.json();
  try {
    const customer = await stripe.customers.create({
      name: basketDetails?.basketDetails?.basketInfo?.shipments?.[0]
        ?.shippingAddress?.firstName,
      address: {
        line1:
          basketDetails?.basketDetails?.basketInfo?.shipments?.[0]
            ?.shippingAddress?.address1,
        postal_code:
          basketDetails?.basketDetails?.basketInfo?.shipments?.[0]
            ?.shippingAddress?.postalCode,
        city: basketDetails?.basketDetails?.basketInfo?.shipments?.[0]
          ?.shippingAddress?.city,
        state:
          basketDetails?.basketDetails?.basketInfo?.shipments?.[0]
            ?.shippingAddress?.stateCode,
        country:
          basketDetails?.basketDetails?.basketInfo?.shipments?.[0]
            ?.shippingAddress?.countryCode,
      },
    });
    const paymentIntent = await stripe.paymentIntents.create({
      currency: basketDetails?.basketDetails?.basketInfo?.currency,
      amount: Math.floor(
        basketDetails?.basketDetails?.basketInfo?.productTotal
      ),
      automatic_payment_methods: { enabled: true },
      description: "Software development services",
      customer: customer?.id,

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
  } catch (e: any) {
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
