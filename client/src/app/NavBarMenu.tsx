"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavbarMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="shadow">
          <SheetTitle className="flex items-center gap-2 ">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-primary text-xl font-bold">Debbal</span>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-6 px-3 w-full">
          {[
            { href: "/", label: "Home" },
            { href: "/service", label: "Service" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/about", label: "About" },
            { href: "/blogs", label: "Blogs" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-3 w-full block hover:bg-border/50 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
