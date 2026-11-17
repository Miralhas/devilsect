import { env } from "@/env";
import { UploadDownloadJobInput } from "@/lib/schemas/upload-job-schema";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { DownloadJob } from "@/types/download-job";

export const uploadJob = async (input: UploadDownloadJobInput): Promise<DownloadJob> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/jobs`;

  const res = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(input)
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }

  return res.json();
}
