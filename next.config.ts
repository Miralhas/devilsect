import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://github.com/**'),
      new URL(`${env.APP_URL}/**`)
    ],
  },

};

export default nextConfig;
