import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter, Manrope, Roboto, Tilt_Warp, Atkinson_Hyperlegible } from 'next/font/google';
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Devil Sect | Read Free Webnovels and Light Novels Online",
}

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  preload: false
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
  preload: false
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  preload: false
});

const tiltWarp = Tilt_Warp({
  subsets: ["latin"],
  variable: "--font-tilt-warp",
  weight: "400",
  preload: false
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${roboto.variable} ${tiltWarp.variable} ${inter.variable} ${atkinson.variable}`}
      data-scroll-behavior="smooth"
    >
      <body
        className={`vsc-initialized antialiased text-zinc-200 relative font-main`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster richColors />
        <SpeedInsights />
      </body>
    </html>
  );
}
