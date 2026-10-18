import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_EVICT: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_CDN_URL: z.string().url(),
    NEXT_PUBLIC_DOMAIN: z.string().url(),
    NEXT_PUBLIC_MAINTENANCE: z.string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
    NEXT_PUBLIC_EVICT: process.env.NEXT_PUBLIC_EVICT,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_MAINTENANCE: process.env.NEXT_PUBLIC_MAINTENANCE,
  },
});