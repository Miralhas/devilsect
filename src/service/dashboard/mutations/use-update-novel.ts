import { useMutation } from "@tanstack/react-query";
import { updateNovel } from "../api/update-novel";

export const useUpdateNovel = () => {
  return useMutation({
    mutationFn: updateNovel,
  })
}