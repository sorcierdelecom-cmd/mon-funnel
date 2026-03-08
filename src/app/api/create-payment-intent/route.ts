import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4700,
    currency: "eur",
    automatic_payment_methods: { enabled: true },
    metadata: {
      product: "Ma Formation",
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
