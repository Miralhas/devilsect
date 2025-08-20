'use client'

import ImageWithFallback from "@/components/image-with-fallback";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { profilePicture } from "@/services/authentication/actions";
import { User } from "@/types/authentication";
import { ChangeEvent, startTransition, useActionState, useEffect, useRef, useState } from 'react';
import EditImageModal from "./edit-image-modal";
import { toast } from "sonner";

const EditImage = ({ user }: { user: User }) => {
  const [file, setFile] = useState<File | null>(null);
  const inputref = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState(profilePicture, { success: undefined });

  const imgUrl = `${env.NEXT_PUBLIC_BASE_URL}/users/${user.id}/image`;

  useEffect(() => {
    if(state.success===undefined) return;
    if (state.success && imageRef.current) {
      imageRef.current.src = `${imgUrl}#${state.message}`;
      (document.getElementById("navbar-user-image") as HTMLImageElement).src = `${imgUrl}#${state.message}`
      toast.success("Profile image updated successfully!");
      return;
    }

    toast.error(state.message);
  }, [state, imgUrl]);

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

  const onStartTransition = (file: Blob) => {
    startTransition(() => action({ imageBlob: file, userId: user.id }));
  }

  return (
    <>
      <EditImageModal open={open} setOpen={setOpen} imageFile={file} onStartTransition={onStartTransition} />

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent/20 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className={cn("rounded-full size-32 md:size-36 aspect-square overflow-hidden relative", isPending && "animate-pulse")} onClick={onAvatarClick}>
          <ImageWithFallback
            src={imgUrl}
            imageRef={imageRef}
            alt="profile image"
            fill
          />
          <div className="absolute grid place-items-center inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/70 cursor-pointer">
            <p className="tracking-wide text-lg text-[17px] font-semibold">Edit image</p>
          </div>
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
