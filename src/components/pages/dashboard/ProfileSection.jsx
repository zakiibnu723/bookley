"use client";
import React from "react";
import { Upload, X, MapPin, Clock, Plus } from "lucide-react";

export default function ProfileSection({
  profileState,
  editing,
  loading,
  handleProfileChange,
  handleEditProfile,
  handleCancelEditProfile,
  handleSaveProfile,
  handleProfilePhotoChange,
  handleAddCoverImage,
  handleRemoveCoverImage,
  updateOpeningHour,
}) {
  return (
    <div className={`${!editing? "" : "" } text-neutral bg-base-100 rounded-xl shadow p-4 space-y-6`}>
      <h2 className="text-lg font-bold text-primary">Profil Barbershop</h2>

      {/* Foto Profil */}
      <div className={`flex items-center gap-6 px-1 ${!editing? "opacity-35" : "" }`}>
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={profileState.photo || "/default-profile.jpg"} alt="Profil" />
          </div>
        </div>
        <div>
          <label className="btn btn-outline btn-sm gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            Ganti Foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhotoChange}
              disabled={!editing}
              autoComplete="off"
            />
          </label>
          <div className="text-xs text-gray-400 mt-1">JPG, PNG, GIF (max. 5MB)</div>
        </div>
      </div>

      {/* Cover Images */}
      <div className={`${!editing? "opacity-45" : "" }`}>
        <div className="font-semibold mb-2 flex items-center gap-2">
          <Upload className="w-4 h-4" /> Cover Photos
        </div>
        <div className={`flex gap-2 flex-wrap`}>
          {(profileState.cover_images || []).map((img, idx) => (
            <div key={idx} className="relative group ">
              <img
                src={img}
                alt={`Sampul ${idx + 1}`}
                className="w-26 h-16 md:w-32 md:h-20 object-cover rounded-md border shadow"
              />
              {editing && (
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-error opacity-0 group-hover:opacity-100 transition"
                  onClick={() => handleRemoveCoverImage(idx)}
                  title="Hapus"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <label className="flex flex-col items-center justify-center w-26 h-16 md:w-32 md:h-20 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-primary transition">
            <Plus className="w-6 h-6 text-primary" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAddCoverImage}
              disabled={!editing}
              autoComplete="off"
            />
          </label>
        </div>
      </div>

      {/* Informasi Dasar */}
      <div className={`space-y-2 ${!editing? "opacity-55" : "" }`}>
        <div>
          <label className="label">
            <span className="label-text text-sm">Nama Barbersho/Salon</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Nama Barbershop/Salon"
            value={profileState.name || ""}
            onChange={handleProfileChange}
            readOnly={!editing}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-sm">Username</span>
          </label>
          <input
            type="text"
            name="username"
            className="input input-bordered w-full"
            placeholder="Username"
            value={profileState.username || ""}
            onChange={handleProfileChange}
            readOnly={!editing}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="label flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="label-text text-sm">Nama Jalan/Kecamatan</span>
          </label>
          <input
            type="text"
            name="location"
            className="input input-bordered w-full"
            placeholder="Nama Jalan/kecamatan"
            value={profileState.location || ""}
            onChange={handleProfileChange}
            readOnly={!editing}
            autoComplete="off"
          />
        </div>
        {/* Input City */}
        <div>
          <label className="label">
            <span className="label-text text-sm">Kota/Kabupaten</span>
          </label>
          <input
            type="text"
            name="city"
            className="input input-bordered w-full"
            placeholder="Kota/Kabupaten"
            value={profileState.city || ""}
            onChange={handleProfileChange}
            readOnly={!editing}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-sm">Link Google Maps</span>
          </label>
          <input
            type="text"
            name="maps_link"
            className="input input-bordered w-full"
            placeholder="Contoh: https://www.google.com/maps/place/..."
            value={profileState.maps_link || ""}
            onChange={handleProfileChange}
            readOnly={!editing}
            autoComplete="off"
          />
          <div className="text-xs text-gray-400 mt-1">
            Masukkan link Google Maps yang panjang! bukan yang pendek.
            <br />
            Contoh: <span className="underline">https://www.google.com/maps/place/...</span>
          </div>
        </div>
      </div>

      {/* Jam Operasional */}
      <div className={`${!editing? "opacity-55" : "" }`}>
        <div className="font-semibold mb-4 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4" /> Jam Operasional
        </div>
        <div className={`space-y-4 text-xs sm:text-sm text-neutral`}>
          {(profileState.opening_hours || []).map((hour, idx) => (
            <div key={hour.day} className="flex flex-col gap-1">
              <div className="flex sm:flex-row sm:items-center gap-2 sm:gap-3 w-full">
                <div className="flex items-center gap-3 min-w-[110px]">
                  <span className="font-medium w-10 md:w-16">{hour.day}</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-xs sm:toggle-sm toggle-primary"
                    checked={hour.is_open}
                    onChange={e => updateOpeningHour(idx, "is_open", e.target.checked)}
                    disabled={!editing}
                  />
                  <span className={`badge badge-xs sm:badge-sm ${hour.is_open ? "badge-primary" : "badge-ghost"}`}>
                    {hour.is_open ? "Buka" : "Tutup"}
                  </span>
                </div>
                {hour.is_open && (
                  <div className="flex xs:flex-row flex-1 items-start xs:items-center gap-2 ml-0 sm:ml-4 w-full max-w-xs">
                    <input
                      type="time"
                      className="input input-bordered w-full xs:w-24"
                      value={hour.open_time}
                      onChange={e => updateOpeningHour(idx, "open_time", e.target.value)}
                      disabled={!editing}
                    />
                    <span className="hidden xs:inline">-</span>
                    <input
                      type="time"
                      className="input input-bordered w-full xs:w-24"
                      value={hour.close_time}
                      onChange={e => updateOpeningHour(idx, "close_time", e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                )}
              </div>
              {/* {idx < 6 && <div className="divider my-1" />} */}
            </div>
          ))}
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex gap-2 mt-2 justify-end">
        {!editing ? (
          <button className="btn btn-outline text-primary" onClick={handleEditProfile}>
            Edit Profil
          </button>
        ) : (
          <>
            <button
              className="btn btn-primary"
              onClick={handleSaveProfile}
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner loading-xs"></span>}
              Simpan
            </button>
            <button
              className="btn btn-ghost"
              onClick={handleCancelEditProfile}
              disabled={loading}
            >
              Batal
            </button>
          </>
        )}
      </div>
    </div>
  );
}