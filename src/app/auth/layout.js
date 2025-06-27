"use client";
import LoadingComponent from "@/components/ui/loading/LoadingComponent";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const { isAuthenticated, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  // Jangan render apapun sebelum loading selesai
  // if (loading) return <LoadingComponent />

  // Jika sudah login, jangan render children (form, navbar, footer, dsb)
  if (isAuthenticated) return <div className="min-h-screen"></div>;

  // Render halaman login/register beserta layoutnya
  return <>{children}</>;
}