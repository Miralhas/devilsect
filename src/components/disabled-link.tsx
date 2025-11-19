import { cn } from "@/utils/common-utils";
import Link, { type LinkProps } from "next/link";
import { PropsWithChildren } from "react";

type Props<R> = LinkProps<R> & { disabled?: boolean; className?: string; prefetch?: boolean };

const DisabledLink = <R extends string>({ children, className, prefetch, disabled = false, ...rest }: PropsWithChildren<Props<R>>) => {
  return (
    <Link prefetch={prefetch} {...rest} className={cn(className, disabled && "pointer-events-none opacity-50")}>
      {children}
    </Link>
  )
}

export default DisabledLink;
