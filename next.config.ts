import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/routes";

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects();
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
