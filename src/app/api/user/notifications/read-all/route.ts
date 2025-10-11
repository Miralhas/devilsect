import { env } from "@/env";
import { getSession } from "@/lib/sessions"
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";
import { NextResponse } from "next/server";

export const PUT = async () => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: INVALID_SESSION_MESSAGE }, { status: 401 });
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session.value}`);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/notifications/recipients/read`

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

  return NextResponse.json({ status: 204 });

}