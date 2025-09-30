"use client"
import Link from "next/link";
import Image from "next/image";
import AdminNavbarMenu from "./AdminNavBarMenu"
import { useRouter } from "next/navigation";

export default function AdminNavBar() {
  
  const router = useRouter();

 const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      // e.g. 4xx/5xx responses
      throw new Error(`Logout failed: ${res.status} ${res.statusText}`);
    }

    console.log("Logout successful:", res);
    router.push("/login");
  } catch (error) {
    // Catches network errors or the thrown error above
    console.error("Error during logout:", error);
    // Optionally show a toast or alert to the user here
  }
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
            { href: "/", label: "Home" },
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