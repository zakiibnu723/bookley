import React from "react";
import BookingCard from "../../ui/BookingCard";
import { Calendar, Star } from "lucide-react";

export default function BookingList({ bookings, isHistory, headerType = "partner" }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="card bg-base-100 p-10 text-center">
        {isHistory ? (
          <>
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Belum ada riwayat booking</h3>
            <p className="text-gray-400">Booking yang sudah selesai akan muncul di sini.</p>
          </>
        ) : (
          <>
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Tidak ada booking aktif</h3>
            <p className="text-gray-400 mb-2">
              Anda belum memiliki booking yang akan datang. Booking layanan sekarang!
            </p>
            <button className="btn btn-primary btn-sm">Booking Baru</button>
          </>
        )}
      </div>
    );
  }

  // Tampilkan booking terbaru di atas
  return (
    <>
      {[...bookings].map((booking, idx) => (
        <BookingCard
          key={booking.booking_id || booking.id || idx}
          booking={booking}
          isHistory={isHistory}
          headerType={headerType}
        />
      ))}
    </>
  );
}