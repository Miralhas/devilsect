import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    PUBLIC_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_STALKERS_API_SECRET: z.string(),
    GOOGLE_CLIENT_STALKERS_API_HEADER: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_STALKERS_API_HEADER: process.env.GOOGLE_CLIENT_STALKERS_API_HEADER,
    GOOGLE_CLIENT_STALKERS_API_SECRET: process.env.GOOGLE_CLIENT_STALKERS_API_SECRET,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});