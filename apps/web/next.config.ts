import path from "path";
/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  staticPageGenerationTimeout: 120,
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, "../.."),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: false,
    unoptimized: false,
    qualities: [40, 50, 60, 75, 100],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/app/home",
  //       destination: "/home",
  //       permanent: true,
  //     },
  //     {
  //       source: "/app/about-me",
  //       destination: "/about-me",
  //       permanent: true,
  //     },
  //     {
  //       source: "/app/contact",
  //       destination: "/contact",
  //       permanent: true,
  //     },
  //     {
  //       source: "/app/project",
  //       destination: "/project",
  //       permanent: true,
  //     },
  //     {
  //       source: "/app/project/:slug",
  //       destination: "/project/:slug",
  //       permanent: true,
  //     },
  //     {
  //       source: "/app/privacy-policy",
  //       destination: "/privacy-policy",
  //       permanent: true,
  //     },
  //     {
  //       source: "/app/cookies-policy",
  //       destination: "/cookies-policy",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
