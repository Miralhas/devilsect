import Header from "@/components/navbar/header";
import UserLinks from "@/components/navbar/user-links";
import { UserIcon } from "lucide-react";
import { PropsWithChildren, Suspense } from "react";

const CoreLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header>
        <Suspense fallback={<UserIcon className="size-6 animate-pulse" />}>
          <UserLinks />
        </Suspense>
      </Header>
      <div className="mx-auto w-full max-w-[1440px] grid grid-rows-[min-content_max-content] gap-5 p-4">
        {children}
      </div>
    </>
  )
}

export default CoreLayout;
