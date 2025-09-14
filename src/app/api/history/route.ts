import { env } from "@/env";
import { deleteSession, getSession } from "@/lib/sessions";
import { ApiResponseError } from "@/types/api";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const session = await getSession();

  if (!session) {
    await deleteSession();
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid session' }, { status: 401 })
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.APP_URL}/library`;

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(await req.json()),
  });

  if (!res.ok) {
    const error: ApiResponseError = await res.json();
    console.error(`Error trying to [PUT] novel chapter to user History: ${error.detail ?? ''}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  revalidateTag("library");
  revalidatePath("/profile/history");
  revalidatePath("/profile/library");
  return NextResponse.json({ status: 200 });
}