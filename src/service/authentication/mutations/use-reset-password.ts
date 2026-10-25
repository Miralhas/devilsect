import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/reset-password";

export const useResetPassword = () => useMutation({
  mutationFn: resetPassword
});