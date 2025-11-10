import { env } from "@/env";

export const generateHomeJsonLDSchema = () => {
  const websiteUrl = `${env.NEXT_PUBLIC_DOMAIN}`;
  const logoUrl = `https://wsrv.nl/?url=https://static.devilsect.com/devilsect-logo.png&w=300&maxage=1y&output=webp`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${websiteUrl}#website`,
        url: websiteUrl,
        name: "DEVILSECT",
        description: "Devilsect provides fantasy novels and adventure book stories! Read newest web novels updates which are translated from Chinese/Korean. Communication with same bibliophilia in our fantasy world!",
        inLanguage: "en",
        publisher: {
          "@id": `${websiteUrl}#organization`
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${websiteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${websiteUrl}#organization`,
        name: "Devil Sect | Read Webnovels and Light Novels Online for free",
        url: websiteUrl,
        logo: logoUrl,
      }
    ]
  }

  return schema
}