'use client'

import { cn } from "@/lib/utils";
import GoogleIcon from "../ui/google-icon";

const GoogleAuthButton = ({ redirectUri = "/" }: { redirectUri?: string }) => {
  return (
    <a
      href={`/api/login/google?redirectUri=${redirectUri}`}
      className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer py-1.5 gap-1", "bg-secondary border border-neutral-700/80 rounded-sm hover:bg-background focus-visible:border-neutral-400 focus-visible:ring-neutral-400/5 h-[36px] transition-colors duration-300 ease-in-out")}
    >
      <GoogleIcon />
      Google
    </a>
  )
}

export default GoogleAuthButton;
