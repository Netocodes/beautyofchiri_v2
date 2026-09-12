import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Playfair_Display
} from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/reactQueryProviders";
import { cn } from "@/lib/utils";
import NavBar from "./components/client/navbar";
import CurrencyProvider from "./components/client/fetchRates";
import SkincareFooter from "./components/client/Footer";

// Font Definitions
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // 🔥 Fixed: unique variable
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant", // 🔥 Fixed: unique variable
  display: "swap",
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
    <html
      lang="en"
      className={cn(
        "font-sans antialiased",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        playfair.variable,
        cormorant.variable
      )}
    >
      <body className="bg-background text-foreground min-h-screen">
        <ReactQueryProvider>
          <CurrencyProvider>
            <NavBar />
            {children}
            <SkincareFooter />
          </CurrencyProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}