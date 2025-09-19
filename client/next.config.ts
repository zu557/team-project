import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "media.istockphoto.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "tse2.mm.bing.net",
      "tse3.mm.bing.net", // 👈 add this
      "tse4.mm.bing.net",
    ],
  },
  /* config options here */
};

export default nextConfig;
