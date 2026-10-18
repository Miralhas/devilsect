import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/signup";

export const useSignUpMutation = () => useMutation({
  mutationFn: signup
});