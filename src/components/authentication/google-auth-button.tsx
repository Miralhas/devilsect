'use client'

import React from "react";
import { Button } from "../ui/button";
import GoogleIcon from "../ui/google-icon";
import { useRouter } from "next/navigation";

const GoogleAuthButton = () => {
  const router = useRouter();

  return (
    <a href="/api/login/google">googor</a>
    // <Button className="gap-4" variant="cool-secondary" onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push("/api/login/google") }}>
    //   <GoogleIcon />
    //   Google
    // </Button>
  )
}

export default GoogleAuthButton;
