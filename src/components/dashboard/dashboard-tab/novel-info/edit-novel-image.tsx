'use client'

import DynamicBlurImage from "@/components/dynamic-blur-image";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { updateNovelImageAction } from "@/service/dashboard/actions/update-novel-image-action";
import { Novel } from "@/types/novel";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, startTransition, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const EditNovelImage = ({ novel }: { novel: Novel }) => {
  const action = updateNovelImageAction.bind(null, novel);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState('');

  const [state, imageAction, isPending] = useActionState(action, { success: undefined });

  useEffect(() => {
    if (state.success === undefined) return;
    if (state.success) {
      toast.success("Image updated successfully!");
    } else {
      toast.success("Failed to update image. Try again later!", { description: state.message });
    }
  }, [state]);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() ?? "";
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);

  }, [file]);

  const onImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    }
  }

  const onClear = () => {
    setFile(null);
    setImgSrc("");
  }

  const onSend = async () => {
    if (imageRef.current) {
      const image = imageRef.current;

      const offscreen = new OffscreenCanvas(
        image.naturalWidth,
        image.naturalHeight
      )

      const ctx = offscreen.getContext('2d')
      if (!ctx) {
        throw new Error('No 2d context')
      }

      ctx.drawImage(image, 0, 0);

      const blob = await offscreen.convertToBlob({
        type: 'image/jpeg',
        quality: 0.75
      });

      startTransition(() => imageAction({ imageBlob: blob }));
    }
  }

  return (
    <div className="space-y-4">
      {!!imgSrc && <Button variant="cool-secondary" size="sm" onClick={onClear}>Remove current file</Button>}
      <div className="flex items-center gap-4">
        <div className="group w-max relative cursor-pointer" onClick={onImageClick}>
          <p>Current Image:</p>
          <div className="overflow-hidden">
            <DynamicBlurImage
              priority
              width={243}
              height={350}
              fill={false}
              alt={novel.title + " cover"}
              src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
              className="object-contain md:object-cover z-[1] rounded-r-lg  shadow-2xl text-transparent duration-200 transition-all ease-in-out group-hover:scale-105 group-hover:opacity-60"
              default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
            />
            <Button
              variant="pure"
              size="none"
              className="absolute z-10 -bottom-1 -right-3 bg-secondary border border-zinc-50/15 p-2.5 rounded-full text-xs"
            >
              <CameraIcon className="size-3.5 transition-all group-hover:scale-105 duration-200 ease-in-out" />
            </Button>
          </div>
        </div>
        {!!imgSrc && (
          <div>
            <p>Preview:</p>
            <img
              ref={imageRef}
              alt="Preview image"
              src={imgSrc}
              className="w-[243px] h-[350px] object-contain md:object-cover rounded-r-lg shadow-2xl text-transparent duration-200 transition-all ease-in-out"
            />
          </div>
        )}
        <input
          type="file"
          accept='image/*'
          ref={inputRef}
          id='avatar'
          name='avatar'
          onChange={onFileChange}
          className='absolute invisible top-[-200vh]'
        />
      </div>
      {!!imgSrc && (
        <Button variant="cool" className="w-full max-w-[150px]" onClick={onSend} disabled={isPending}>Change image</Button>
      )}
    </div>
  )
}

export default EditNovelImage;
