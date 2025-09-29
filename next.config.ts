import { env } from "@/env";
import type { NextConfig } from "next";
import withPlaceholder from "@plaiceholder/next";
import BundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

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
    optimizePackageImports: ["zod", "motion", "sonner"],
    inlineCss: true,
    reactCompiler: true,
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

export default withPlaceholder(withBundleAnalyzer(nextConfig));
