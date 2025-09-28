import { cn } from "@/utils/common-utils";
import { LoaderIcon } from "lucide-react";

type LoaderProps = {
  containerClassName?: string;
  loaderClassName?: string;
}

const SpinnerLoader = ({ containerClassName, loaderClassName }: LoaderProps) => {
  return (
    <div className={cn("grid place-items-center", containerClassName)}>
      <LoaderIcon className={cn("size-9 animate-spin", loaderClassName)} />
    </div>
  )
}

export default SpinnerLoader;
