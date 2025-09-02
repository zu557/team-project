import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // 👈 replace with your domain
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // 👈 if using Unsplash
      },
    ],
  },
};

export default nextConfig;
