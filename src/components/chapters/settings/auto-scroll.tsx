'use client'

import { Button } from "@/components/ui/button"
import { useReaderSettingsContext } from "@/contexts/reader-settings-context"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MinusIcon, PlusIcon } from "lucide-react"

const AUTO_SCROLL_MIN_SPEED = 0.5;
const AUTO_SCROLL_MAX_SPEED = 10;

const AutoScroll = () => {
  const {
    autoScroll,
    onAutoScrollActiveChange,
    increaseAutoScrollSpeed,
    decreaseAutoScrollSpeed,
  } = useReaderSettingsContext();

  return (
    <Accordion type="single" className="w-full" collapsible>
      <AccordionItem value="auto-scroll">
        <AccordionTrigger>
          <div className="flex items-baseline gap-2">
            <p>Auto Scroll</p>
            <p className="text-muted-foreground text-xs">Beta</p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground text-xs mb-1">A lower scroll speed is recommended for mobile users.</p>
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-[min-content_min-content] gap-2">
              <Switch id="auto-scroll" checked={autoScroll.active} onCheckedChange={onAutoScrollActiveChange} />
              <Label htmlFor="auto-scroll">{autoScroll.active ? "On" : "Off"}</Label>
            </div>
            <div className="flex items-center">
              <Button
                variant="pure"
                size="none"
                className="rounded-full p-2 border bg-secondary"
                onClick={decreaseAutoScrollSpeed}
                disabled={autoScroll.speed <= AUTO_SCROLL_MIN_SPEED}
              >
                <MinusIcon className="size-3 text-zinc-300" strokeWidth={4} />
              </Button>
              <span className="font-medium w-6 text-center mx-3">{autoScroll.speed}x</span>
              <Button
                variant="pure"
                size="none"
                className="rounded-full p-2 border bg-secondary"
                onClick={increaseAutoScrollSpeed}
                disabled={autoScroll.speed >= AUTO_SCROLL_MAX_SPEED}
              >
                <PlusIcon className="size-3 text-zinc-300" strokeWidth={4} />
              </Button>
            </div>
          </div>

        </AccordionContent>
      </AccordionItem>

    </Accordion>
  )
}

export default AutoScroll;
