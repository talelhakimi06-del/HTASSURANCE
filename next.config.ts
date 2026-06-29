import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF en priorité (≈30-50% plus léger que WebP) → meilleur LCP mobile
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
