import { env } from "@/env";
import { getAccessToken } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const deleteNovelLibraryBookmark = async (libraryId: number) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/library/bookmark/${libraryId}`;
  const session = await getAccessToken();
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