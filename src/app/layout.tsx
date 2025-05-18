import Header from "@/components/navbar/header";
import type { Metadata } from "next";
import { Manrope, Roboto, Tilt_Warp } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  title: "Devil Sect | Read Free Webnovels and Light Novels Online",
}

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
      className={`${manrope.variable} ${roboto.variable} ${tiltWarp.variable}`}
    >
      <body
        className={`vsc-initialized antialiased text-zinc-200 relative font-main`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
