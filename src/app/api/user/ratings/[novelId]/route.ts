import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiResponseError } from "@/types/api";
import { Rating } from "@/types/rating";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ novelId: number }> }) => {
  try {
    const novelId = (await params).novelId;
    const session = (await getSession())?.value;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 });
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session}`);
    myHeaders.append("Content-Type", "application/json");

    const url = `${env.APP_URL}/users/ratings/${novelId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });

    if (!res.ok) {
      const detail = await res.json() as ApiResponseError
      return NextResponse.json({ error: `Error trying to [GET] User rating on novel with id ${novelId}` }, { status: detail.status ?? 500 });
    }

    const response = await res.json() as Rating;

    return NextResponse.json(response, { status: 200 });

  } catch (err) {
    NextResponse.json({ error: `Internal Server Error ${err}` }, { status: 500 });
  }
}