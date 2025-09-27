import { env } from "@/env";
import { getGenres } from "@/service/info/api/get-genres";
import { getTags } from "@/service/info/api/get-tags";
import { getAllNovelInfo } from "@/service/novels/api/get-all-novel-info";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const genres = await getGenres();
  const novels = await getAllNovelInfo();
  const { results: tags } = await getTags({ size: 2000 });

  const sitemapNovels: MetadataRoute.Sitemap = novels.map(({ slug, updatedAt }) => ({
    url: `${env.NEXT_PUBLIC_DOMAIN}/novels/${slug}`,
    lastModified: new Date(updatedAt),
  }));

  const sitemapGenres: MetadataRoute.Sitemap = genres.map(({ name }) => ({
    url: `${env.NEXT_PUBLIC_DOMAIN}/genres/${name.toLowerCase()}`,
  }));

  const sitemapTags: MetadataRoute.Sitemap = tags.map(({ name }) => ({
    url: `${env.NEXT_PUBLIC_DOMAIN}/tags/${name.toLowerCase()}`,
  }));

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
      url: `${env.NEXT_PUBLIC_DOMAIN}/genres`,
    },
    {
      url: `${env.NEXT_PUBLIC_DOMAIN}/tags`,
    },
    ...sitemapNovels,
    ...sitemapGenres,
    ...sitemapTags,
  ]
}