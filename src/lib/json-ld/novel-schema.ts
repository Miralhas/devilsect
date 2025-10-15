import { env } from "@/env";
import { Novel } from "@/types/novel";
import { stripHtml } from "@/utils/string-utils";
import { Book, WithContext } from "schema-dts";

export const generateNovelJsonLDSchema = (novel: Novel): WithContext<Book> => {
  const alias = novel.alias ?? novel.title.toLowerCase();
  const novelUrl = `${env.NEXT_PUBLIC_DOMAIN}/novels/${novel.slug}`;
  const imageUrl = `https://wsrv.nl/?url=${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image&w=1200&maxage=15d&output=webp&default=https://static.devilsect.com/No-Image-Placeholder.svg`;

  const schema: WithContext<Book> = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": novelUrl,
    url: novelUrl,
    name: novel.title,
    alternateName: alias,
    description: stripHtml(novel.description),
    author: {
      "@type": "Person",
      name: novel.author,
      url: `${env.NEXT_PUBLIC_DOMAIN}/authors/${encodeURIComponent(novel.author)}`
    },
    image: [imageUrl, imageUrl.replace("output=webp", "output=jpeg")],
    genre: novel.genres,
    keywords: novel.tags.join(", "),
    inLanguage: "en",
    bookFormat: "EBook",
    datePublished: new Date(novel.createdAt).toISOString(),
    dateModified: new Date(novel.updatedAt).toISOString(),
    numberOfPages: novel.chaptersCount,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: novel.metrics.ratingValue?.toFixed(2) ?? novel.metrics.bayesianScore.toFixed(2),
      ratingCount: novel.metrics.ratingSize,
      bestRating: "5",
      worstRating: "1",
    },
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "ViewAction" },
      userInteractionCount: novel.metrics.views
    },
    workExample: [
      {
        "@type": "Chapter",
        name: novel.firstChapter.title,
        url: `${novelUrl}/${novel.firstChapter.slug}`,
        position: novel.firstChapter.number
      },
      {
        "@type": "Chapter",
        name: novel.lastChapter.title,
        url: `${novelUrl}/${novel.lastChapter.slug}`,
        position: novel.lastChapter.number
      },
    ],
    isPartOf: {
      "@type": "BookSeries",
      name: `${novel.title} Series`
    }
  };

  return schema;
};
