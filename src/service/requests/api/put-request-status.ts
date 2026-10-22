import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Action } from "@/types/request";

type Args = { action: Action, id: number };

const request = async (authState: AuthState, args: Args) => {
  const { action, id } = args;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/requests/${id}/${action}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const putRequestStatus = withAuth(request);