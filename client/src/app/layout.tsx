"use client";
import { Tinos } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Provider from "./Provider";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const tinos = Tinos({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // pages that shouldn't show the public NavBar/Footer
  const isAuthPage = pathname === "/login";
  const isAdminPage = pathname.startsWith("/admin");

  const hideGlobalLayout = isAuthPage || isAdminPage;

  return (
    <html lang="en">
      <body className={tinos.className}>
        <Provider>
          {/* Show NavBar/Footer only on public pages */}
          {!hideGlobalLayout && <NavBar />}
          {children}
          {!hideGlobalLayout && <Footer />}
          <Toaster richColors />
        </Provider>
      </body>
    </html>
  );
}
