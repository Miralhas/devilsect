import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Novel } from "@/types/novel";

const MAX_CHAPTERS_PER_BUTTON = 100;

const ChaptersTab = ({ novel }: { novel: Novel }) => {
  const totalButtons = Math.ceil(novel.chaptersCount / MAX_CHAPTERS_PER_BUTTON);
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-[1024px] mx-auto flex gap-3 flex-col"
    >
      {Array.from({ length: totalButtons }).map((_, index) => {
        const isLast = index + 1 === totalButtons;
        return (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="p-4 rounded-md bg-secondary w-full text-base items-center cursor-pointer hover:no-underline">
              <div className="flex gap-3 items-center font-bold">
                <p className="size-[32px] flex items-center justify-center text-white bg-zinc-700/50 rounded-sm">{index + 1}</p>
                <p className="text-lg">
                  {MAX_CHAPTERS_PER_BUTTON * index + 1} - {isLast ? (novel.chaptersCount) : (MAX_CHAPTERS_PER_BUTTON + MAX_CHAPTERS_PER_BUTTON * index)}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p></p>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default ChaptersTab;
