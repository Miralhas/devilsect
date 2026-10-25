import { useMutation } from "@tanstack/react-query";
import { updateUserImage } from "../api/update-user-image";

type Args = { userId: number, formData: FormData };

export const useEditProfilePicture = () => {
  return useMutation({
    mutationFn: ({ formData, userId }: Args) => updateUserImage(userId, formData),
  });
}