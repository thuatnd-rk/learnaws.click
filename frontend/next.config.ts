import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    // Don't run ESLint during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;