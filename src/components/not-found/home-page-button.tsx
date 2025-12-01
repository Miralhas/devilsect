'use client'

import { Button } from "../ui/button";

const HomePageButton = ({ className }: { className?: string }) => {
  return (
    <Button
      variant="cool"
      className={className}
      onClick={() => window.location.assign(window.location.origin)}
    >
      Home Page
    </Button>
  )
}

export default HomePageButton;
