import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    PUBLIC_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_BASE_URL_WITHOUT_SUFFIX: z.string().url(),
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_BASE_URL_WITHOUT_SUFFIX: process.env.NEXT_PUBLIC_BASE_URL_WITHOUT_SUFFIX,
  },
});