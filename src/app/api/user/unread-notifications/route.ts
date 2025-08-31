import { env } from "@/env";
import { deleteSession, getSession } from "@/lib/sessions";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getSession();

  if (!session) {
    await deleteSession();
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 })
  }

  const res = await fetch(env.APP_URL + "/users/notifications/unread-count", {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

  const count: { count: number } = await res.json();

  return NextResponse.json(count, { status: 200 });
}