"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
      return;
    }

    router.push("/vente");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Votre headline accrocheur ici
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Décrivez en deux lignes la promesse de votre offre.
          <br />
          Expliquez pourquoi le visiteur devrait s&apos;inscrire maintenant.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-black py-3 text-base font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Inscription..." : "Accéder gratuitement"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Vos données restent confidentielles. Pas de spam.
        </p>
      </div>
    </div>
  );
}
