"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/merci`,
      },
    });

    if (result.error) {
      setError(result.error.message ?? "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-left">
      <PaymentElement />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full cursor-pointer rounded-lg bg-black py-3 text-base font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Traitement en cours..." : "Payer 47 €"}
      </button>
    </form>
  );
}

function PaymentSection({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            borderRadius: "8px",
          },
        },
        locale: "fr",
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}

export default function Vente() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    const res = await fetch("/api/create-payment-intent", { method: "POST" });
    const data = await res.json();
    setClientSecret(data.clientSecret);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Ma Formation
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Accédez à l&apos;intégralité de la formation dès maintenant.
        </p>
        <p className="mt-2 text-3xl font-bold">47 €</p>

        {!clientSecret ? (
          <button
            onClick={handleBuy}
            disabled={loading}
            className="mt-10 w-full cursor-pointer rounded-lg bg-black py-3 text-base font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Chargement..." : "Acheter maintenant — 47 €"}
          </button>
        ) : (
          <PaymentSection clientSecret={clientSecret} />
        )}
      </div>
    </div>
  );
}
