import { Novel } from "@/types/novel";

const NovelDescription = ({ novel }: { novel: Novel }) => {
  return (
    <div className="p-3 border border-zinc-50/15 pb-3">
      <p className="text-sm md:text-[15px] text-muted-foreground">
        <span className="capitalize">{novel.title}</span> is a popular light novel covering the <span>{formatGenres(novel.genres)}</span> It&apos;s written by the Author <span className="capitalize">{novel.author}</span>. A total of {novel.chaptersCount} chapters have been translated, and {novel.status === "COMPLETED" ? "the translation is complete" : "translation of additional chapters is currently in progress"}.
      </p>
    </div>
  )
}

const formatGenres = (genres: string[]) => {
  if (genres.length <= 1) {
    return `${genres[0]} genre.`
  } else if (genres.length <= 2) {
    return `${genres[0]} and ${genres[1]} genres.`;
  } 
  return `${genres.slice(0, 2).join(", ")} and ${genres.slice(2, 3).join("")} genres.`
}

export default NovelDescription;
