'use client'

import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";

const ChapterRequestButton = () => {
  return (
    <Button variant="cool" className="h-11 w-full max-w-lg"
      // disabled={!isDirty || mutation.isPending || alreadySentRequestToday} 
      type="submit"
    >
      <SendIcon className="size-4.5" />
      Send Request
      {/* {mutation.isPending ? <span className="animate-pulse">Sending request...</span> : "Send Request"} */}
    </Button>
  )
}

export default ChapterRequestButton;
