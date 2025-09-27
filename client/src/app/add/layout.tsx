import AdminNavBar from "./AdminNavBar"
import Footer from "../Footer"
export default function AddLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><AdminNavBar />
            {children}
            <Footer /></>;
}
