import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadJob } from "../api/upload-job";
import { jobKeys } from "../queries/query-key";

export const useUploadJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadJob,
    onSuccess: ({ id }) => queryClient.invalidateQueries({ queryKey: jobKeys.getJobById(id) }),
    retry: false,
  })
}