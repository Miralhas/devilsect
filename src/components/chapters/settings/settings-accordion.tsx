'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useReaderSettingsContext } from "@/contexts/reader-settings-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"

const SettingsAccordion = () => {
  const {
    autoScroll,
    onAutoScrollActiveChange,
    increaseAutoScrollSpeed,
    decreaseAutoScrollSpeed,
  } = useReaderSettingsContext();

  return (
    <>
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="auto-scroll">
          <AccordionTrigger>
            <div className="flex items-baseline gap-2">
              <p>Auto Scrolling</p>
              <p className="text-muted-foreground text-xs">Beta</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
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
                  disabled={autoScroll.speed <= 0.5}
                >
                  <MinusIcon className="size-3 text-zinc-300" strokeWidth={4} />
                </Button>
                <span className="font-medium w-6 text-center mx-3">{autoScroll.speed}x</span>
                <Button
                  variant="pure"
                  size="none"
                  className="rounded-full p-2 border bg-secondary"
                  onClick={increaseAutoScrollSpeed}
                  disabled={autoScroll.speed >= 10}
                >
                  <PlusIcon className="size-3 text-zinc-300" strokeWidth={4} />
                </Button>
              </div>
            </div>

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default SettingsAccordion;
