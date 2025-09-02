import Image from "next/image";
import Link from "next/link";
import NavbarMenu from "./NavBarMenu";

export default function Navbar() {
  return (
    <div className="sticky top-0 px-6 py-4 flex items-center justify-between shadow bg-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-primary text-xl font-bold">Debbal</span>
        </Link>

        <ul className=" items-center gap-8 hidden md:flex">
          {[
            { href: "/", label: "Home" },
            { href: "/service", label: "Service" },
            { href: "/projects", label: "Portfolio" },
            { href: "/about", label: "About" },
            { href: "/blogs", label: "Blogs" },
            { href: "/contact", label: "Contact" },
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
        </ul>
        <div className="md:hidden">
          {" "}
          <NavbarMenu />
        </div>
      </div>
    </div>
  );
}
