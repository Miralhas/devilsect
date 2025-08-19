'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { User } from "@/types/authentication"
import EditProfileForm from "./edit-profile-form"

const EditProfileModal = ({ user }: { user: User }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="cool"
          className="text-lg md:h-10 md:px-6 md:has-[>svg]:px-4 rounded-2xl text-red-700 bg-primary/30 transition-transform hover:scale-105 duration-300 ease-in-out"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile details.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 space-y-10">
          <EditProfileForm user={user} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal;
