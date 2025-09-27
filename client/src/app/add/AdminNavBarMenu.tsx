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
import { useRouter } from "next/navigation";


export default function NavbarMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login"); // redirect to login page
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="shadow">
          <SheetTitle className="flex items-center gap-2 ">
            <Image src="/Logo.png" alt="Logo" width={40} height={40} />
            <span className="text-primary text-xl font-bold">Debbal</span>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-6 px-3 w-full">
          {[
            { href: "/add", label: "Add Content" },
            { href: "/manage", label: "Manage Content" }            
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
           <li>
              <button
                onClick={handleLogout}
                className="px-3 py-3 w-full block hover:bg-border/50 transition-colors"
              >
                Logout
              </button>
           </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
