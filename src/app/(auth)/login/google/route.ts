import { env } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const redirectUri = new URL(req.url).searchParams.get("redirectUri") ?? "/";

  const cookieStore = await cookies();

  cookieStore.set("redirectUri", redirectUri, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60, // 1min
    sameSite: "lax"
  });

  redirect(`${env.NEXT_PUBLIC_BASE_URL.replace("/api", "")}/oauth2/authorization/google`);
}