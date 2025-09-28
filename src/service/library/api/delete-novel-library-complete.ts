import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const deleteNovelLibraryComplete = async (libraryId: number) => {
  const url = `${env.APP_URL}/library/complete/${libraryId}`;
  const session = await getSession();
  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json()
    throw new ApiError(data);
  }
}
