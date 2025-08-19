import { Library } from "@/types/library";
import { Dispatch, SetStateAction } from "react";
import MarkAsIncompleteButton from "./mark-as-incomplete-button";
import MarkAsCompleteButton from "./mark-as-complete-button";

type CompleteActionButtonProps = { setOpen: Dispatch<SetStateAction<boolean>>; item: Library };

const CompleteActionButton = ({ setOpen, item }: CompleteActionButtonProps) => {
  const handleClose = () => setOpen(false);

  if (item.completed) {
    return <MarkAsIncompleteButton library={item} close={handleClose} />
  }

  return <MarkAsCompleteButton library={item} close={handleClose} />
}

export default CompleteActionButton;
