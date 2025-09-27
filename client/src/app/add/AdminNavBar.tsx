"use client"
import Link from "next/link";
import Image from "next/image";
import AdminNavbarMenu from "./AdminNavBarMenu"
import { useRouter } from "next/navigation";

export default function AdminNavBar() {
  
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login"); // redirect to login page
  };
  return (
    <div className="sticky top-0 px-6 py-4 flex items-center justify-between shadow bg-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo.png" alt="Logo" width={40} height={40} />
          <span className="text-primary text-xl font-bold">Debbal</span>
        </Link>

        <ul className=" items-center gap-8 hidden md:flex">
          {[
            { href: "/add", label: "Add Content" },
            { href: "/manage", label: "Manage Content" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="
                  relative py-1 text-gray-700 font-medium 
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
                  after:bg-primary after:transition-all after:duration-300 hover:after:w-full
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
           </li>
        </ul>
        <div className="md:hidden">
          {" "}
          <AdminNavbarMenu />
        </div>
      </div>
    </div>
  );
}
