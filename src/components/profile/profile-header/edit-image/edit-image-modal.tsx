'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { setCanvasPreview } from '@/lib/set-canvas-preview'
import { useDebounceEffect } from '@/hooks/use-debounce-effect'
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop
} from 'react-image-crop'
import { Button } from "@/components/ui/button";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  imageFile: File | null;
  onStartTransition: (file: Blob) => void;
}

const SCALE = 1;
const ASPECT_RATIO = 1;
const ROTATE = 0;
const MIN_HEIGHT = 200;

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: (MIN_HEIGHT / mediaWidth) * 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const EditImageModal = ({ open, setOpen, imageFile, onStartTransition }: Props) => {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  useEffect(() => {
    if (!imageFile) return;
    setCrop(undefined);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() ?? "";
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(imageFile);

  }, [imageFile]);

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const centeredCrop = centerAspectCrop(width, height, SCALE);
    setCrop(centeredCrop);
  }

  async function onDownloadCropClick() {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )

    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/jpeg',
      quality: 0.7
    })


    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }

    blobUrlRef.current = URL.createObjectURL(blob)

    console.log(blobUrlRef.current)

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current
      hiddenAnchorRef.current.click()
    }

    setOpen(false);
    onStartTransition(blob);
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        setCanvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          SCALE,
          ROTATE,
        )
      }
    },
    [completedCrop, SCALE, ROTATE],
    100,
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Image Crop</DialogTitle>
          <DialogDescription>
            Image may take a while to update.
          </DialogDescription>
          <div className='grid grid-cols-2 grid-rows-[auto_auto] gap-4 gap-y-12'>
            {!!imgSrc ? (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={ASPECT_RATIO}
                minHeight={100}
                keepSelection
                className="row-start-1 col-span-1"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${SCALE}) rotate(${ROTATE}deg)` }}
                  onLoad={onImageLoad}
                />

              </ReactCrop>
            ) : null}
            {!!completedCrop ? (
              <>
                <div className="space-y-2 row-start-1 col-span-1">
                  <p className="text-center">Preview</p>
                  <canvas
                    ref={previewCanvasRef}
                    className='border border-black object-contain rounded-full mx-auto'
                    style={{ width: completedCrop.width, height: completedCrop.height }}
                  />
                </div>
              </>
            ) : null}
          {!!completedCrop && (
            <div className='grid grid-cols-2 row-start-2 col-span-2 gap-4'>
              <Button variant='cool' className="col-span-1 h-11"  onClick={onDownloadCropClick}>Set avatar</Button>
              <Button variant='cool-secondary' className="col-span-1 h-11"  onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          )}
          </div>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditImageModal;
