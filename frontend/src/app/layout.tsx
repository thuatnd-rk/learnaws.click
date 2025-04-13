import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevOps AI WebApp",
  description: "Trợ lý DevOps cá nhân",
  icons: {
    icon: [
      { url: '/images/logo/web-logo.svg', sizes: '64x64' },
      { url: '/images/logo/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/images/logo/apple-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/images/logo/web-logo.svg' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}