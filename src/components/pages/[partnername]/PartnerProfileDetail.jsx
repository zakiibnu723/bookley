"use client";
import React from "react";
import { Clock, MapPin, ExternalLink } from "lucide-react";
import { getEmbedMapUrl } from "@/utils/maps";

export default function PartnerProfileDetail({ partner, show, onClose }) {
  if (!partner) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300 text-neutral
        ${show ? "translate-x-0" : "-translate-x-full"}
        w-full max-w-xl bg-base-100 shadow-2xl overflow-y-scroll
      `}
      style={{ boxShadow: show ? "0 0 0 9999px rgba(0,0,0,0.3)" : "none" }}
    >
      {/* Konten detail partner */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {partner.name}
          </h1>
          <p className="text-neutral/60">Detail lokasi dan jam operasional</p>
        </div>

        {/* Lokasi & Maps */}
        <div className="card bg-base-100 shadow mb-6">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">{partner.location}, {partner.city}</span>
            </div>
            {partner.maps_link && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
                <iframe
                  src={getEmbedMapUrl(partner.maps_link)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Lokasi di Google Maps"
                />
              </div>
            )}
            <a
              href={partner.maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-primary btn-sm w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Buka di Google Maps
            </a>
          </div>
        </div>

        {/* Jam Operasional */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">Jam Operasional</span>
            </div>
            <div className="flex flex-col gap-2">
              {(partner.opening_hours || []).map((hour, idx) => {
                const todayIdx = new Date().getDay();
                const dayNames = [
                  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
                ];
                const isToday = dayNames[todayIdx] === hour.day;
                return (
                  <div
                    key={hour.day}
                    className={`
                      flex items-center justify-between rounded-lg px-4 py-2
                      ${isToday ? "bg-primary/10 border border-primary" : "bg-base-200"}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isToday ? "text-primary" : ""}`}>
                        {hour.day}
                      </span>
                      {/* {isToday && (
                        <span className="badge badge-outline badge-primary text-xs ml-1">
                          Hari ini
                        </span>
                      )} */}
                    </div>
                    <div>
                      {hour.is_open ? (
                        <span className={`font-semibold ${isToday ? "text-primary" : ""}`}>
                          {hour.open_time} - {hour.close_time}
                        </span>
                      ) : (
                        <span className="badge badge-soft text-gray-600 font-semibold">Tutup</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-circle btn-ghost absolute top-4 right-4"
        onClick={onClose}
        aria-label="Tutup"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}