import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Novel } from "@/types/novel";

type Params = {
  novel: Novel,
  formData: FormData
};

export const request = async (authState: AuthState, { novel, formData }: Params) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);

  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`, {
    headers: myHeaders,
    body: formData,
    method: "PUT"
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}

export const updateNovelImage = withAuth(request);