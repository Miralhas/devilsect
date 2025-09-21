import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Novel } from "@/types/novel";
import { CameraIcon, InfoIcon } from "lucide-react";
import EditNovelImage from "./edit-novel-image";
import UpdateNovelForm from "./update-novel-form";

const NovelInfo = ({ novel }: { novel: Novel }) => {
  return (
    <div className="pt-4 space-y-4">
      <Accordion type="single" collapsible defaultValue="info">
        <AccordionItem value="image">
          <AccordionTrigger>
            <div className="flex items-center gap-1 text-zinc-300/80">
              Image
              <CameraIcon className="size-4 mt-0.5" />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <EditNovelImage novel={novel} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="info">
          <AccordionTrigger>
            <div className="flex items-center gap-1 text-zinc-300/80">
              Novel Info
              <InfoIcon className="size-4 mt-0.5" />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <UpdateNovelForm novel={novel} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default NovelInfo;
