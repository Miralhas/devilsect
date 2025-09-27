import { env } from "@/env";
import { INVALID_SESSION_MESSAGE } from "@/lib/constants";
import { getSession } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";

export const deleteNovelLibraryBookmark = async (libraryId: number) => {
  const url = `${env.APP_URL}/library/bookmark/${libraryId}`;
  const session = await getSession();
  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data: ApiError = await res.json();
    throw new ApiError(data);
  }
}