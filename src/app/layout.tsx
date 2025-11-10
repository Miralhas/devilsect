import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Inter, Manrope, Roboto, Tilt_Warp } from 'next/font/google';
import Script from "next/script";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import 'react-image-crop/dist/ReactCrop.css';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Devil Sect | Read Webnovels and Light Novels Online for free",
    template: "%s | Devil Sect"
  },
  description: "Devilsect provides fantasy novels and adventure book stories! Read newest web novels updates which are translated from Chinese/Korean. Communication with same bibliophilia in our fantasy world!",
  twitter: {
    card: "summary_large_image"
  },
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
  preload: false,
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
        className={`vsc-initialized antialiased text-zinc-200 relative font-main notranslate`}
      >
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
        <Toaster richColors />
        <Script
          src="https://rybbit.devilsect.com/api/script.js"
          data-site-id="1"
          defer
        />
      </body>
    </html>
  );
}
