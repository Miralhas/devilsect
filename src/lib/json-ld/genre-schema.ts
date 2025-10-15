import { env } from "@/env";
import { Genre } from "@/types/novel";
import { CollectionPage, WithContext } from "schema-dts";

export const generateGenreJsonLDSchema = (genre: Genre): WithContext<CollectionPage> => {
  const genreUrl = `${env.NEXT_PUBLIC_DOMAIN}/genres/${encodeURIComponent(genre.name)}`;

  const schema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": genreUrl,
    url: genreUrl,
    description: genre.description,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${env.NEXT_PUBLIC_DOMAIN}`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Genres",
          item: `${env.NEXT_PUBLIC_DOMAIN}/genres`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: genre.name,
          item: genreUrl
        }
      ]
    },
    about: {
      "@type": "DefinedTerm",
      "@id": genreUrl,
      name: genre.name,
      description: genre.description,
      inDefinedTermSet: `${env.NEXT_PUBLIC_DOMAIN}/genres`
    }
  }

  return schema;
}