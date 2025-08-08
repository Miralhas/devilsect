import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter, Manrope, Roboto, Tilt_Warp, Atkinson_Hyperlegible } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
  title: "Devil Sect | Read Free Webnovels and Light Novels Online",
}

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const tiltWarp = Tilt_Warp({
  subsets: ["latin"],
  variable: "--font-tilt-warp",
  weight: "400"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      className={`${manrope.variable} ${roboto.variable} ${tiltWarp.variable} ${inter.variable} ${atkinson.variable}`}
    >
      <body
        className={`vsc-initialized antialiased text-zinc-200 relative font-main`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
