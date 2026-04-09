import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/reactQueryProviders";
import ClientHydrate from "./components/client/clientHydrate";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beauty Of Chiri",
  description: "The Exquisite Skincare brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <ClientHydrate>{children}</ClientHydrate>
        </ReactQueryProvider>
      </body>
    </html>
  );
}