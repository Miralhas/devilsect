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
import useSpeech from "@/hooks/use-speech";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { LanguagesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GoogleTranslate } from "./google-trans";
import TextToSpeech from "./text-to-speech";

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => getCookie("googtrans")?.split("/")[2] ?? "en");
  const { cancel } = useSpeech();

  useEffect(() => {
    if (selectedLanguage) {
      deleteCookie("googtrans")
      setCookie("googtrans", `/en/${selectedLanguage}`, { path: "/", encode: (val: string) => val })
    }
  }, [selectedLanguage]);

  const onReset = () => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = 'en'; // e.g., 'pt' or 'es'
      select.dispatchEvent(new Event("change"));
      setSelectedLanguage("en")
    }
    cancel();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="pure" size="none">
          <LanguagesIcon className="size-4.5 xs:size-5 md:size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="pt-0 w-[280px] bg-background min-h-[250px] grid" sideOffset={16.5} >
        <Accordion type="multiple" className="w-full" defaultValue={["language", "text-to-speech"]}>
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

          <AccordionItem value="text-to-speech">
            <AccordionTrigger>
              <div className="flex items-baseline gap-2">
                <p>Text to Speech</p>
                <p className="text-muted-foreground text-xs">Beta</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <TextToSpeech />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button variant='gradient' className="mt-auto font-bold text-[17px] py-7 rounded-lg" onClick={onReset}>Reset</Button>
      </PopoverContent>
    </Popover>
  )
}

export default LanguageSettings;
