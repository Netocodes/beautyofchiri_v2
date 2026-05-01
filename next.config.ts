import type { NextConfig } from "next";
// const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL3 || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUzuBtU1PJQweAKoIKpiPduperujJFD4MM8A&s"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // images: {
  //   domains: ['vewtkqjkoxdcnaasbtty.supabase.co'],
  // },
};

export default nextConfig;
