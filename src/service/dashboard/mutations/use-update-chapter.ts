import { useMutation } from "@tanstack/react-query";
import { updateChapter } from "../api/update-chapter";

export const useUpdateChapter = () => {
  return useMutation({
    mutationFn: updateChapter,
  })
}