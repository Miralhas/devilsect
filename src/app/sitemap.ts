import { env } from "@/env";
import { getAllAuthors } from "@/service/info/api/get-all-authors";
import { getGenres } from "@/service/info/api/get-genres";
import { getTags } from "@/service/info/api/get-tags";
import { getAllNovelInfo } from "@/service/novels/api/get-all-novel-info";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const genres = await getGenres();
  const novels = await getAllNovelInfo();
  const { results: tags } = await getTags({ size: 2000 });
  const { results: authors } = await getAllAuthors({ size: 2000 });

  const sitemapNovels: MetadataRoute.Sitemap = novels.map(({ slug, updatedAt }) => ({
    url: `${env.NEXT_PUBLIC_DOMAIN}/novels/${slug}`,
    lastModified: new Date(updatedAt),
  }));

  const sitemapGenres: MetadataRoute.Sitemap = genres.map(({ slug }) => ({
    url: `${env.NEXT_PUBLIC_DOMAIN}/genres/${slug}`,
  }));

  const sitemapTags: MetadataRoute.Sitemap = tags.map(({ slug }) => ({
    url: `${env.NEXT_PUBLIC_DOMAIN}/tags/${slug}`,
  }));

  const sitemapAuthors: MetadataRoute.Sitemap = authors.map(({ name }) => ({
    url: `${env.NEXT_PUBLIC_DOMAIN}/authors/${name.toLowerCase()}`
  }))

  return [
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}`,
      changeFrequency: 'monthly',
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/novels`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/ranking`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/updates`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/search`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/authors`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/genres`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/tags`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/privacy-policy`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/terms-of-service`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/cookies-policy`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/dmca`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/contact-us`,
    },
    ...sitemapNovels,
    ...sitemapGenres,
    ...sitemapTags,
    ...sitemapAuthors,
  ]
}