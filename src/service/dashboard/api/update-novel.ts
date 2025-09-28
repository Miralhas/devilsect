import { env } from "@/env";
import { UpdateNovelInput } from "@/lib/schemas/update-novel-schema";
import { getSession } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { Novel } from "@/types/novel";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const updateNovel = async (novel: Novel, data: UpdateNovelInput) => {
  const url = `${env.APP_URL}/novels/${novel.slug}`;

  const session = await getSession();
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
    throw new ApiError(data);
  }

}