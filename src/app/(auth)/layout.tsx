import BlurCenter from "@/components/ui/blur-center";
import { PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex justify-center items-center p-4 w-full relative">
      <BlurCenter opacity="low" />
      {children}
    </div>
  )
}

export default AuthLayout;
