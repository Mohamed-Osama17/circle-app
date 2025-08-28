import type { NextConfig } from "next";

("https://linked-posts.routemisr.com/uploads/69d705b0-76b8-44a4-b43a-7353b49860be-IMG_3249.JPG");

const isProd = process.env.NODE_ENV === "production";

const config: NextConfig = {
  reactStrictMode: true,
  output: "export", // enables static HTML export
  assetPrefix: isProd ? "/circle-app/" : "",
  basePath: isProd ? "/circle-app" : "",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linked-posts.routemisr.com",
        pathname: "/uploads/**",
        search: "",
      },
    ],
  },
};

export default config;
