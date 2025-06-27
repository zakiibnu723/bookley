"use client";
import React from "react";

export default function StaffSection({
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
}) {
  // Validasi jam staf per hari
  const validateStaffDay = (staff, dayIdx) => {
    const staffDay = staff.opening_hours[dayIdx];
    const partnerDay = (profile.opening_hours || [])[dayIdx];
    if (!staffDay || !partnerDay) return false;
    if (staffDay.is_open) {
      if (staffDay.open_time < partnerDay.open_time) {
        alert(
          `Jam masuk staf hari ${staffDay.day} tidak boleh kurang dari jam buka barbershop.`
        );
        return false;
      }
      if (staffDay.close_time > partnerDay.close_time) {
        alert(
          `Jam pulang staf hari ${staffDay.day} tidak boleh lebih dari jam tutup barbershop.`
        );
        return false;
      }
      if (staffDay.open_time >= staffDay.close_time) {
        alert(`Jam masuk harus kurang dari jam pulang pada hari ${staffDay.day}.`);
        return false;
      }
    }
    return true;
  };

  // Validasi seluruh hari sebelum simpan
  const validateStaffAllDays = (staff) => {
    for (let i = 0; i < (staff.opening_hours || []).length; i++) {
      if (!validateStaffDay(staff, i)) return false;
    }
    return true;
  };

  // Wrapper untuk handleSaveStaff dengan validasi
  const handleSaveStaffWithValidation = (idx) => {
    const staff = staffs[idx];
    if (!staff.name || staff.name.trim() === "") {
      alert("Nama staf tidak boleh kosong.");
      return;
    }
    if (!validateStaffAllDays(staff)) return;
    handleSaveStaff(idx);
  };

  return (
    <div className="bg-base-100 rounded-xl shadow p-6 space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-primary">Staf</h2>
        <button
          className="btn btn-accent btn-sm"
          onClick={handleAddStaff}
          disabled={editing !== null}
        >
          + Tambah Staf
        </button>
      </div>
      <div className="space-y-4">
        {staffs.length === 0 && (
          <div className="text-center text-gray-400 italic py-8">
            Belum ada staf terdaftar.
          </div>
        )}
        {staffs.map((staff, idx) => {
          // Loading skeleton
          if (editing === idx && loading) {
            return (
              <div
                key={staff.id || idx}
                className="bg-base-200 rounded-lg p-4 flex flex-col gap-3 mb-2 opacity-60 pointer-events-none"
              >
                <div className="skeleton h-6 w-1/3 rounded mb-2"></div>
                {[...Array(7)].map((_, dIdx) => (
                  <div key={dIdx} className="flex gap-2 mb-1">
                    <span className="skeleton h-4 w-20 rounded"></span>
                    <span className="skeleton h-4 w-16 rounded"></span>
                    <span className="skeleton h-4 w-16 rounded"></span>
                  </div>
                ))}
              </div>
            );
          }
          // Edit mode
          if (editing === idx) {
            return (
              <div key={staff.id || idx} className="bg-base-200 rounded-lg p-5 flex flex-col gap-4 border border-primary/10">
                <div>
                  <label className="label">
                    <span className="label-text text-sm">Nama Staf</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder={`Nama Staf #${idx + 1}`}
                    value={staff.name}
                    onChange={e => handleStaffChange(idx, "name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="font-semibold mb-4 flex items-center gap-2">
                    Jam Kerja Per Hari
                  </div>
                  <div className="space-y-2">
                    {(staff.opening_hours || []).map((hour, dIdx) => {
                      const partnerDay = (profile.opening_hours || [])[dIdx] || {};
                      return (
                        <div key={hour.day} className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:gap-4">
                          <div className="flex items-center text-sm gap-3 min-w-[110px]">
                            <span className="font-medium w-20">{hour.day}</span>
                            <input
                              type="checkbox"
                              className="toggle toggle-sm toggle-primary"
                              checked={hour.is_open}
                              onChange={e =>
                                updateStaffOpeningHour(idx, dIdx, "is_open", e.target.checked)
                              }
                            />
                            <span className={`badge-sm badge ${hour.is_open ? "badge-primary" : "badge-ghost"}`}>
                              {hour.is_open ? "Aktif" : "Libur"}
                            </span>
                          </div>
                          {hour.is_open ? (
                            <div className="flex items-center gap-2 ml-0 sm:ml-4 w-full max-w-xs">
                              <input
                                type="time"
                                className="input input-bordered w-full xs:w-24"
                                value={hour.open_time}
                                min={partnerDay.open_time || "00:00"}
                                max={partnerDay.close_time || "23:59"}
                                onChange={e =>
                                  updateStaffOpeningHour(idx, dIdx, "open_time", e.target.value)
                                }
                                required
                              />
                              <span>-</span>
                              <input
                                type="time"
                                className="input input-bordered w-full xs:w-24"
                                value={hour.close_time}
                                min={partnerDay.open_time || "00:00"}
                                max={partnerDay.close_time || "23:59"}
                                onChange={e =>
                                  updateStaffOpeningHour(idx, dIdx, "close_time", e.target.value)
                                }
                                required
                              />
                            </div>
                          ) : (
                            // <span className="ml-2 text-error font-semibold">Tutup</span>
                            ''
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2 mt-2 justify-end">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSaveStaffWithValidation(idx)}
                  >
                    Simpan
                  </button>
                  {staff.id ? (
                    <button className="btn btn-error btn-sm" onClick={() => handleDeleteStaff(idx)}>Hapus</button>
                  ) : null}
                  <button className="btn btn-ghost btn-sm" onClick={() => {
                    if (!staff.id) {
                      handleDeleteStaff(idx);
                    } else {
                      setEditing(null);
                    }
                  }}>Batal</button>
                </div>
              </div>
            );
          }
          // View mode (bukan editing)
          return (
            <div
              key={staff.id || idx}
              className="bg-base-200 rounded-lg p-5 flex flex-col gap-2 border border-base-300 hover:shadow transition"
            >
              <div className="flex text-neutral justify-between items-center mb-1">
                <span className="font-semibold text-neutral">{staff.name}</span>
                <button
                  className="btn btn-xs btn-outline text-primary"
                  disabled={editing !== null}
                  onClick={() => setEditing(idx)}
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {(staff.opening_hours || []).map((hour, dIdx) => (
                  <div
                    key={hour.day}
                    className={`flex items-center text-sm gap-2 px-3 py-2 rounded ${
                      hour.is_open
                        ? "bg-neutral/5 text-neutral"
                        : "bg-gray-400/10 text-gray-400"
                    }`}
                  >
                    <span className="w-20">{hour.day}</span>
                    {hour.is_open ? (
                      <>
                        <span>{hour.open_time}</span>
                        <span>-</span>
                        <span>{hour.close_time}</span>
                      </>
                    ) : (
                      <span className="font-semibold">Libur</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}