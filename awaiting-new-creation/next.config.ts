import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @type {import('next').NextConfig}
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.reuters.com",
      },
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk",
      },
      {
        protocol: "https",
        hostname: "i.guim.co.uk",
      },
      {
        protocol: "https",
        hostname: "i.insider.com",
      },
      {
        protocol: "https",
        hostname: "dam.mediacorp.sg",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      }
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
