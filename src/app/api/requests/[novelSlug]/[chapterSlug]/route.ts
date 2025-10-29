import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiResponseError } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ novelSlug: string; chapterSlug: string }> }) => {
  try {
    const { chapterSlug, novelSlug } = await params;
    const { errors } = await req.json() as { errors: string[] };
    const session = (await getSession())?.value;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 });
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session}`);
    myHeaders.append("Content-Type", "application/json");

    const url = `${env.APP_URL}/requests/novels/${novelSlug}/${chapterSlug}`;

    const res = await fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ errors })
    });

    if (!res.ok) {
      const detail = await res.json() as ApiResponseError
      console.log(detail);
      return NextResponse.json({ error: `Error trying to [POST] Chapter request for novel: ${novelSlug}` }, { status: detail.status ?? 500 });
    }

    return NextResponse.json({ status: 204 });

  } catch (err) {
    NextResponse.json({ error: `Internal Server Error ${err}` }, { status: 500 });
  }
}