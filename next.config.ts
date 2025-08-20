import { env } from "@/env";
import type { NextConfig } from "next";
import withPlaceholder from "@plaiceholder/next";

const WEEK_IN_SECONDS = 604800;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: WEEK_IN_SECONDS * 4,
    remotePatterns: [
      new URL('https://github.com/**'),
      new URL(`${env.APP_URL}/**`)
    ],
  },
  experimental: {
    authInterrupts: true,
  },
  turbopack: {
    rules: {
      ".svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  }
};

export default withPlaceholder(nextConfig);
