import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["feature-flow-js"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }],
  },
};

export default nextConfig;
