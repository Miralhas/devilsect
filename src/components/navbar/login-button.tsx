import { cn } from "@/utils/common-utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const LoginButton = ({ isLoading = false }: { isLoading?: boolean }) => {
  const pathname = usePathname();
  return (
    <Link href={`/login?redirect=${pathname}`}>
      <Button
        variant="cool-secondary"
        className={cn("transition-transform transform hover:-translate-y-0.5", { "animate-pulse": isLoading })}
      >
        Login
      </Button>
    </Link>
  )
}

export default LoginButton;