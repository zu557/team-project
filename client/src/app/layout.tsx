"use client"
// import type { Metadata } from "next";
import { Tinos } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Provider from "./Provider";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const tinos = Tinos({ subsets: ["latin"], weight: ["400", "700"] });

// export const metadata: Metadata = {
//   title: {
//     default: "Debbal – Innovative Web Solutions",
//     template: "%s | Debbal",
//   },
//   description:
//     "Explore Debbal.com for cutting-edge web development, creative projects, and modern digital experiences.",
//   icons: {
//     icon: "/logo.png",
//   },
// };




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login"; // add others if needed

  return (
    <html lang="en">
      <body className={tinos.className}>
        <Provider>
          {!isAuthPage && <NavBar />}
          {children}
          {!isAuthPage && <Footer />}
          <Toaster richColors />
        </Provider>
      </body>
    </html>
  );
}