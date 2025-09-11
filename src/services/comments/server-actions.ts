'use server'

import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiResponseError } from "@/types/api";

export const deleteVote = async (commentId: number) => {
  const session = (await getSession())?.value;
  if (!session) return;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.APP_URL}/comments/${commentId}/vote`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    const error = await res.json() as ApiResponseError;
    console.log(error);
    return;
  }
}
