import { env } from "@/env";
import { getNovelGenres, getNovelTags } from "@/services/novels/client-queries";
import { getAllNovelInfo } from "@/services/novels/server-queries";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const novels = await getAllNovelInfo();
  const genres = await getNovelGenres();
  const { results: tags } = await getNovelTags({ size: 2000 });

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