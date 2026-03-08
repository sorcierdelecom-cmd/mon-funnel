import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [3],
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    const error = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: error.message ?? "Erreur lors de l'inscription" },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true });
}
