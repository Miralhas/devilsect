import { env } from "@/env";
import { deleteSession, getSession } from "@/lib/sessions";
import { User } from "@/types/authentication";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getSession();

  if (!session) {
    await deleteSession();
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 })
  }

  const res = await fetch(env.APP_URL + "/users/validate", {
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