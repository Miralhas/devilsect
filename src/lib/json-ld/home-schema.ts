import { env } from "@/env";
import { CollectionPage, Graph, Organization, WebSite } from "schema-dts";

export const generateHomeJsonLDSchema = (): Graph => {
  const websiteUrl = `${env.NEXT_PUBLIC_DOMAIN}`;
  const logoUrl = `https://wsrv.nl/?url=https://static.devilsect.com/devilsect-logo.png&w=100&maxage=15d&output=webp`;

   const websiteSchema: WebSite = {
    "@type": "WebSite",
    "@id": `${websiteUrl}/#website`,
    url: websiteUrl,
    name: "Devilsect",
    description: "Free digital library where users can explore new stories, read for free, track their progress, and engage with reviews and comments.",
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${websiteUrl}/search?q={query}`,
      query: "required",
    },
    publisher: {
      "@id": `${websiteUrl}/#organization`,
    },
  };

  const orgSchema: Organization = {
    "@type": "Organization",
    "@id": `${websiteUrl}/#organization`,
    name: "Devilsect",
    url: websiteUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: "100",
      height: "150",
    }
  }

  const collectionPageSchema: CollectionPage = {
    "@type": "CollectionPage",
    "@id": `${websiteUrl}/#homepage`,
    name: `Devilsect - Read Web Novels Online`,
    description:
      "Browse and read thousands of web novels. Discover new releases, trending novels, and completed series.",
    url: websiteUrl,
    isPartOf: {
      "@id": `${websiteUrl}/#website`,
    },
    about: {
      "@type": "Thing",
      name: "Web Novels",
      description: "Online serialized fiction including Xianxia, Fantasy, Romance, and other genres",
    },
    mainEntity: {
      "@type": "Collection",
      name: "Web Novels Collection",
      description: "A curated collection of thousands of web novels across multiple genres",
    },
     breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: websiteUrl,
        },
      ],
    },
  }

  const graphSchema: Graph = {
    "@context": "https://schema.org",
    "@graph": [websiteSchema, orgSchema, collectionPageSchema]
  }

  return graphSchema;
}