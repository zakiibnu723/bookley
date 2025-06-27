"use client";
import ProfileSection from "@/components/pages/dashboard/ProfileSection";
import ServicesSection from "@/components/pages/dashboard/ServicesSection";
import StaffSection from "@/components/pages/dashboard/StaffSection";
import { useUser } from "@/context/UserContext";
import { useProfile } from "@/hooks/dashboard/useProfile";
import { useService } from "@/hooks/dashboard/useService";
import { useStaff } from "@/hooks/dashboard/useStaff";

export default function DashboardPage() {
  const { profile, updateProfile } = useUser()
  const profileHook = useProfile(profile, updateProfile);
  const serviceHook = useService(profile);
  const staffHook = useStaff(profile);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Barbershop tidak ditemukan</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg md:max-w-xl mx-auto p-4 space-y-8">
      <ProfileSection {...profileHook} />
      <ServicesSection {...serviceHook} />
      <StaffSection {...staffHook} />
    </div>
  );
}