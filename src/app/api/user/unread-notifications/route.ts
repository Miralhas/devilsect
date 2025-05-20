import { env } from "@/env";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { deleteSession } from "@/lib/sessions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const GET = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (!session) {
    await deleteSession();
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/users/notifications/unread-count", {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

  const count: { count: number } = await res.json();

  return NextResponse.json(count, { status: 200 });
}