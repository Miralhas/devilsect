import { env } from "@/env";
import { WebSite, WithContext } from "schema-dts";

export const generateHomeJsonLDSchema = (): WithContext<WebSite> => {
  const websiteUrl = `${env.NEXT_PUBLIC_DOMAIN}`;
  const logoUrl = `https://wsrv.nl/?url=https://static.devilsect.com/devilsect-logo.png&w=100&maxage=15d&output=webp`;

  return {
    "@context": "https://schema.org",
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
    },
  };
}