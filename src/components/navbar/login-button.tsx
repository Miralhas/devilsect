import Link from "next/link";
import { Button } from "../ui/button";

const LoginButton = () => {
  return (
    <Link href="/login">
      <Button variant="cool-secondary" className="transition-transform transform hover:-translate-y-0.5">
        Login
      </Button>
    </Link>
  )
}

export default LoginButton;