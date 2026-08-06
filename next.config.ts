
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ["10.19.204.237", "localhost:3000", "*.local"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;