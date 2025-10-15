import { env } from "@/env";
import { AuthorInfo } from "@/types/novel";
import { Person, WithContext } from "schema-dts";

export const generateAuthorJsonLDSchema = (author: AuthorInfo): WithContext<Person> => {
  const authorUrl = `${env.NEXT_PUBLIC_DOMAIN}/authors/${encodeURIComponent(author.name)}`

  const schema: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": authorUrl,
    url: authorUrl,
    name: author.name,
  };
  return schema;
}