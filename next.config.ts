import { env } from "@/env";
import type { NextConfig } from "next";
import withPlaceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
