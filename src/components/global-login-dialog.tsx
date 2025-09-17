'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useGlobalLoginContext } from "@/contexts/global-login-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./authentication/login/form";

const GlobalLoginDialog = () => {
  const { handleOpen, open, close, currentUser: user } = useGlobalLoginContext();
  const pathname = usePathname();

  useEffect(() => {
    if (user && open) {
      close();
    }
  }, [user, close, open]);

  return (
    <Dialog onOpenChange={handleOpen} open={open}>
      <DialogContent className="md:!max-w-[400px]">
        <DialogHeader className="sr-only">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-1 w-full rounded-lg overflow-hidden p-1 transition-all duration-300 space-y-2 relative backdrop-blur-sm z-50">
          <div className="flex flex-col gap-1.5 md:p-4">
            <h1 className="text-2xl font-bold tracking-tight text-accent-foreground self-center">Sign in</h1>
          </div>
          <div className="relative md:p-4 pt-0 transition-all duration-300 space-y-4">
            <LoginForm redirectUri={pathname} />
            <div className="flex justify-center text-sm gap-1 font-medium leading-relaxed ">
              Don&apos;t have an account? <Link href="/signup" className="transition-colors duration-200 hover:text-red-800 underline">Sign up</Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GlobalLoginDialog;
