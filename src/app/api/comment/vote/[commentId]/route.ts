import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiResponseError } from "@/types/api";
import { Vote } from "@/types/threaded-comment";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ commentId: string }> }) => {
  try {
    const commentId = (await params).commentId;
    const session = (await getSession())?.value;
    const vote = await req.json() as Vote;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 });
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session}`);
    myHeaders.append("Content-Type", "application/json");

    const url = `${env.APP_URL}/comments/${commentId}/vote`;

    const res = await fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ voteType: vote.type })
    });

    if (!res.ok) {
      const error = await res.json() as ApiResponseError;
      return NextResponse.json({ error: 'Internal Server Error' }, { status: error.status ?? 500 });
    }

    return NextResponse.json({ status: 204 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: `Internal Server Error ${err}` }, { status: 500 });
  }
}