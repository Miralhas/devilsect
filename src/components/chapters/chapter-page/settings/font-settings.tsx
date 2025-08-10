'use client'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { AVAILABLE_COLORS, AVAILABLE_FONTS, useReaderSettingsContext } from "@/contexts/reader-settings-context"

import { Check, MinusIcon, PlusIcon, TypeIcon } from "lucide-react"

const MINIMUM_FONT_LIMIT = 8;
const MAXIMUM_FONT_LIMIT = 40;

const FontSettings = () => {
  const {
    reset,
    decreaseFontSize,
    increaseFontSize,
    changeFontFamily,
    decreaseLineHeight,
    increaseLineHeight,
    changeTextColor,
    changeOpacity,
    fontSize,
    lineHeight,
    fontFamily,
    textColor,
    opacity,
  } = useReaderSettingsContext();
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="pure" size="none">
            <TypeIcon className="size-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] bg-background" sideOffset={16.5}>
          <div className="grid gap-5">
            <div className="w-full space-y-2">
              <p className="text-base text-[15px] leading-7 tracking-wide">Font</p>
              <div className="grid gap-2 gap-y-2.5 grid-cols-2 grid-rows-2">
                {AVAILABLE_FONTS.map((font, index) => (
                  <Button
                    key={index}
                    variant={fontFamily === font ? "cool" : "cool-secondary"}
                    className="transition-colors duration-200 ease-in-out rounded-sm hover:bg-primary/60 hover:border-accent capitalize"
                    onClick={() => changeFontFamily(font)}
                  >
                    {font.replace("font-", "")}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full space-y-2 flex justify-between items-baseline">
              <p className="text-base text-[15px] leading-7 tracking-wide">Text Size</p>
              <div className="flex items-center">
                <Button
                  variant="pure"
                  size="none"
                  className="rounded-full p-2 border bg-secondary"
                  onClick={decreaseFontSize}
                  disabled={fontSize <= MINIMUM_FONT_LIMIT}
                >
                  <MinusIcon className="size-4 text-zinc-300" strokeWidth={4} />
                </Button>

                <span className="text-[17px] font-medium w-6 text-center mx-3">{fontSize}</span>

                <Button
                  variant="pure"
                  size="none"
                  className="rounded-full p-2 border bg-secondary"
                  onClick={increaseFontSize}
                  disabled={fontSize >= MAXIMUM_FONT_LIMIT}
                >
                  <PlusIcon className="size-4 text-zinc-300" strokeWidth={4} />
                </Button>
              </div>
            </div>

            <div className="w-full space-y-2 flex justify-between items-baseline">
              <p className="text-base text-[15px] leading-7 tracking-wide">Line Height</p>
              <div className="flex items-center">
                <Button
                  variant="pure"
                  size="none"
                  className="rounded-full p-2 border bg-secondary"
                  onClick={decreaseLineHeight}
                  disabled={lineHeight >= MAXIMUM_FONT_LIMIT}
                >
                  <MinusIcon className="size-4 text-zinc-300" strokeWidth={4} />
                </Button>
                <span className="text-[17px] font-medium w-6 text-center mx-3">{lineHeight}</span>
                <Button
                  variant="pure"
                  size="none"
                  className="rounded-full p-2 border bg-secondary"
                  onClick={increaseLineHeight}
                  disabled={lineHeight <= MINIMUM_FONT_LIMIT}
                >
                  <PlusIcon className="size-4 text-zinc-300" strokeWidth={4} />
                </Button>
              </div>
            </div>

            <div className="w-full space-y-2">
              <p className="text-base text-[15px] leading-7 tracking-wide">Text Color</p>
              <div className="flex justify-between">
                {AVAILABLE_COLORS.map(c => (
                  <Button
                    variant="pure"
                    size="none"
                    className="rounded-full p-3.5 border-accent relative"
                    style={{ background: c.color }} key={c.name}
                    onClick={() => changeTextColor(c)}
                  >
                    {textColor.name === c.name ? (
                      <>
                        <div className="absolute bg-black/20 border border-primary rounded-full inset-0 z-10"></div>
                        <Check className="size-4 absolute text-accent z-50" strokeWidth={4} />
                      </>
                    ) : null}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full ">
              <p className="text-base text-[15px] leading-7 tracking-wide">Brightness</p>
              <div className="w-full flex justify-between items-baseline gap-3">
                <Slider
                  defaultValue={[opacity]}
                  value={[opacity]}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                  onValueChange={(value) => changeOpacity(value[0])}
                />
                <p className="text-base text-[15px] leading-7 tracking-tight font-medium">{opacity}</p>
              </div>
            </div>

            <div className="w-full grid">
              <Button className="font-bold text-[17px] py-7 rounded-2xl" variant="cool" onClick={reset}>RESET</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default FontSettings;
