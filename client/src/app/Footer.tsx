import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Company Logo" width={50} height={50} />
            <span className="text-xl font-semibold text-white">Debbal</span>
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            We build solutions that scale with your business. Let&apos;s make
            something amazing together.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Get in Touch</h4>
          <p className="text-sm text-gray-400 mb-4">info@debbal.com </p>

          <div className="flex space-x-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5 fill-current hover:text-white transition"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9 12.15 12.15 0 0 1-8.82-4.47 4.28 4.28 0 0 0 1.33 5.72A4.27 4.27 0 0 1 2.8 9v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.14 12.14 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2v-.56A8.6 8.6 0 0 0 24 5.5a8.4 8.4 0 0 1-2.54.7z" />
              </svg>
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5 fill-current hover:text-white transition"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C3.33 3.5 2 4.83 2 6.48c0 1.64 1.33 2.97 2.98 2.97s2.98-1.33 2.98-2.97c0-1.65-1.33-2.98-2.98-2.98zM2.4 21.5h5.17V9H2.4v12.5zM9.34 9h4.95v1.71h.07c.69-1.3 2.38-2.67 4.9-2.67 5.24 0 6.2 3.45 6.2 7.93v8.53h-5.17v-7.56c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.96v7.7h-5.17V9z" />
              </svg>
            </Link>

            <Link href="https://github.com" target="_blank" aria-label="GitHub">
              <svg
                className="w-5 h-5 fill-current hover:text-white transition"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.15c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.85 1.24 1.93 1.24 3.25 0 4.63-2.81 5.65-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 fill-current hover:text-white transition"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3c-2.76 0-5 2.24-5 5s2.24 5 5 5a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              </svg>
            </Link>

            <Link
              href="https://youtube.com"
              target="_blank"
              aria-label="YouTube"
            >
              <svg
                className="w-5 h-5 fill-current hover:text-white transition"
                viewBox="0 0 24 24"
              >
                <path d="M19.6 3.2H4.4C2.2 3.2.4 5 0 7.2v9.6c.4 2.2 2.2 4 4.4 4h15.2c2.2 0 4-1.8 4.4-4V7.2c-.4-2.2-2.2-4-4.4-4zM9.6 15.5V8.5l6.4 3.5-6.4 3.5z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-6 py-4 text-center text-sm text-gray-500">
        &copy; {currentYear} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}
