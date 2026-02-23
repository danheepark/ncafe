import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { CartProvider } from "./_context/CartContext";

export const metadata: Metadata = {
  title: "N.CAFE | 몰입과 휴식을 위한 공간",
  description: "당신의 일상에 감각적인 여유를 더하는 프리미엄 카페 브랜드, N.CAFE입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${outfit.variable}`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
