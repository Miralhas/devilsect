import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/update-user";

export const useEditProfile = () => {
  return useMutation({
    mutationFn: updateUser,
  })
}