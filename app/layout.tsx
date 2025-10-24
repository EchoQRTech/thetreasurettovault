import "./globals.css";
import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import Script from "next/script"; // ✅ Needed for Outseta script

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "The Vault — Reselling OS",
  description: "AI tools, resale data, and 50+ spreadsheets for sellers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 🔐 Outseta Global Auth Script */}
        <Script
          src="https://cdn.outseta.com/outseta.min.js"
          data-outseta-domain="treasuretto-llc.outseta.com" // ✅ Added domain
          data-outseta-public-key="baf6e21b-f76e-4def-ad7e-296a04786a15"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${cinzel.variable} ${inter.variable} bg-vault-grad`}>
        {children}
      </body>
    </html>
  );
}
