import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
};

// Makes Cloudflare bindings (D1, env vars) available during `next dev`.
initOpenNextCloudflareForDev();

export default nextConfig;
