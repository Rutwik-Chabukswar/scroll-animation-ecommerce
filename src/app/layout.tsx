import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Navbar from "../../components/Navbar";
import SmoothScroll from "../../components/SmoothScroll";
import CustomCursor from "../../components/CustomCursor";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Pure Juice | Fresh & Premium Cold-Pressed Juice",
  description: "Experience the pure taste of nature with our premium cold-pressed strawberry juice. No artificial sugar, just real fruit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <CustomCursor />
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
