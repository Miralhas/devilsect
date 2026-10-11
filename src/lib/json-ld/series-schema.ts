import { env } from "@/env";
import { Series } from "@/types/novel";
import { CollectionPage, WithContext } from "schema-dts";

export const generateSeriesJsonLDSchema = (series: Series): WithContext<CollectionPage> => {
  const seriesUrl = `${env.NEXT_PUBLIC_DOMAIN}/series/${series.slug}`;

  const schema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": seriesUrl,
    url: seriesUrl,
    description: `Read '${series.title}' Online for Free,`,
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
          name: "Series",
          item: `${env.NEXT_PUBLIC_DOMAIN}/series`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: series.title,
          item: seriesUrl
        }
      ]
    },
    about: {
      "@type": "DefinedTerm",
      "@id": seriesUrl,
      name: series.title,
      description: `Read '${series.title}' Online for Free,`,
      inDefinedTermSet: `${env.NEXT_PUBLIC_DOMAIN}/series`
    }
  }

  return schema;
}