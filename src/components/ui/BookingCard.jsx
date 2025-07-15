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

  const canceled = !booking.staff_id;
  
  // Check if booking is today or tomorrow for highlighting
  const bookingDate = new Date(booking.date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const isToday = bookingDate.toDateString() === today.toDateString();
  const isTomorrow = bookingDate.toDateString() === tomorrow.toDateString();
  const isUpcoming = !isHistory && !canceled && (isToday || isTomorrow);
  
  // Handler klik partner
  const handleClickPartner = () => {
    if (booking.partner_username || booking.partner?.username) {
      router.push(`/${booking.partner_username || booking.partner?.username}`);
    }
  };

  return (
    <div className={`card relative bg-base-100 shadow-sm border border-base-200 mb-2 md:mb-4 rounded-lg max-w-full overflow-hidden`}>
      {/* Badge Status - Mobile Responsive */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col items-end gap-1 z-10">
        <span className="text-[8px] text-warning md:text-[10px]">
          {canceled? "Alasan: Staff sudah tidak ada" : ""}
        </span>
        <span className={`badge opacity-100 ${canceled? "badge-error" : isHistory ? "badge-soft" : "badge-accent"} text-xs`}>
          {canceled ? "canceled" : isHistory ? "Selesai" : "Aktif"}
        </span>
      </div>

      <div className={`card-body p-2 md:p-4 ${canceled ? 'opacity-60' : ''}`}>
        {/* Mobile: Horizontal Compact Layout */}
        <div className="flex flex-col gap-2 md:hidden">
          {/* Header with Avatar and Name */}
          <div className="flex items-center gap-2">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              {headerType === "partner" ? (
                <div onClick={handleClickPartner} title="Lihat profil partner" className="cursor-pointer">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full border border-gray-300">
                      <img
                        src={booking.partner_photo || booking.partner?.photo || "/default-profile.jpg"}
                        alt={booking.partner_name || booking.partner?.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>

            {/* Name and Basic Info */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-xs text-neutral truncate">
                {headerType === "partner" 
                  ? (booking.partner_name || booking.partner?.name)
                  : (booking.name || "-")
                }
              </div>
              {/* Show phone for customer booking */}
              {headerType === "customer" && booking.phone && (
                <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                  <Phone className="w-2 h-2" />
                  <span>{booking.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                <div className="flex items-center gap-0.5">
                  <Calendar className="w-2 h-2" />
                  <span>{new Date(booking.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</span>
                </div>
                <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
                  isToday ? 'bg-primary/10 text-primary font-semibold' : 
                  isTomorrow ? 'bg-warning/10 text-warning font-medium' : 
                  'text-gray-500'
                }`}>
                  <Clock className="w-2 h-2" />
                  <span>{start}-{end}</span>
                  {isToday && <span className="ml-1 text-[8px] font-bold">HARI INI</span>}
                  {isTomorrow && <span className="ml-1 text-[8px] font-medium">BESOK</span>}
                </div>
                <div className="flex items-center gap-0.5">
                  <User className="w-2 h-2" />
                  <span className="truncate">{staffName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="bg-base-200 rounded p-2">
            <div className="text-[10px] text-gray-500 font-semibold mb-1">Layanan:</div>
            <div className="space-y-1">
              {services.map((s, idx) => (
                <div key={s.id || idx} className="flex justify-between items-center text-[10px]">
                  <div className="flex items-center gap-1">
                    <Scissors className="w-2.5 h-2.5 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-neutral font-medium">{s.name}</span>
                      <span className="text-gray-400">{s.duration} menit</span>
                    </div>
                  </div>
                  <span className="font-medium text-gray-600">{formatPrice(s.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Price at Bottom */}
          <div className="flex justify-between items-center pt-1 border-t border-base-300">
            <span className="text-xs text-gray-500 font-semibold">Total:</span>
            <span className="font-bold text-primary text-sm">
              {formatPrice(getTotalPrice(services))}
            </span>
          </div>

          {/* Customer Note - Show in mobile if exists */}
          {headerType === "customer" && booking.note && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[10px]">
              <span className="font-semibold text-yellow-700">Catatan:</span>
              <span className="ml-1 text-yellow-600">{booking.note}</span>
            </div>
          )}
        </div>

        {/* Desktop: Original Full Layout */}
        <div className="hidden md:block">
          <div className="flex items-center gap-3 mb-4">
            {headerType === "partner" ? (
              <div onClick={handleClickPartner} title="Lihat profil partner" className="cursor-pointer flex items-center gap-3">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full border border-gray-300">
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
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{booking.partner_location}, {booking.partner_city}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <div className="font-bold text-lg text-neutral">
                    {booking.name || "-"}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{booking.phone || "-"}</span>
                  </div>
                  {booking.note && (
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="font-semibold">Note:</span> {booking.note}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="divider my-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 flex flex-col gap-2 bg-base-200 rounded">
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
                  <span className={`font-medium px-2 py-1 rounded ${
                    isToday ? 'bg-primary/10 text-primary font-bold' : 
                    isTomorrow ? 'bg-warning/10 text-warning font-semibold' : 
                    'text-neutral'
                  }`}>
                    {start} - {end}
                    {isToday && <span className="ml-2 text-xs font-bold text-primary">HARI INI</span>}
                    {isTomorrow && <span className="ml-2 text-xs font-medium text-warning">BESOK</span>}
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
              <div className="p-4 bg-base-200 rounded">
                <div className="font-semibold text-xs text-gray-500 mb-2">Layanan:</div>
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
        </div>
      </div>
    </div>
  );
}