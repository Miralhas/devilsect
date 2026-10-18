import { env } from "@/env";
import { UpdateChapterInput } from "@/lib/schemas/update-chapter-schema";
import { getAccessToken } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { Chapter } from "@/types/chapter";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const updateChapter = async (chapter: Chapter, data: UpdateChapterInput) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${chapter.novelSlug}/chapters/${chapter.slug}`;

  const session = await getAccessToken();
  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    return new ApiError(data);
  }
}