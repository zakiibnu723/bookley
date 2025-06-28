import React from "react";
import { useRouter } from "next/navigation";
import { MapPin, Clock, CheckCircle, XCircle } from "lucide-react";

function getTodayOpening(opening_hours = []) {
  const dayIdx = new Date().getDay();
  return opening_hours?.[dayIdx] || {};
}

export function PartnerCard({ item }) {
  const router = useRouter();
  const cover = item.cover_images?.[0] || "https://placehold.co/600x200?text=Cover";
  const photo = item.photo || "https://placehold.co/80x80?text=Photo";
  const opening = getTodayOpening(item.opening_hours);
  const isOpen = opening?.is_open;

  const handleClick = () => {
    if (item.username) {
      router.push(`/${item.username}`);
    }
  };

  return (
    <div
      className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition p-2 cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      title={item.name}
    >
      <figure className="h-24 overflow-hidden rounded-md">
        <img
          src={cover}
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body gap-0 p-2">
        <div className="flex flex-col items-center gap-1 mb-1">
          <div className="w-full flex justify-between items-end -mt-8">
            <img
              src={photo}
              alt={item.name}
              className="w-10 h-10 rounded-full border border-base-200 object-cover"
            />
            <span className={`badge ${isOpen ? "badge-accent" : "badge-soft"} -mb-1 -mr-1 badge-xs scale-90`}>
              {isOpen ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Buka
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Tutup
                </span>
              )}
            </span>
          </div>
          <div className="w-full flex justify-between align-middle">
            <div className="font-semibold text-sm truncate">{item.name || item.username}</div>
          </div>
        </div>
        {/* Lokasi tampil jika ada salah satu location atau city */}
        {(item.location || item.city) && (
          <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
            <MapPin className="w-2.5 h-2.5" />
            <span className="truncate">
              {item.location ? item.location : ""}
              {item.location && item.city ? ", " : ""}
              {item.city ? item.city : ""}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[10px] text-gray-500 -mt-1">
          <Clock className="w-2.5 h-2.5" />
          {isOpen
            ? `${opening.open_time} - ${opening.close_time}`
            : "Tutup hari ini"}
        </div>
      </div>
    </div>
  );
}

export function PartnerCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md border border-base-200 p-2 animate-pulse">
      <figure className="h-24 overflow-hidden rounded-md bg-base-300" />
      <div className="card-body gap-0 p-2">
        <div className="flex flex-col items-center gap-2 mb-1">
          <div className="w-full flex justify-between items-end -mt-6">
            <div className="w-10 h-10 rounded-full bg-base-300" />
            <div className="badge badge-xs bg-base-300 w-12 h-4" />
          </div>
          <div className="w-full flex justify-between align-middle">
            <div className="h-4 bg-base-300 rounded w-2/3" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
          <div className="w-3 h-3 bg-base-300 rounded" />
          <div className="h-3 bg-base-300 rounded w-1/2" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 -mt-1">
          <div className="w-3 h-3 bg-base-300 rounded" />
          <div className="h-3 bg-base-300 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}