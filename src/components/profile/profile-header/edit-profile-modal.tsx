'use client'

import DynamicBlurImage from "@/components/dynamic-blur-image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { env } from "@/env"
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
          <div className="relative group w-fit mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent/20 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="rounded-full size-32 md:size-36 aspect-square overflow-hidden relative">
              <DynamicBlurImage
                src={`${env.NEXT_PUBLIC_BASE_URL}/users/${user.id}/image`}
                onErrorImage="/yin-yang.png"
                unoptimized
                fill
                alt="user profile image"
                className="w-full object-cover h-full rounded-full transition-transform duration-500 group-hover:scale-105 opacity-90"
                quality={10}
              />
            </div>
          </div>
          <EditProfileForm user={user} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal;
