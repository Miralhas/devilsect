import { useMutation } from "@tanstack/react-query";
import { updateNovelImage } from "../api/update-novel-image";

export const useUpdateNovelCover = () => {
  return useMutation({
    mutationFn: updateNovelImage,
  })
}