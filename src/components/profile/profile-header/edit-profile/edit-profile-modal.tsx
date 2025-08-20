import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import EditProfileForm from "./edit-profile-form";
import { User } from "@/types/authentication";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  user: User;
}

const EditProfileModal = ({ open, setOpen, user }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile details.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 space-y-10">
          <EditProfileForm user={user} handleClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal;
