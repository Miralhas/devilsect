'use client'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Check, MinusIcon, PlusIcon, TypeIcon } from "lucide-react"

const FontSettings = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="pure" size="none">
            <TypeIcon className="size-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] bg-background" sideOffset={16.5}>
          <div className="grid gap-6">
            <div className="w-full space-y-2">
              <p className="text-base text-[15px] leading-7 tracking-wide">Font</p>
              <div className="grid gap-2 gap-y-2.5 grid-cols-2 grid-rows-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Button key={index} variant="cool-secondary" className="transition-colors duration-200 ease-in-out rounded-sm border bg-secondary hover:bg-primary/40 hover:border-accent">Atkinson</Button>
                ))}
              </div>
            </div>

            <div className="w-full space-y-2 flex justify-between items-baseline">
              <p className="text-base text-[15px] leading-7 tracking-wide">Text Size</p>
              <div className="flex items-center gap-4">
                <Button variant="pure" size="none" className="rounded-full p-2 border bg-secondary">
                  <MinusIcon className="size-4 text-zinc-300" strokeWidth={4} />
                </Button>
                <span className="text-lg font-medium">16</span>
                <Button variant="pure" size="none" className="rounded-full p-2 border bg-secondary">
                  <PlusIcon className="size-4 text-zinc-300" strokeWidth={4} />
                </Button>
              </div>
            </div>

            <div className="w-full space-y-2 flex justify-between items-baseline">
              <p className="text-base text-[15px] leading-7 tracking-wide">Line Height</p>
              <div className="flex items-center gap-4">
                <Button variant="pure" size="none" className="rounded-full p-2 border bg-secondary">
                  <MinusIcon className="size-4 text-zinc-300" strokeWidth={4} />
                </Button>
                <span className="text-lg font-medium">16</span>
                <Button variant="pure" size="none" className="rounded-full p-2 border bg-secondary">
                  <PlusIcon className="size-4 text-zinc-300" strokeWidth={4} />
                </Button>
              </div>
            </div>

            <div className="w-full space-y-2">
              <p className="text-base text-[15px] leading-7 tracking-wide">Text Color</p>
              <div className="flex justify-between">
                <Button variant="pure" size="none" className="bg-white  rounded-full p-3.5 border-accent relative">
                  <div className="absolute bg-black/20 border border-primary rounded-full inset-0 z-10"></div>
                  <Check className="size-4 absolute text-accent" strokeWidth={4} />
                </Button>
                <Button variant="pure" size="none" className="bg-white rounded-full p-3.5"></Button>
                <Button variant="pure" size="none" className="bg-white rounded-full p-3.5"></Button>
                <Button variant="pure" size="none" className="bg-white rounded-full p-3.5"></Button>
                <Button variant="pure" size="none" className="bg-white rounded-full p-3.5"></Button>
                <Button variant="pure" size="none" className="bg-white rounded-full p-3.5"></Button>
              </div>
            </div>

            <div className="w-full grid">
              <Button className="font-bold tracking-wide text-lg py-7 rounded-2xl" variant="cool">RESET</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default FontSettings;
