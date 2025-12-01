import { Novel } from "@/types/novel";
import slugify from "slugify"


export const buildQueryString = <T extends Record<string, string | number | boolean | undefined>>(
  params: T
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const capitalize = (val: string) => {
  val = val.trim().toLowerCase().replace("  ", " ")
  const val1 = val.split(":").map(w => w[0].toUpperCase() + w.slice(1)).join(":")
  return val1.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}

export const actionErrorMessage = (error: string | string[]) => {
  if (Array.isArray(error)) return error.join(", ");
  return error;
};

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export const toSlug = (str: string): string => {
  return slugify(str, {
    trim: true,
    lower: true,
    remove: /[*+~.()'"!:@]/g
  })
}

export const truncate = (text: string, numberOfWords: number) => {
  const strippedText = stripHtml(text);
  const words = strippedText.split(" ");
  const wordCount = words.length;
  let result = words.splice(0, numberOfWords).join(" ");
  if (wordCount > numberOfWords) result += "..."

  return result;
}

export const getNovelDescription = (novel: Novel) => {
  const synopsis = truncate(novel.description, 25)
  const tags = novel.tags.slice(0, 4).join(", ");
  return `Read '${capitalize(novel.title)}' Online for Free, written by the author ${novel.author}, This book is a ${novel.genres[0]} Novel, covering ${tags}, and the synopsis is: ${synopsis}`;
}