import { google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const redirectUri = new URL(req.url).searchParams.get("redirect_uri") ?? "/";
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, ["email"]);

  const cookieStore = await cookies();

  cookieStore.set("redirectUri", redirectUri, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax"
  })

  cookieStore.set("google_oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax"
  });

  cookieStore.set("google_code_verifier", codeVerifier, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax"
  });


  redirect(url.toString());
}
