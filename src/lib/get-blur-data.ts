'server only'

import { getPlaiceholder } from "plaiceholder";

export const getBlurData = async (src: string) => {
  try {
    const buffer = await fetch(src).then(async (res) => {
      return Buffer.from(await res.arrayBuffer());
    });

    const data = await getPlaiceholder(buffer);
    return data;
  // eslint-disable-next-line
  } catch (err: any) {
    console.log(`Error fetching or processing image for source [${src}]:`, err.message);
    return { base64: "", img: "" };
  }
}

