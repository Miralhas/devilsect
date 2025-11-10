import { env } from "@/env";
import { type Chapter as ChapterType } from "@/types/chapter";
import { capitalize, truncate } from "@/utils/string-utils";

export const generateChapterJsonLDSchema = (chapter: ChapterType) => {
  const novelUrl = `${env.NEXT_PUBLIC_DOMAIN}/novels/${chapter.novelSlug}`;
  const chapterUrl = `${novelUrl}/${chapter.slug}`;
  const websiteUrl = `${env.NEXT_PUBLIC_DOMAIN}`;
  const novelTitle = capitalize(chapter.novelTitle);
  const chapterTitle = capitalize(chapter.title);
  const createdAt = chapter.next?.createdAt ?? chapter.previous?.createdAt;
  const updatedAt = chapter.next?.updatedAt ?? chapter.previous?.updatedAt;
  const imageUrl = `https://wsrv.nl/?url=${env.NEXT_PUBLIC_BASE_URL}/novels/${chapter.novelSlug}/image&w=300&maxage=15d&output=webp&default=https://static.devilsect.com/No-Image-Placeholder.svg`;
  const logoUrl = `https://wsrv.nl/?url=https://static.devilsect.com/devilsect-logo.png&w=300&maxage=1y&output=webp`;
  
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      mainEntityOfPage: chapterUrl,
      headline: `${novelTitle} - ${chapter.number}`,
      name: `${novelTitle} - ${chapter.number}`,
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        height: 424,
        width: 300
      },
      datePublished: new Date(createdAt!).toISOString(),
      dateModified: new Date(updatedAt!).toISOString(),
      publisher: {
        "@type": "Organization",
        name: "WebNovel",
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: 300
        }
      },
      description: truncate(chapter.body, 160)
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: websiteUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Novels",
          item: `${websiteUrl}/novels`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: novelTitle,
          item: novelUrl
        },
        {
          "@type": "ListItem",
          position: 4,
          name: chapterTitle,
          item: chapterUrl
        }
      ]
    }
  ]

  return schemas;
}