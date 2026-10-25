import { env } from "@/env";
import { UpdateChapterInput } from "@/lib/schemas/update-chapter-schema";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Chapter } from "@/types/chapter";

type Params = {
  chapter: Chapter,
  input: UpdateChapterInput,
}

const request = async (authState: AuthState, { chapter, input }: Params) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${chapter.novelSlug}/chapters/${chapter.slug}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(input)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    return new ApiError(data);
  }
}

export const updateChapter = withAuth(request);