import BlurCenter from "@/components/ui/blur-center";
import { getCurrentUser } from "@/service/user/api/get-current-user";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();
  if (user) redirect("/");
  return (
    <>
      <div className="min-h-screen flex justify-center items-center p-4 w-full relative">
        <BlurCenter opacity="low" />
        {children}
      </div>
    </>
  )
}

export default AuthLayout;
