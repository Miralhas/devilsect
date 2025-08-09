import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { arrayChunker, cn } from "@/lib/utils";

const ChapterAccordion = () => {
  return (
    <div className="w-full space-y-2">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {arrayChunker(Array.from({ length: 250 }), 100).map((_, index) => (
          <AccordionItem value={"item-1" + index} key={index}>
            <AccordionTrigger>{_.length}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {_.map((x, i) => (
                <div key={i} className={cn("h-8 border")}>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default ChapterAccordion;