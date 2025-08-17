'use client'

import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/use-logout";
import { LogOutIcon } from "lucide-react";

const ActionButtons = () => {
  const handleLogout = useLogout();
  return (
    <>
      <Button className="text-lg rounded-2xl text-red-700 bg-primary/30 transition-transform hover:scale-105 duration-300 ease-in-out" size="lg" variant="cool">Edit Profile</Button>
      <Button className="text-base rounded-2xl bg-secondary/30 transition-transform hover:scale-105 duration-300 ease-in-out" size="lg" variant="cool-secondary" onClick={handleLogout}>
        <LogOutIcon className="size-4" />
        Logout
      </Button>
    </>
  )
}

export default ActionButtons;
