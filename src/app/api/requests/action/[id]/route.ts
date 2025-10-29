import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { Action } from "@/types/request";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: number }> }) => {
  const session = await getSession();
  const actionType = (await req.json() as { action: Action }).action;

  if (!session) {
    return NextResponse.json({ error: INVALID_SESSION_MESSAGE }, { status: 401 });
  }

  const { id } = await params;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session.value}`);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/requests/${id}/${actionType}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

  return NextResponse.json({ status: 204 });

}