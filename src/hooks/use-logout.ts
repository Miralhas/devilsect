'use client'

import { useLogoutMutation } from "@/service/authentication/mutations/use-logout-mutation";

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
