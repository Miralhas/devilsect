import { useMutation } from "@tanstack/react-query";
import { signin } from "../api/signin";

export const useLoginMutation = () => useMutation({
  mutationFn: signin
});