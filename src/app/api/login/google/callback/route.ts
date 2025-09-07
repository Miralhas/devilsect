import { env } from "@/env";
import { google } from "@/lib/auth";
import { googleOAuth2Schema } from "@/lib/schemas/google-oauth2";
import { createSession } from "@/lib/sessions";
import { ApiLoginResponse } from "@/types/api";
import { decodeIdToken, OAuth2Tokens } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
  const redirectUri = cookieStore.get("redirectUri")?.value ?? "/";

  cookieStore.delete("redirectUri");

  if (code === null || state === null || storedState === null || codeVerifier === null) {
    console.error("Google Authentication code || state || storedState || codeVerifier are null");
    redirect("/error");
  }

  if (state !== storedState) {
    console.error("Google Authentication state mismatch");
    redirect("/error");
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    console.error("Failed to validate google oauth2 authorization code", e)
    redirect("/error");
  }

  const claims = decodeIdToken(tokens.idToken());

  const parsed = googleOAuth2Schema.safeParse(claims);

  if (!parsed.success) {
    console.error("Google Claims parse failed!")
    redirect("/error");
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Google-Secret", env.GOOGLE_CLIENT_STALKERS_API_SECRET);

  const res = await fetch(`${env.APP_URL}/auth/google`, {
    method: "POST",
    body: JSON.stringify({ email: parsed.data.email }),
    headers: myHeaders,
    redirect: "follow"
  });

  if (!res.ok) {
    console.error("Google Authentication failed with a status of: " + res.status);
    redirect("/error");
  }

  const data: ApiLoginResponse = await res.json();

  await createSession(data);

  redirect(redirectUri);
}
