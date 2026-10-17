import { env } from "@/env";
import withPlaceholder from "@plaiceholder/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      new URL(`${env.APP_URL}/**`),
      new URL(`${env.NEXT_PUBLIC_CDN_URL}/**`),
    ],
    qualities: [1, 10, 20, 70, 75, 100],
    loader: 'custom',
  },
  experimental: {
    optimizePackageImports: ["zod", "motion", "sonner"],
    inlineCss: true,
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      ".svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  }
};

const config: NextConfig = {
  ...withPlaceholder(nextConfig),
  cacheComponents: true,
  partialPrefetching: true,
}

export default config;