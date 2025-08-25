'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LanguagesIcon } from "lucide-react";
import { GoogleTranslate } from "./google-trans";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => getCookie("googtrans")?.split("/")[2] ?? "en");

  useEffect(() => {
    if (selectedLanguage) {
      deleteCookie("googtrans")
      setCookie("googtrans", `/en/${selectedLanguage}`, { path: "/", encode: (val: string) => val })
    }
  }, [selectedLanguage])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="pure" size="none">
          <LanguagesIcon className="size-4.5 xs:size-5 md:size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="pt-0 w-[280px] bg-background min-h-[250px] grid" sideOffset={16.5} >
        <Accordion type="multiple" className="w-full" defaultValue={["language"]}>
          <AccordionItem value="language">
            <AccordionTrigger>
              <div className="flex items-baseline gap-2">
                <p>Translation</p>
                <p className="text-muted-foreground text-xs">Beta</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid">
                <GoogleTranslate selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
              </div>
              <p className="text-muted-foreground text-xs">
                If the page is not translating, try refreshing it.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button variant='gradient' className="mt-auto font-bold text-[17px] py-7 rounded-lg">Reset</Button>
      </PopoverContent>
    </Popover>
  )
}

export default LanguageSettings;
