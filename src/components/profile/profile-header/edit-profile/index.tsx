'use client'

import { Button } from "@/components/ui/button"
import { User } from "@/types/authentication"
import { useState } from "react"
import EditProfileModal from "./edit-profile-modal"

const EditProfile = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="cool"
        className="text-lg md:h-10 md:px-6 md:has-[>svg]:px-4 rounded-2xl text-red-700 bg-primary/30 transition-transform hover:scale-105 duration-300 ease-in-out"
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </Button>

        <EditProfileModal open={open} setOpen={setOpen} user={user} />
    </>
  )
}

export default EditProfile;
