import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SpinnerLoader from "@/components/ui/spinner-loader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetNovelChapterSummaries } from "@/service/chapters/queries/use-get-novel-chapter-summaries";
import { Novel } from "@/types/novel";
import { useMemo } from "react";

const MAX_CHAPTERS_PER_ACCORDION = 100;

type Props = {
  novel: Novel;
  start: number;
  end: number;
  excluded: number[];
  handleChange: (num: number) => void;
  disabled: boolean;
}

const ChaptersToDownload = ({
  novel,
  start,
  end,
  handleChange,
  excluded,
  disabled,
}: Props) => {
  const excludedSet = useMemo(() => new Set(excluded), [excluded]);
  const isSelected = (n: number) => n >= start && n <= end && !excludedSet.has(n);

  const totalAccordions = Math.ceil(novel.chaptersCount / MAX_CHAPTERS_PER_ACCORDION);

  return (
    <Accordion
      type="multiple"
      className="flex gap-3 flex-col"
      defaultValue={["item-0"]}
    >
      {Array.from({ length: totalAccordions }).map((_, index) => {
        const isLast = index + 1 === totalAccordions;
        const startChapter = MAX_CHAPTERS_PER_ACCORDION * index + 1;
        const endChapter = isLast ? novel.chaptersCount : (MAX_CHAPTERS_PER_ACCORDION + MAX_CHAPTERS_PER_ACCORDION * index);
        return (
          <AccordionItem value={`item-${index}`} key={`item-${index}`}>
            <AccordionTrigger className="p-4 rounded-none rounded-t-md bg-secondary w-full text-base items-center cursor-pointer hover:no-underline">
              <div className="flex gap-3 items-center font-bold">
                <p className="size-[32px] flex items-center justify-center text-white bg-zinc-700/50 rounded-sm">{index + 1}</p>
                <p className="text-lg">
                  {startChapter} - {endChapter}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance bg-secondary">
              <DownloadList
                novel={novel}
                page={index}
                onSelect={handleChange}
                size={MAX_CHAPTERS_PER_ACCORDION}
                disabled={disabled}
                isSelected={isSelected}
              />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

type ListProps = {
  size: number;
  page: number;
  novel: Novel;
  onSelect: (num: number) => void;
  disabled: boolean;
  isSelected: (num: number) => boolean;
};

const DownloadList = ({ novel, page, size, onSelect, disabled, isSelected }: ListProps) => {
  const chapters = useGetNovelChapterSummaries({ page, novelSlug: novel.slug, size, });

  if (chapters.isError || chapters.isLoading) {
    return <SpinnerLoader containerClassName="min-h-[10vh]" loaderClassName="size-7" />
  }

  return (
    <div className="grid md:grid-cols-4 pt-5 pb-3 px-7 gap-4 border-t">
      {chapters.data?.results.map(chapter => (
        <div className="flex gap-1.5 items-center" key={chapter.id}>
          <Checkbox
            id={chapter.slug}
            className="rounded-sm size-5 border border-primary bg-primary/30"
            onCheckedChange={() => onSelect(chapter.number)}
            checked={isSelected(chapter.number)}
            disabled={disabled}
          />
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="line-clamp-1">
              <Label htmlFor={chapter.slug} className="font-medium text-zinc-200 text-xs text-[13px] truncate line-clamp-1">
                <span className="text-zinc-300 font-normal inline">{chapter.title}</span>
              </Label>
            </TooltipTrigger>
            <TooltipContent className="capitalize text-center bg-secondary border border-zinc-50/10 text-zinc-200">
              <Label htmlFor={chapter.slug} className="font-medium text-zinc-200 text-xs text-[13px]">
                <span className="text-zinc-300 font-normal inline">{chapter.title}</span>
              </Label>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  )
}

export default ChaptersToDownload;
