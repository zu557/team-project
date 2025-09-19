import type { Metadata } from "next";
import { Tinos } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const tinos = Tinos({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: {
    default: "Debbal – Innovative Web Solutions",
    template: "%s | Debbal",
  },
  description:
    "Explore Debbal.com for cutting-edge web development, creative projects, and modern digital experiences.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={tinos.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
