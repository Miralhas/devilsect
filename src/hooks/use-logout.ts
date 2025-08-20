import { logoutAction } from "@/services/authentication/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    queryClient.invalidateQueries({ queryKey: ['user'] });
    router.push("/");
  }
  
  return handleLogout
}

export default useLogout;
