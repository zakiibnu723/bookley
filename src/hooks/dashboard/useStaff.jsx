import { useState, useEffect } from "react";
import * as staffService from "@/services/staffService";

export function useStaff(profile) {
  const [staffs, setStaffs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id) return;
    setLoading(true);
    staffService.fetchStaffsByPartner(profile?.id).then((res) => {
      setStaffs(res.data || []);
      setLoading(false);
    });
  }, [profile?.id]);

  const handleAddStaff = () => {
    setStaffs((prev) => [
      {
        partner_id: profile?.id,
        name: "",
        opening_hours: profile?.opening_hours
          ? profile.opening_hours.map((hour) => ({
              ...hour,
              // Optional: reset jam ke default partner, atau bisa dikosongkan jika ingin user isi manual
              open_time: hour.open_time,
              close_time: hour.close_time,
              is_open: hour.is_open,
            }))
          : [], // Jika tidak ada, biarkan kosong (Supabase akan isi default saat insert)
      },
      ...prev,
    ]);
    setEditing(0);
  };

  const handleStaffChange = (idx, field, value) => {
    setStaffs((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  };

  const handleDeleteStaff = async (idx) => {
    const staff = staffs[idx];
    if (!staff?.id) {
      setStaffs((prev) => prev.filter((_, i) => i !== idx));
      setEditing(null);
      return;
    }
    if (!window.confirm("Mneghapus staff ini akan membatalkan semua booking yang terkait dengan staff ini! yakin untuk menghapusya?")) return;
    setLoading(true);
    const { error } = await staffService.deleteStaff(staff.id);
    setLoading(false);
    if (error) {
      alert(error.message || "Gagal hapus staf");
      return;
    }
    setStaffs((prev) => prev.filter((_, i) => i !== idx));
    setEditing(null);
  };

  const handleSaveStaff = async (idx) => {
    const staff = staffs[idx];
    if (!staff) return;
    setLoading(true);
    if (!staff.id) {
      const { data, error } = await staffService.addStaff(staff);
      setLoading(false);
      if (error) {
        alert(error.message || "Gagal tambah staf");
        return;
      }
      setStaffs((prev) =>
        prev.map((s, i) => (i === idx ? data : s))
      );
    } else {
      const { data, error } = await staffService.updateStaff(staff.id, staff);
      setLoading(false);
      if (error) {
        alert(error.message || "Gagal update staf");
        return;
      }
      setStaffs((prev) =>
        prev.map((s, i) => (i === idx ? data : s))
      );
    }
    setEditing(null);
  };

  const updateStaffOpeningHour = (staffIdx, dayIdx, field, value) => {
    setStaffs((prev) =>
      prev.map((staff, i) =>
        i === staffIdx
          ? {
              ...staff,
              opening_hours: staff.opening_hours.map((hour, d) =>
                d === dayIdx ? { ...hour, [field]: value } : hour
              ),
            }
          : staff
      )
    );
  };

  return {
    profile,
    staffs,
    loading,
    editing,
    setEditing,
    handleAddStaff,
    handleStaffChange,
    handleDeleteStaff,
    handleSaveStaff,
    updateStaffOpeningHour,
  };
}