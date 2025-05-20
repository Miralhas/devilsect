import { env } from "@/env";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { deleteSession } from "@/lib/sessions";
import { User } from "@/types/authentication";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (!session) {
    await deleteSession();
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 })
  }

  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/users/validate", {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` },
    next: { tags: ["user"] },
  });

  if (!res.ok) {
    await deleteSession();
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

  const user: User = await res.json();

  return NextResponse.json(user, { status: 200 });
}