'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';
import useSpeech from '@/hooks/use-speech';
import { CirclePause, CirclePlay, SquareIcon } from 'lucide-react';
import { useEffect } from 'react';

const TextToSpeech = () => {
  const {
    cancel,
    speak,
    pause,
    resume,
    setText,
    voices,
    setVoiceIndex,
    speaking,
    pitch,
    rate,
    setPitch,
    setRate,
  } = useSpeech();

  useEffect(() => {
    const listener = () => {
      const textContent = element.textContent;
      if (textContent) setText(textContent);
    }

    const element = document.getElementById("chapter-content") as HTMLDivElement;
    listener();

    element.addEventListener("change", listener)

    return () => element.removeEventListener("change", listener);
  }, [setText]);

  return (
    <div className='space-y-2'>
      <div className=' grid grid-cols-[min-content_min-content_1fr] gap-1'>
        {speaking ? (
          <div className='flex items-center border bg-secondary px-2 rounded-sm text-muted-foreground cursor-pointer hover:opacity-70 transition-opacity duration-200' onClick={pause}>
            <CirclePause className='size-5' />
          </div>
        ) : (
          <div className='flex items-center border bg-secondary px-2 rounded-sm text-muted-foreground cursor-pointer hover:opacity-70 transition-opacity duration-200'>
            <CirclePlay className='size-5' onClick={() => { speak(); resume() }} />
          </div>
        )}
        <div className='flex items-center border bg-secondary px-2 rounded-sm text-muted-foreground cursor-pointer hover:opacity-70 transition-opacity duration-200'>
          <SquareIcon className='size-5' onClick={cancel} />
        </div>
        <Select onValueChange={(val) => setVoiceIndex(Number(val))}>
          <SelectTrigger className="text-zinc-300 w-full grid grid-cols-[1fr_min-content] items-center justify-between">
            <SelectValue placeholder="Voices" />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice, index) => (
              <SelectItem key={voice.voiceURI} value={String(index)}>
                {voice.name.replace("Microsoft", '')} {voice.default && '[Default]'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground col-span-full">Some voices may not work.</p>
      </div>
      <div className='grid gap-y-3'>
        <div className='w-full space-y-2'>
          <p className='text-xs text-muted-foreground'>Speed: <span className='text-zinc-200'>{rate}</span></p>
          <Slider
            defaultValue={[rate]}
            value={[rate]}
            max={2}
            min={0.5}
            step={.1}
            className="w-full"
            onValueChange={(value) => setRate(value[0])}
          />
        </div>
        <div className='w-full space-y-2'>
          <p className='text-xs text-muted-foreground'>Pitch: <span className='text-zinc-200'>{pitch}</span></p>
          <Slider
            defaultValue={[pitch]}
            value={[pitch]}
            max={2}
            min={0.5}
            step={.5}
            className="w-full"
            onValueChange={(value) => setPitch(value[0])}
          />
        </div>
      </div>
    </div>
  )
}

export default TextToSpeech;
