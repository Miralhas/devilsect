'use client'

import { Button } from "../ui/button";

const NewQuote = ({ onClick, className }: { onClick: () => void; className?: string }) => {
  return (
    <Button variant="cool-secondary" className={className} onClick={onClick}>
      New Quote
    </Button>
  )
}

export default NewQuote;
