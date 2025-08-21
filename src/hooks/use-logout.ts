'use client'

import { useLogoutMutation } from "@/services/authentication/client-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useLogoutMutation();

  const handleLogout = async () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.refresh();
      }
    });
  }

  return handleLogout;
}

export default useLogout;
