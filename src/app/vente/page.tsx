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

/* ====================== STRIPE ====================== */
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
      confirmParams: { return_url: `${window.location.origin}/merci` },
    });
    if (result.error) {
      setError(result.error.message ?? "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
      <PaymentElement />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full cursor-pointer rounded-md bg-[#22c55e] py-4 text-center text-lg font-bold uppercase tracking-wider text-white transition hover:bg-[#16a34a] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Traitement..." : "PAYER 17 € MAINTENANT →"}
      </button>
    </form>
  );
}

function PaymentModal({
  clientSecret,
  onClose,
}: {
  clientSecret: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#1a1a1a] p-6 border border-[#333]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-2xl leading-none text-gray-400 hover:text-white"
        >
          &times;
        </button>
        <h3 className="mb-1 text-center text-xl font-bold text-white">
          Finalisez votre commande
        </h3>
        <p className="mb-5 text-center text-sm text-gray-400">
          Le Code Interdit — 17 €
        </p>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "night",
              variables: { borderRadius: "6px", colorPrimary: "#22c55e" },
            },
            locale: "fr",
          }}
        >
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}

/* ====================== STARS ====================== */
function Stars5() {
  return (
    <span className="inline-flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </span>
  );
}

/* ====================== DEVICE MOCKUP ====================== */
function DeviceMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      {/* Tablet / monitor frame */}
      <div className="rounded-[20px] border-[3px] border-white/20 bg-black p-2 shadow-2xl">
        {/* Screen - Tinder-like interface with red overlay */}
        <div className="relative overflow-hidden rounded-[14px] bg-[#c41e3a]">
          {/* Tinder top bar */}
          <div className="flex items-center justify-between bg-white px-3 py-2">
            <span className="text-[11px] font-semibold text-[#fe3c72]">
              🔥 tinder
            </span>
            <div className="flex gap-2 text-[10px] text-gray-400">
              <span>👤</span>
              <span>💬</span>
              <span>⚡</span>
            </div>
          </div>

          {/* Profile area with red gradient overlay */}
          <div className="relative flex flex-col items-center justify-center px-4 py-10">
            {/* Semi-transparent red overlay */}
            <div className="absolute inset-0 bg-[#c41e3a]/80" />

            {/* Sound icon */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <svg
                className="h-12 w-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM3 9v6h4l5 5V4L7 9H3z" />
              </svg>
              <p className="text-lg font-bold text-white">
                Clique pour activer
              </p>
              <p className="text-lg font-bold text-white">Le son</p>
            </div>
          </div>

          {/* Profile name */}
          <div className="bg-[#c41e3a]/60 px-4 pb-2 pt-1">
            <p className="text-sm font-bold text-white">Hanna 24</p>
            <p className="text-[10px] text-white/70">📍 à 1 km</p>
          </div>

          {/* Bottom emojis row */}
          <div className="flex justify-center gap-1 bg-white/10 px-2 py-1.5">
            {["😍", "🔥", "💘", "😂", "🥰", "😏"].map((e, i) => (
              <span
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/30 text-xs"
              >
                {e}
              </span>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-around bg-white px-4 py-2">
            {["🔥", "⊞", "✦", "💬", "👤"].map((icon, i) => (
              <span key={i} className="text-sm text-gray-400">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================== PRODUCT MOCKUP (devices) ====================== */
function ProductDevices() {
  return (
    <div className="relative mx-auto mb-4 flex items-end justify-center gap-1">
      {/* Laptop */}
      <div className="relative">
        <div className="h-[60px] w-[100px] rounded-t-md border border-gray-600 bg-[#1a0a0a] p-1">
          <div className="h-full w-full rounded-sm bg-[#c41e3a]" />
        </div>
        <div className="h-[4px] w-[110px] -ml-[5px] rounded-b-sm bg-gray-600" />
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[5px] font-bold text-white whitespace-nowrap">
          FORMATION COMPLÈTE
        </span>
      </div>
      {/* Tablet */}
      <div className="relative -ml-2">
        <div className="h-[50px] w-[38px] rounded-md border border-gray-600 bg-[#1a0a0a] p-0.5">
          <div className="h-full w-full rounded-sm bg-[#c41e3a]" />
        </div>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[4px] font-bold text-white whitespace-nowrap">
          LE SCORE CACHÉ
        </span>
      </div>
      {/* Phone */}
      <div className="relative -ml-1">
        <div className="h-[45px] w-[24px] rounded-md border border-gray-600 bg-[#1a0a0a] p-0.5">
          <div className="h-full w-full rounded-sm bg-[#c41e3a]" />
        </div>
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[3px] font-bold text-white whitespace-nowrap">
          MATCHS EXPRESS
        </span>
      </div>
      {/* Extra small */}
      <div className="relative -ml-0.5">
        <div className="h-[40px] w-[22px] rounded-md border border-gray-600 bg-[#1a0a0a] p-0.5">
          <div className="h-full w-full rounded-sm bg-[#c41e3a]" />
        </div>
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[3px] font-bold text-white whitespace-nowrap">
          TECHNIQUE M.A.E
        </span>
      </div>
    </div>
  );
}

/* ====================== CHAT SCREENSHOT ====================== */
function ChatScreenshot() {
  return (
    <div className="mt-8 flex items-center gap-3">
      {/* Left chat */}
      <div className="flex-1 rounded-lg border border-gray-700 bg-[#111] p-2">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-gray-600" />
          <span className="text-[10px] font-semibold text-white">
            Gabin | Code Interdit
          </span>
          <span className="ml-auto text-[9px] text-gray-500">📞 🎥</span>
        </div>
        <div className="mb-1 text-[8px] font-semibold text-gray-400">
          Nouveaux Matchs
        </div>
        <div className="mb-2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500"
            />
          ))}
        </div>
        <div className="text-[8px] font-semibold text-gray-400">Messages</div>
        <div className="mt-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gray-600" />
            <div>
              <p className="text-[8px] font-semibold text-white">Aurora</p>
              <p className="text-[7px] text-gray-500">Activité récente · Match...</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gray-600" />
            <div>
              <p className="text-[8px] font-semibold text-white">Christina</p>
              <p className="text-[7px] text-gray-500">Parfait pour vendredi soir...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0">
        <svg
          className="h-8 w-8 text-red-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.025 1l-2.847 2.828 6.176 6.176H0v3.992h16.354l-6.176 6.176L13.025 23 24 12.025z" />
        </svg>
      </div>

      {/* Right chat */}
      <div className="flex-1 rounded-lg border border-gray-700 bg-[#111] p-2">
        <div className="mb-1 text-[8px] font-semibold text-gray-400">
          Nouveaux Matchs
        </div>
        <div className="mb-2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500"
            />
          ))}
        </div>
        <div className="text-[8px] font-semibold text-gray-400">Messages</div>
        <div className="mt-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gray-600" />
            <div>
              <p className="text-[8px] font-semibold text-white">Aurora</p>
              <p className="text-[7px] text-gray-500">Activité récente · Match...</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gray-600" />
            <div>
              <p className="text-[8px] font-semibold text-white">Christina</p>
              <p className="text-[7px] text-gray-500">Parfait pour vendredi soir...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================== MAIN PAGE ====================== */
export default function Vente() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  async function handleBuy() {
    setLoadingPayment(true);
    const res = await fetch("/api/create-payment-intent", { method: "POST" });
    const data = await res.json();
    setClientSecret(data.clientSecret);
    setLoadingPayment(false);
  }

  return (
    <div className="min-h-screen bg-black font-[family-name:var(--font-inter)]">
      {/* ===== TOP RED BAR ===== */}
      <div className="bg-[#c41e3a] py-2.5 text-center">
        <p className="px-4 text-[11px] font-bold uppercase tracking-wider text-white sm:text-xs">
          Pour ceux qui cherchent à obtenir 30 matchs par jour sur Tinder sans
          changer leurs photos pour seulement 17€
        </p>
      </div>

      {/* ===== LOGO ===== */}
      <div className="py-5 text-center">
        <span className="text-xl font-black tracking-tight sm:text-2xl">
          LE{" "}
          <span className="bg-[#c41e3a] px-1.5 py-0.5 text-white">CODE</span>{" "}
          INTERDIT
        </span>
      </div>

      {/* ===== RÉVÉLATION BADGE ===== */}
      <div className="flex justify-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#555] px-6 py-2.5 shadow-lg">
          <span className="h-3 w-3 rounded-full bg-[#c41e3a] shadow-[0_0_6px_#c41e3a]" />
          <span className="text-sm font-bold text-white sm:text-base">
            RÉVÉLATION :{" "}
            <span className="font-normal text-gray-200">
              Ce Que Personne Ne T&apos;a Jamais Dit Sur Tinder...
            </span>
          </span>
        </div>
      </div>

      {/* ===== HEADLINE ===== */}
      <div className="mx-auto mt-8 max-w-[750px] px-4 text-center">
        <h1 className="font-[family-name:var(--font-oswald)] text-[32px] font-bold leading-[1.1] text-white sm:text-[42px] lg:text-[52px]">
          Comment Des Mecs Ordinaires Obtiennent Jusqu&apos;À 5X Plus De Matchs
          Sur Tinder En Exploitant La Faille Cachée Que 99% Des Utilisateurs
          Ignorent
        </h1>
      </div>

      {/* ===== SUBHEADLINE ===== */}
      <div className="mx-auto mt-5 max-w-[620px] px-4 text-center">
        <p className="text-[14px] leading-relaxed text-gray-300 sm:text-[15px]">
          Sans être mannequin, sans photos professionnelles et sans payer des
          abonnements premium. C&apos;est LA méthode qui te rend instantanément
          visible aux filles qui te plaisent vraiment - même si tu te sens
          invisible depuis des mois.
        </p>
      </div>

      {/* ===== TWO COLUMNS: VIDEO + PRICING ===== */}
      <div className="mx-auto mt-10 grid max-w-[1000px] grid-cols-1 items-start gap-8 px-4 lg:grid-cols-[1fr_380px]">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center">
          <DeviceMockup />

          {/* Testimonial */}
          <p className="mt-5 text-center text-sm italic text-gray-300">
            &laquo;Plus de 100 matchs en 1 semaine, trop facile.&raquo; –{" "}
            <span className="font-semibold not-italic">Gabin T.</span>
          </p>

          {/* Chat screenshots */}
          <ChatScreenshot />

          {/* Verified */}
          <p className="mt-3 text-center text-xs text-gray-500">
            Client vérifié - Gabin I.
          </p>
        </div>

        {/* RIGHT COLUMN: PRICING BOX */}
        <div className="rounded-2xl border border-[#c41e3a]/40 bg-[#111] p-5 shadow-[0_0_30px_rgba(196,30,58,0.15)] sm:p-6">
          {/* Logo */}
          <div className="mb-4 text-center">
            <span className="text-sm font-black tracking-tight">
              LE{" "}
              <span className="bg-[#c41e3a] px-1 py-0.5 text-[11px] text-white">
                CODE
              </span>{" "}
              INTERDIT
            </span>
          </div>

          {/* Device images */}
          <ProductDevices />

          {/* Price */}
          <h2 className="text-center text-[22px] font-extrabold leading-tight sm:text-[26px]">
            Seulement 17€ Aujourd&apos;hui
          </h2>
          <p className="text-center text-base text-gray-400">
            (au lieu de{" "}
            <span className="line-through">97€</span>)
          </p>

          {/* Red savings text */}
          <p className="mt-2 text-center text-sm font-bold text-[#c41e3a]">
            Tu Économises Instantanément 80€
          </p>

          {/* Description */}
          <p className="mt-3 text-center text-xs leading-relaxed text-gray-400">
            Dans Le Cadre De Notre Lancement V2.0, Pour Obtenir Plus De
            Témoignages, Tu Peux Avoir Un Accès Immédiat Pour{" "}
            <span className="line-through">97€</span> Seulement 17€
            Aujourd&apos;hui ! Attention, Nous Augmenterons À Nouveau Le Prix
            Une Fois Que Nous Aurons Suffisamment De Témoignages.
          </p>

          {/* Reduction badge */}
          <p className="mt-4 text-center text-sm font-bold text-[#c41e3a]">
            ↓ 80% DE RÉDUCTION Aujourd&apos;hui !
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={handleBuy}
            disabled={loadingPayment}
            className="mt-4 w-full cursor-pointer rounded-md border-2 border-[#22c55e] bg-[#22c55e] py-4 text-center text-[17px] font-bold uppercase tracking-wider text-white transition hover:bg-[#16a34a] hover:border-[#16a34a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingPayment ? "Chargement..." : "ACCÈS IMMÉDIAT →"}
          </button>

          {/* Stars + reviews */}
          <div className="mt-3 flex flex-col items-center gap-1">
            <Stars5 />
            <p className="text-[11px] text-gray-400">
              4.8/5 basé sur 763 utilisateurs
            </p>
          </div>

          {/* Secure payment */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
            <span>Paiement sécurisé &amp; garanti</span>
            <span className="font-semibold text-gray-400">| powered by</span>
            <span className="font-bold text-[#635bff]">stripe</span>
          </div>

          {/* Payment icons */}
          <div className="mt-2.5 flex items-center justify-center gap-2">
            {[
              { name: "PayPal", bg: "#003087", text: "PayPal" },
              { name: "Visa", bg: "#1a1f71", text: "VISA" },
              { name: "MC", bg: "#eb001b", text: "MC" },
              { name: "Amex", bg: "#006fcf", text: "AMEX" },
            ].map((card) => (
              <div
                key={card.name}
                className="flex h-6 items-center rounded px-1.5 text-[8px] font-bold text-white"
                style={{ backgroundColor: card.bg }}
              >
                {card.text}
              </div>
            ))}
            <div className="flex h-6 items-center rounded bg-black border border-gray-600 px-1.5 text-[8px] font-bold text-white">
              Pay
            </div>
            <div className="flex h-6 items-center rounded bg-white px-1.5 text-[8px] font-bold text-black">
              G Pay
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16" />

      {/* ===== PAYMENT MODAL ===== */}
      {clientSecret && (
        <PaymentModal
          clientSecret={clientSecret}
          onClose={() => setClientSecret(null)}
        />
      )}
    </div>
  );
}
