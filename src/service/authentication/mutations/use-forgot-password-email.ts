import { useMutation } from "@tanstack/react-query";
import { forgotPasswordEmail } from "../api/forgot-password-email";

export const useForgotPasswordEmail = () => useMutation({
  mutationFn: forgotPasswordEmail
});