import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const LoginButton = ({ isLoading = false }: { isLoading?: boolean }) => {
  return (
    <Link href="/login">
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