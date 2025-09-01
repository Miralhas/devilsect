import { env } from "@/env";
import type { NextConfig } from "next";
import withPlaceholder from "@plaiceholder/next";


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(`${env.APP_URL}/**`),
      new URL(`${env.NEXT_PUBLIC_CDN_URL}/**`),
    ],
    loader: 'custom',
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
