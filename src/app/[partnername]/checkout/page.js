"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { addBooking, addBookingServices } from "@/services/bookingService";
import Error from "@/components/ui/Error";
import PageHeader from "@/components/ui/PageHeader";
import PartnerInfo from "@/components/pages/[partnername]/checkout/PartnerInfo";
import BookingInfo from "@/components/pages/[partnername]/checkout/BookingInfo";
import ServicesInfo from "@/components/pages/[partnername]/checkout/ServicesInfo";
import CustomerInfo from "@/components/pages/[partnername]/checkout/CustomerInfo";
import ConfirmButton from "@/components/pages/[partnername]/checkout/ConfirmButton";
import ConfirmModal from "@/components/pages/[partnername]/checkout/ConfirmModal";
import LoadingComponent from "@/components/ui/loading/LoadingComponent";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // Ambil bookingData dan customer dari localStorage hanya di client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("pending_booking");
      if (data) setBookingData(JSON.parse(data));

      const customer = localStorage.getItem("customer");
      if (customer) {
        const { name, phone } = JSON.parse(customer);
        setName(name || "");
        setPhone(phone || "");
      }
    }
    setLoading(false)
  }, []);

  if (loading) return <LoadingComponent />

  // Jika bookingData tidak ditemukan, tampilkan error
  if (!bookingData) {
    return (
      <Error
        title="Data booking tidak ditemukan"
        message="Silakan mulai proses booking dari awal."
        action={
          <button className="btn btn-primary mt-4" onClick={() => router.push("/")}>
            Kembali ke Beranda
          </button>
        }
      />
    );
  }

  const { services, date, slot, partner, staff } = bookingData;
  const totalPrice = services.reduce((sum, s) => sum + (s.price || 0), 0);
  const totalDuration = services.reduce((sum, s) => sum + (s.duration || 0), 0);

  // Handler submit booking ke Supabase
  const handleSubmitBooking = async () => {
    setLoading(true);
    try {
      const bookingPayload = {
        partner_id: partner.id,
        partner_name: partner.name,
        partner_username: partner.username,
        partner_photo: partner.photo,
        partner_location: partner.location || null,
        partner_city: partner.city || null,
        staff_id: staff ? staff.id : null,
        staff_name: staff ? staff.name : null,
        date,
        start: slot?.time,
        end: slot?.end,
        duration: totalDuration,
        total_price: totalPrice,
        name,
        phone,
        note,
        services: services.map(s => ({
          id: s.id,
          name: s.name,
          duration: s.duration,
          price: s.price,
        })),
      };

      const { data: booking, error } = await addBooking(bookingPayload);
      // Tambahan: cek error overlap dari trigger/function SQL
      if (error) {
        // Cek pesan error overlap dari trigger PostgreSQL
        if (
          error.message?.toLowerCase().includes("overlap") ||
          error.message?.toLowerCase().includes("booking overlap detected")
        ) {
          alert("Gagal booking: Slot waktu sudah terisi. Silakan pilih waktu lain.");
        } else {
          alert("Gagal booking: " + error.message);
        }
        setLoading(false);
        return;
      }
      if (!booking) throw new Error("Gagal booking");

      // const { error: bsError } = await addBookingServices(booking.id, services);
      // if (bsError) throw new Error(bsError.message);

      // Sukses: update localStorage
      setSuccess(true);
      localStorage.removeItem("pending_booking");

      // Simpan ke confirmed_bookings (array)
      const confirmed = JSON.parse(localStorage.getItem("confirmed_bookings") || "[]");
      confirmed.push({ ...bookingPayload, booking_id: booking.id, created_at: booking.created_at });
      localStorage.setItem("confirmed_bookings", JSON.stringify(confirmed));

      // Simpan customer info
      localStorage.setItem("customer", JSON.stringify({ name, phone }));

      setTimeout(() => {
        router.push(`/${partner.username}`);
      }, 2000);
    } catch (err) {
      alert("Gagal booking: " + err.message);
    }
    setLoading(false);
  };

  // Handler klik tombol konfirmasi (tampilkan modal)
  const handleConfirm = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  // Handler lanjutkan booking dari modal
  const handleModalLanjutkan = () => {
    setShowConfirmModal(false);
    handleSubmitBooking();
  };

  // Handler cek lagi (tutup modal)
  const handleModalCekLagi = () => {
    setShowConfirmModal(false);
  };

  

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Booking Berhasil!</h2>
          <p className="text-gray-500">Silakan datang sesuai jadwal.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4 md:p-6 pt-6 min-h-screen bg-base-200">
      {/* Header */}
      <PageHeader
        title="Konfirmasi Booking"
        subtitle="Periksa kembali detail booking Anda"
        showBack={true}
      />

      <PartnerInfo partner={partner} />
      <BookingInfo date={date} slot={slot} staff={staff} />
      <ServicesInfo services={services} totalDuration={totalDuration} totalPrice={totalPrice} />
      <CustomerInfo name={name} setName={setName} phone={phone} setPhone={setPhone} note={note} setNote={setNote} />

      {/* Confirm Button */}
      <ConfirmButton 
        onClick={handleConfirm} 
        loading={loading} 
        disabled={!name}
      />

      {/* Modal Konfirmasi */}
      <ConfirmModal
        open={showConfirmModal}
        onClose={handleModalCekLagi}
        onConfirm={handleModalLanjutkan}
        loading={loading}
      />
    </div>
  );
}