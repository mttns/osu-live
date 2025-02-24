import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// default nextjs fonts btw lol
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "osu!live",
  description: "live osu!standard score feed",
  openGraph: {
    title: "osu!live - live osu!standard score feed",
    description:
      "watch a live feed of all submitted scores on osu!standard, with filtering by pp, mods, beatmap, and user!",
    url: "https://osulive.mittens.cc",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#eb5f9e" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:card" content="summary" />
        <meta name="og:image" content="https://osulive.mittens.cc/logo.png" />
        <meta name="og:image:type" content="image/png" />
        <meta name="og:image:width" content="128" />
        <meta name="og:image:height" content="128" />
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
