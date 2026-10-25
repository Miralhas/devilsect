import { useMutation } from "@tanstack/react-query";
import { removeUserFromRecipients } from "../api/remove-user-from-reicipents";

export const useRemoveNotification = () => {
  return useMutation({
    mutationFn: removeUserFromRecipients,
  })
}