import { env } from "@/env";
import { Novel } from "@/types/novel";
import { capitalize, getNovelDescription } from "@/utils/string-utils";


export const generateNovelJsonLDSchema = (novel: Novel) => {
  const title = capitalize(novel.title);
  const websiteUrl = `${env.NEXT_PUBLIC_DOMAIN}`;
  const novelUrl = `${env.NEXT_PUBLIC_DOMAIN}/novels/${novel.slug}`;
  const logoUrl = `https://wsrv.nl/?url=https://static.devilsect.com/devilsect-logo.png&w=300&maxage=1y&output=webp`;
  const imageUrl = `https://wsrv.nl/?url=${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image&w=300&maxage=15d&output=webp&default=https://static.devilsect.com/No-Image-Placeholder.svg`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      mainEntityOfPage: novelUrl,
      headline: title,
      name: title,
      genre: novel.genres[0],
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: 300
      },
      bookFormat: "https://schema.org/EBook",
      datePublished: new Date(novel.createdAt).toISOString(),
      dateModified: new Date(novel.updatedAt).toISOString(),
      author: {
        "@type": "Person",
        name: novel.author,
        url: `${env.NEXT_PUBLIC_DOMAIN}/authors/${encodeURIComponent(novel.author)}`
      },
      copyrightHolder: novel.author,
      publisher: {
        "@type": "Organization",
        name: "Devilsect",
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: 300
        }
      },
      description: getNovelDescription(novel),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: novel.metrics.ratingValue?.toFixed(2) ?? novel.metrics.bayesianScore.toFixed(2),
        ratingCount: novel.metrics.ratingSize ?? 0,
        bestRating: "5",
        worstRating: "1",
      },
      potentialAction: {
        "@type": "ReadAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${novelUrl}/${novel.firstChapter.slug}`
        }
      }
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
          name: title,
          item: novelUrl
        }
      ]
    }
  ]

  return schemas;
};