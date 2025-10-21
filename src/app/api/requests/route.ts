import { env } from "@/env";
import { NovelRequestInput } from "@/lib/schemas/novel-request";
import { getSession } from "@/lib/sessions";
import { ApiResponseError } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = (await getSession())?.value;
    const novelTitle = (await req.json() as NovelRequestInput).novelTitle;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 });
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session}`);
    myHeaders.append("Content-Type", "application/json");

    const url = `${env.APP_URL}/requests/novels`;

    const res = await fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ novelTitle })
    });

    if (!res.ok) {
      const detail = await res.json() as ApiResponseError;
      console.error(detail);
      return NextResponse.json({ error: `Error trying to [POST] novel request` }, { status: detail.status ?? 500 });
    }

    return NextResponse.json({ status: 204 });

  } catch (err) {
    NextResponse.json({ error: `Internal Server Error ${err}` }, { status: 500 });
  }
}