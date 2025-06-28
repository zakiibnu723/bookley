import React from "react";
import { Calendar, Clock, MapPin, User, Scissors, Phone } from "lucide-react";
import { formatTimeNoSeconds } from "@/utils/time";
import { useRouter } from "next/navigation";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
function getTotalPrice(services) {
  return (services || []).reduce((total, service) => total + (service.price || 0), 0);
}

/**
 * BookingCard
 * @param {object} booking - booking data
 * @param {boolean} isHistory - show as history
 * @param {string} headerType - "customer" | "partner" (default: "partner")
 */
export default function BookingCard({ booking, isHistory = false, headerType = "partner" }) {
  const router = useRouter();
  // Gunakan start & end langsung, fallback ke slot jika ada legacy data
  const start = formatTimeNoSeconds(booking.start) || "-";
  const end = formatTimeNoSeconds(booking.end) || "-";
  const staffName = booking.staff_name || booking.staff?.name || "Staff";
  const services = booking.services || [];

  const canceled = !booking.staff_id
  console.log(booking.staff_id)
  // Handler klik partner
  const handleClickPartner = () => {
    if (booking.partner_username || booking.partner?.username) {
      router.push(`/${booking.partner_username || booking.partner?.username}`);
    }
  };

  return (
    <div className={`card relative bg-base-100 shadow-md border border-base-200 mb-4 `}>
      <div className="relative -mb-6 md:absolute md:mb-0 top-4 right-4 flex flex-col items-end gap-1">
        <span className="text-[8px] text-warning -mt-2 md:text-[10px]">
          {canceled? "Alasan: Staff sudah tidak ada" : ""}
        </span>
        <span className={`badge opacity-100 ${canceled? "badge-error" : isHistory ? "badge-ghost" : "badge-accent"} text-xs`}>
          {canceled ? "canceled" : isHistory ? "Selesai" : "Aktif"}
        </span>
      </div>
      <div className={`card-body p-4 ${canceled ? 'opacity-55' : ''}`}>
        <div className="flex items-start justify-between gap-5">
          <div className="flex items-center gap-3">
            {headerType === "partner" ? (
              <div onClick={handleClickPartner} title="Lihat profil partner" style={{ cursor: "pointer" }}>
                <div className="avatar">
                  <div className="md:w-14 md:h-14 w-11 h-11 rounded-full border border-gray-300">
                    <img
                      src={booking.partner_photo || booking.partner?.photo || "/default-profile.jpg"}
                      alt={booking.partner_name || booking.partner?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg text-neutral">
                    {booking.partner_name || booking.partner?.name}
                  </div>
                  <div className="flex items-center text-xs leading-3 text-gray-500 overflow-wrap gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{booking.partner_location}, {booking.partner_city}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-2 py-0 mt-0">
                <div className="font-bold text-lg text-neutral flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {booking.name || "-"}
                </div>
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <Phone className="w-3 h-3 mr-2" />
                  <span>{booking.phone || "-"}</span>
                </div>
                {booking.note && (
                  <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                    <span className="font-semibold">Catatan:</span>
                    <span>{booking.note}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="divider my-0" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 flex flex-col gap-2 bg-base-200">
            {/* Tanggal */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <div className="flex flex-col items-left text-neutral">
                <div className="text-xs text-gray-500">Tanggal:</div>
                <span className="font-medium">{formatDate(booking.date)}</span>
              </div>
            </div>
            {/* Jam */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <div className="flex flex-col items-left text-neutral">
                <div className="text-xs text-gray-500">Waktu:</div>
                <span className="font-medium">
                  {start} - {end}
                </span>
              </div>
            </div>
            {/* Staff */}
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <div className="flex flex-col items-left text-neutral">
                <div className="text-xs text-gray-500">Staff</div>
                <span>{staffName}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="p-4 bg-base-200">
              <div className="font-semibold text-xs text-gray-500 mb-1">Layanan:</div>
              <ul className="space-y-1">
                {services.map((s, idx) => (
                  <li key={s.id || idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-col">
                        <span className="text-neutral text-sm">{s.name}</span>
                        <span className="text-xs text-gray-400">{s.duration} menit</span>
                      </div>
                    </div>
                    <span className="font-medium text-sm text-gray-500">{formatPrice(s.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-md text-gray-500 font-semibold">Total: </span>
              <span className="font-bold text-primary text-lg">
                {formatPrice(getTotalPrice(services))}
              </span>
            </div>
          </div>
        </div>
        {/* 
        <div className="divider my-1" />
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>
            Booking ID: {(booking.booking_id || booking.id || "").toString().slice(0, 8)}...
          </span>
          {booking.created_at && (
            <span>
              Dibuat {new Date(booking.created_at).toLocaleString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div> */}
        {/* {!isHistory ? (
          <div className="flex gap-2 mt-3">
            <button className="btn btn-outline btn-sm flex-1">Reschedule</button>
            <button className="btn btn-error btn-sm flex-1">Batalkan</button>
          </div>
        ) : (
          <button className="btn btn-outline btn-sm w-full mt-3">
            <Star className="w-4 h-4 mr-2" />
            Beri Ulasan
          </button>
        )} */}
      </div>
    </div>
  );
}