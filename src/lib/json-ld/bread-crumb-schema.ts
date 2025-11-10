import { env } from "@/env";

export const generateBreadcrumbJsonLDSchema = (name: string, uri: string) => {
  const websiteUrl = `${env.NEXT_PUBLIC_DOMAIN}`;
  const url = `${env.NEXT_PUBLIC_DOMAIN}${uri}`
  const logoUrl = `https://wsrv.nl/?url=https://static.devilsect.com/devilsect-logo.png&w=300&maxage=1y&output=webp`;

  return [
    {
      "@context": "https://schema.org/",
      "@type": "Organization",
      logo: logoUrl,
      url: websiteUrl,
      name: "Devil Sect | Read Webnovels and Light Novels Online for free",
      slogan: "Devilsect provides fantasy novels and adventure book stories! Read newest web novels updates which are translated from Chinese/Korean. Communication with same bibliophilia in our fantasy world!"
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
          name: name,
          item: url
        },
      ]
    }
  ]
}