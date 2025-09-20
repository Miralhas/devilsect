import { isAdminCheck } from "@/lib/utils";
import { getCurrentUser } from "@/services/authentication/server-queries";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();
  if (!user || !isAdminCheck(user)) redirect("/");

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="min-h-[300vh] w-full relative max-w-[1120px] mx-auto p-6">
        <SidebarTrigger className="md:hidden" />
        <SidebarInset className="h-full">
          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout;
