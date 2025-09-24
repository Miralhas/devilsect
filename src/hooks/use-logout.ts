'use client'

import { useLogoutMutation } from "@/services/authentication/client-mutation";

const useLogout = () => {
  const mutation = useLogoutMutation();

  const handleLogout = async () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        window.location.reload();
      }
    });
  }

  return handleLogout;
}

export default useLogout;
