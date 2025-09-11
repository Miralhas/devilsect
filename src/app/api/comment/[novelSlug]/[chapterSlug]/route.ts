import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiResponseError } from "@/types/api";
import { CommentInput } from "@/types/threaded-comment";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ novelSlug: string; chapterSlug: string }> }) => {
  try {
    const { novelSlug, chapterSlug } = await params;
    const session = (await getSession())?.value;
    const commentInput = await req.json() as CommentInput;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 });
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session}`);
    myHeaders.append("Content-Type", "application/json");

    const url = `${env.APP_URL}/novels/${novelSlug}/chapters/${chapterSlug}/reviews`;

    const res = await fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(commentInput)
    });

    if (!res.ok) {
      const error = await res.json() as ApiResponseError;
      console.log(error);
      return NextResponse.json({ error: `Internal Server Error` }, { status: 500 });
    }

    return NextResponse.json({ status: 204 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: `Internal Server Error ${err}` }, { status: 500 });
  }
}