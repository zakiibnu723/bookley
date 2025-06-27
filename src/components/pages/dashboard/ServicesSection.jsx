"use client";
import React from "react";

// DaisyUI Skeleton untuk satu card layanan
function ServiceEditSkeleton() {
  return (
    <div className="bg-base-200 rounded-lg p-3 flex flex-col gap-2 animate-pulse">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <div className="skeleton h-4 w-1/3 rounded"></div>
          <div className="skeleton h-6 w-12 rounded"></div>
        </div>
        <div className="skeleton h-3 w-1/2 rounded"></div>
        <div className="skeleton h-3 w-3/4 rounded"></div>
      </div>
    </div>
  );
}

export default function ServicesSection({
  services,
  editing,
  loading,
  setEditing,
  handleAddService,
  handleServiceChange,
  handleDeleteService,
  handleSaveService,
}) {
  // Validasi sebelum simpan layanan
  const validateService = (service) => {
    if (!service.name || service.name.trim() === "") {
      alert("Nama layanan tidak boleh kosong.");
      return false;
    }
    // if (!service.duration || Number(service.duration) <= 0) {
    //   alert("Durasi layanan harus diisi dan lebih dari 0.");
    //   return false;
    // }
    // if (!service.price || Number(service.price) <= 0) {
    //   alert("Harga layanan harus diisi dan lebih dari 0.");
    //   return false;
    // }
    return true;
  };

  // Wrapper untuk handleSaveService dengan validasi
  const handleSaveServiceWithValidation = (idx) => {
    const service = services[idx];
    if (!validateService(service)) return;
    handleSaveService(idx);
  };

  return (
    <div className="bg-base-100 rounded-xl shadow p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-primary">Layanan</h2>
        <button
          className="btn btn-accent btn-sm"
          onClick={handleAddService}
          disabled={editing !== null}
        >
          + Tambah
        </button>
      </div>
      <div className="space-y-4">
        {services.length === 0 && (
          <div className="text-center text-gray-400 italic py-8">
            Belum ada layanan terdaftar.
          </div>
        )}
        {services.map((service, idx) => {
          if (editing === idx && loading) {
            // Tampilkan skeleton hanya pada service yang sedang di-edit dan loading
            return <ServiceEditSkeleton key={service.id || idx} />;
          }
          if (editing === idx) {
            return (
              <div key={service.id || idx} className="bg-base-200 rounded-lg p-3 flex flex-col gap-2 mb-2">
                <div>
                  <label className="label">
                    <span className="label-text text-sm">Nama Layanan</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Nama Layanan"
                    value={service.name || ""}
                    onChange={e => handleServiceChange(idx, "name", e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="label">
                      <span className="label-text text-sm">Durasi (menit)</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      placeholder="Durasi (menit)"
                      value={service.duration || 0}
                      // min={0}
                      onChange={e => handleServiceChange(idx, "duration", e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="label">
                      <span className="label-text text-sm">Harga</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      placeholder="Harga"
                      value={service.price || 0}
                      min={0}
                      onChange={e => handleServiceChange(idx, "price", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-sm">Deskripsi</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Deskripsi"
                    value={service.desc || ""}
                    onChange={e => handleServiceChange(idx, "desc", e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-primary btn-sm flex-1"
                    onClick={() => handleSaveServiceWithValidation(idx)}
                  >
                    Simpan
                  </button>
                  {service.id ? (
                    <button className="btn btn-error btn-sm" onClick={() => handleDeleteService(idx)}>Hapus</button>
                  ) : null}
                  <button className="btn btn-ghost btn-sm text-neutral" onClick={() => {
                    if (!service.id) {
                      handleDeleteService(idx);
                    } else {
                      setEditing(null);
                    }
                  }}>Cancel</button>
                </div>
              </div>
            );
          }
          // Card tampilan biasa
          return (
            <div key={service.id || idx} className="bg-base-200 rounded-lg p-3 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-neutral">{service.name}</span>
                  <button className="btn btn-xs btn-outline text-primary" disabled={editing !== null} onClick={() => setEditing(idx)}>Edit</button>
                </div>
                <span className="text-xs text-gray-500">{service.duration} menit • Rp {service.price?.toLocaleString()}</span>
                <span className="text-xs text-gray-400">{service.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}