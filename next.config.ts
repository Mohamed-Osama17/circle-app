import type { NextConfig } from "next";

'https://linked-posts.routemisr.com/uploads/69d705b0-76b8-44a4-b43a-7353b49860be-IMG_3249.JPG'

const config: NextConfig = {
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
