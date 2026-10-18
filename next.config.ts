import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  outputFileTracingRoot: process.cwd(),
  partialPrefetching: true,
};

export default nextConfig;
