"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";

const HIDE_NAVBAR_PATHS = [
  "/slot",
  "/checkout",
  // tambahkan path lain jika ingin di-hide
];

export default function AppShell({ children }) {
  const pathname = usePathname();
  // Hide jika pathname mengandung salah satu substring di HIDE_NAVBAR_PATHS
  const hideNavbar = HIDE_NAVBAR_PATHS.some((path) => pathname.includes(path));

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
}