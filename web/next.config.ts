import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.ppy.sh",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "assets.ppy.sh",
        pathname: "/beatmaps/**",
      },
      {
        protocol: "https",
        hostname: "osu.ppy.sh",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
