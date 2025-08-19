'use client'

import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/use-logout";
import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = useLogout();
  return (
    <Button className="text-base md:h-10 md:px-6 md:has-[>svg]:px-4 rounded-2xl bg-secondary/30 transition-transform hover:scale-105 duration-300 ease-in-out" variant="cool-secondary" onClick={handleLogout}>
      <LogOutIcon className="size-4" />
      Logout
    </Button>
  )
}

export default LogoutButton;
