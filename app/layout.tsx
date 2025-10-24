import "./globals.css";
import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import Script from "next/script";

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
        {/* ✅ Outseta Header Script */}
        <Script id="outseta-script" strategy="beforeInteractive">
          {`
            var o_options = {
              domain: 'treasuretto-llc.outseta.com',
              load: 'auth,customForm,emailList,leadCapture,nocode,profile,support'
            };
          `}
        </Script>
        <Script
          src="https://cdn.outseta.com/outseta.min.js"
          data-options="o_options"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${cinzel.variable} ${inter.variable} bg-vault-grad`}>
        {children}
      </body>
    </html>
  );
}
