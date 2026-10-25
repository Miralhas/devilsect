import { env } from "@/env";
import { UpdateNovelInput } from "@/lib/schemas/update-novel-schema";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Novel } from "@/types/novel";

type Params = {
  novel: Novel;
  input: UpdateNovelInput;
}

const request = async (authState: AuthState, { novel, input }: Params): Promise<Novel> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}`;

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
    throw new ApiError(data);
  }

  return await res.json();
}

export const updateNovel = withAuth(request);