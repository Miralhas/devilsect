import { Input } from "./input";

import { cn } from "@/lib/utils"

const AuthenticationInput = ({ className, type, ...props }: React.ComponentProps<"input">) => {
  return (
    <>
      <Input
        type={type}
        className={cn("rounded-xs bg-secondary text-sm placeholder:text-sm placeholder:text-neutral-500 font-semibold border-zinc-700/35 focus-visible:border-neutral-400 focus-visible:ring-neutral-400/5 focus-visible:ring-[3px]", className)}
        {...props}
      />
    </>
  )
}

export default AuthenticationInput;
