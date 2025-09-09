import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky px-6 py-4 flex items-center justify-between">
      <div>logo</div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </div>
  );
}
