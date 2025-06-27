"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, MapPin, User } from "lucide-react";


// Helper: cek apakah sekarang buka
function isOpenNow(opening_hours) {
  if (!opening_hours) return false;
  const now = new Date();
  const dayNames = [
    "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
  ];
  const today = dayNames[now.getDay()];
  const hourObj = opening_hours.find(d => d.day === today);
  if (!hourObj || !hourObj.is_open) return false;
  const [h, m] = [now.getHours(), now.getMinutes()];
  const nowStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  return hourObj.open_time <= nowStr && nowStr < hourObj.close_time;
}

export default function PartnerProfile({ partner, onShowDetail }) {
  const router = useRouter();
  const [coverIdx, setCoverIdx] = useState(0);
  const openNow = isOpenNow(partner.opening_hours);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoverIdx((idx) => (idx + 1) % partner.cover_images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [partner.cover_images.length]);

  const handleClick = () => {
    /// slide partnerprofiledetail
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative w-full h-32 md:h-52 rounded-b-2xl overflow-hidden">
        {partner.cover_images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Sampul ${idx + 1}`}
            className={`
              absolute inset-0 w-full h-full object-cover brightness-75 transition-opacity duration-2000
              ${coverIdx === idx ? "opacity-100 z-0" : "opacity-0 z-0"}
            `}
            style={{ transitionProperty: "opacity" }}
          />
        ))}
      </div>
      {/* Profile Info */}
      <div
        className="w-full max-w-3xl mx-auto flex px-4 flex-row items-center justify-between cursor-pointer"
        onClick={onShowDetail}
      >
        {/* Profile Picture */}
        <div className="w-24 h-24 -mt-3  relative shadow-lg rounded-full overflow-hidden border-3 border-base-300 mr-4">
          <img
            src={partner.photo || "/default-profile.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-1 justify-center">
          <span className="text-lg md:text-2xl font-bold text-neutral leading-tight">
            {partner.name}
          </span>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="badge badge-outline badge-sm">@{partner.username}</span>
            <span
              className={`badge badge-sm ${openNow ? "badge-accent" : "badge-soft"} gap-1`}
            >
              <Clock className="w-4 h-4" />
              {openNow ? "Buka" : "Sedang Tutup"}
            </span>
          </div>
          <span className="flex leading-3.5 items-center text-gray-400 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-neutral"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <circle cx="12" cy="11" r="3" />
            </svg>
            {partner.location}, {partner.city}
          </span>
        </div>
        <span className="mr-1 text-neutral">
          <button
            className="btn btn-circle btn-ghost w-fit"
            aria-label="Lihat detail"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </span>
      </div>
      {/* Spacer for floating info */}
      <div className="h-6" />
    </div>
  );
}