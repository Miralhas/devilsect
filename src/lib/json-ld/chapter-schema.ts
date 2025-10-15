import { env } from "@/env";
import { type Chapter as ChapterType } from "@/types/chapter";
import { stripHtml } from "@/utils/string-utils";
import { Chapter, WithContext } from "schema-dts";

export const generateChapterJsonLDSchema = (chapter: ChapterType): WithContext<Chapter> => {
  const novelUrl = `${env.NEXT_PUBLIC_DOMAIN}/novels/${chapter.novelSlug}`;
  const chapterUrl = `${novelUrl}/${chapter.slug}`;

  const schema: WithContext<Chapter> = {
    "@context": "https://schema.org",
    "@type": "Chapter",
    "@id": chapterUrl,
    url: chapterUrl,
    name: chapter.title,
    position: chapter.number,
    isPartOf: {
      "@type": "Book",
      name: chapter.novelTitle,
      url: novelUrl
    },
    text: stripHtml(chapter.body).slice(0, 5000)
  };
  return schema;
}