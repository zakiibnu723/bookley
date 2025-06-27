"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import TabSelector from "@/components/pages/mybookings/TabSelector";
import BookingList from "@/components/pages/mybookings/BookingList";
import { fetchBookingsByPartner } from "@/services/bookingService";
import { useUser } from "@/context/UserContext";

export default function MyBookingsPartner() {
  const { profile, loading: userLoading } = useUser();
  const [tab, setTab] = useState("active");
  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tunggu sampai profile partner tersedia
    if (userLoading) return;

    const loadBookings = async () => {
      setLoading(true);
      const partner_id = profile?.id;
      if (!partner_id) {
        setActiveBookings([]);
        setHistoryBookings([]);
        setLoading(false);
        return;
      }
      const { data, error } = await fetchBookingsByPartner(partner_id);
      if (error) {
        setActiveBookings([]);
        setHistoryBookings([]);
        setLoading(false);
        return;
      }
      // Pisahkan active/history berdasarkan date & start
      const now = new Date();
      const active = [];
      const history = [];
      (data || []).forEach((booking) => {
        const bookingDate = new Date(booking.date);
        const [hours, minutes] = (booking.start || "00:00").split(":").map(Number);
        bookingDate.setHours(hours, minutes, 0, 0);
        if (bookingDate.getTime() < now.getTime()) {
          history.push(booking);
        } else {
          active.push(booking);
        }
      });
      active.sort((a, b) => new Date(`${a.date}T${a.start}`) - new Date(`${b.date}T${b.start}`));
      history.sort((a, b) => new Date(`${b.date}T${b.start}`) - new Date(`${a.date}T${a.start}`));
      setActiveBookings(active);
      setHistoryBookings(history);
      setLoading(false);
    };

    loadBookings();
  }, [profile, userLoading]);

  if (loading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <PageHeader
        title="Booking Masuk"
        subtitle="Lihat dan kelola booking customer yang masuk ke tempat Anda"
      />
      <TabSelector
        tab={tab}
        setTab={setTab}
        activeCount={activeBookings.length}
        historyCount={historyBookings.length}
      />
      <BookingList
        bookings={tab === "active" ? activeBookings : historyBookings}
        isHistory={tab === "history"}
        headerType="customer"
      />
    </div>
  );
}