import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vewtkqjkoxdcnaasbtty.supabase.co",
        port: "",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "freeiconspng.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.freeiconspng.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;