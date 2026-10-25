'use client'

import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { useEditProfilePicture } from "@/service/user/mutations/use-edit-profile-picture";
import { User } from "@/types/authentication";
import { cn, isApiError } from "@/utils/common-utils";
import { Pencil } from "lucide-react";
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from "sonner";
import EditImageModal from "./edit-image-modal";


const EditImage = ({ user }: { user: User }) => {
  const [file, setFile] = useState<File | null>(null);
  const inputref = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const mutation = useEditProfilePicture();

  const imgUrl = `${env.NEXT_PUBLIC_BASE_URL}/users/${user.id}/image#${new Date().getTime().toString()}`;

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
      setOpen(true);
    }
  }

  const onAvatarClick = () => {
    if (inputref.current) {
      inputref.current.click();
    }
  }

  const onSubmit = (file: Blob) => {
    const formData = new FormData();
    formData.append("file", file, `${user.username}-image.webp`);
    mutation.mutate({ formData, userId: user.id }, {
      onSuccess: () => {
        if (imageRef.current) {
          const newDate = new Date().getTime().toString()
          imageRef.current.src = `${imgUrl.split("#")[0]}#${newDate}`;
          imageRef.current.srcset = "";
          (document.querySelector(".user-profile-header-image") as HTMLImageElement).src = `${imgUrl.split("#")[0]}#${newDate}`;
          (document.querySelector(".user-profile-header-image") as HTMLImageElement).srcset = ""
          toast.success("Profile image updated successfully!");
          return;
        }
      },
      onError: (error) => toast.error("Failed to update profile picture", {
        description: isApiError(error) ? error.detail : error.message,
      }),
    })
  }

  const isPending = mutation.isPending

  return (
    <>
      <EditImageModal open={open} setOpen={setOpen} imageFile={file} onMutate={onSubmit} />
      <div className="relative group" onClick={onAvatarClick}>
        <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent/20 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className={cn("rounded-full size-32 md:size-36 aspect-square overflow-hidden relative", isPending && "animate-pulse")}>
          <DynamicBlurImage
            src={imgUrl}
            imageRef={imageRef}
            fill={false}
            width={144}
            height={144}
            alt="User Image"
            priority
            className="opacity-90 object-center object-cover w-full h-auto inline-block"
            default={`https://static.devilsect.com/yin-yang.png`}
            mask="circle"
            mtrim
          />
          <div
            className="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opFacity-100 bg-black/60 cursor-pointer rounded-md grid place-items-center"
          >
            <Pencil className="size-7 text-white" />
          </div>
        </div>
        <div
          className="absolute flex items-center gap-1 p-1 px-2 bottom-0 right-0 z-10 transition-opacity duration-300 group-hover:opacity-100 bg-secondary cursor-pointer border border-white/20 rounded-md"
        >
          <Pencil className="size-4" />
          <p className="tracking-wide text-xs font-semibold">Edit</p>
        </div>
      </div>
      <input
        type="file"
        accept='image/*'
        ref={inputref}
        id='avatar'
        name='avatar'
        onChange={onFileChange}
        className='absolute invisible top-[-200vh]'
      />
    </>
  )
}

export default EditImage;
