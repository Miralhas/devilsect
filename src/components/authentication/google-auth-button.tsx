'use client'

import React from "react";
import { Button } from "../ui/button";
import GoogleIcon from "../ui/google-icon";

const GoogleAuthButton = () => {

  return (
    <Button className="gap-4" variant="cool-secondary" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
      <GoogleIcon />
      Google
    </Button>
  )
}

export default GoogleAuthButton;
