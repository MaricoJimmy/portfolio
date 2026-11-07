import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev badge sits bottom-left, exactly where the chat launcher is. Errors still surface.
  devIndicators: false,
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
