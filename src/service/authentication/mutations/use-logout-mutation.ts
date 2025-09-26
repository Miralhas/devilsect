import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/logout";

export const useLogoutMutation = () => useMutation({
  mutationFn: logout,
});