import { env } from "@/env";
import { EditProfileInput } from "@/lib/schemas/edit-profile-schema";
import { getSession } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";

export const updateUser = async (data: EditProfileInput) => {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized: Missing or invalid session");

  const url = `${env.APP_URL}/users`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}