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
    lower: true
  })
}