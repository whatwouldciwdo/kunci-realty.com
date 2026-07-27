import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KUNCI.REALTY — Crafted Architecture & Living",
  description: "A Kunci Realty home is more than bricks and mortar. It's crafted, personal and shaped around you.",
  icons: {
    icon: "/logo/KUNCI REALTY LOGO ONLY.png",
    apple: "/logo/KUNCI REALTY LOGO ONLY.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

