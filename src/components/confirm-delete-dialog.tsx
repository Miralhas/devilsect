import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
  title?: string;
  description?: string;
}

const ConfirmDeleteDialog = ({ onSubmit, open, setOpen, title = "Are you absolutely sure?", description }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="extra-cool-secondary" className="hover:bg-secondary hover:border-zinc-50/15 text-xs">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} asChild>
            <Button variant="extra-cool" className="hover:bg-accent/80 hover:border-accent text-xs">
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDeleteDialog;
