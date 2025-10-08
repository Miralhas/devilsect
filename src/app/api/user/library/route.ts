import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiResponseError } from "@/types/api";
import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";
import { buildQueryString } from "@/utils/string-utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = (await getSession())?.value;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 });
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session}`);
    myHeaders.append("Content-Type", "application/json");

    const searchParams = new URLSearchParams(new URL(req.url).searchParams.toString())
    const queryString = buildQueryString(Object.fromEntries(searchParams));

    const url = `${env.APP_URL}/library${queryString}`;

    const res = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });

    if (!res.ok) {
      const detail = await res.json() as ApiResponseError
      return NextResponse.json({ error: `Error trying to [GET] User library` }, { status: detail.status ?? 500 });
    }

    const response = await res.json() as PaginatedQuery<Library[]>;

    return NextResponse.json(response, { status: 200 });

  } catch (err) {
    NextResponse.json({ error: `Internal Server Error ${err}` }, { status: 500 });
  }
}