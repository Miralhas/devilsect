import Header from "@/components/navbar/header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {template: `%s | Devil Sect`, default: "Read Free Webnovels and Light Novels Online | Devil Sect"},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`vsc-initialized antialiased text-zinc-200 relative`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
