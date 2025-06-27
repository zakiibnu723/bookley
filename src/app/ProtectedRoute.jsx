"use client";
import LoadingComponent from "@/components/ui/loading/LoadingComponent";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Daftar path yang ingin diproteksi
const PROTECTED_PATHS = [
  "/dashboard",
  "/profile",
  "/admin",
  "/booking",
];

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  // Cek apakah path sekarang termasuk protected
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // jika halaman isProtected, loading selesai, dan user belum login, redirect ke login page
  useEffect(() => {
    if (isProtected && !loading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, loading, isProtected, router]);

  // jika halaman isProtected dan sedang loading, tampilkan komponent loading
  if (isProtected && loading) return <LoadingComponent /> 

  // jika halaman isProtected dan user belum login, jangan tampilkan apapun dan langsung redirect
  if (isProtected && !isAuthenticated) return null;

  // jika halaman public atau halaman isProtected namun user telah login, tampilkan child component
  return children;
}