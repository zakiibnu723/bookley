"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import TabSelector from "@/components/pages/mybookings/TabSelector";
import BookingList from "@/components/pages/mybookings/BookingList";
import { fetchStaffById } from "@/services/staffService";
import LoadingComponent from "@/components/ui/loading/LoadingComponent";

export default function MyBookingsCustomer() {
  const [tab, setTab] = useState("active");
  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function processBookings() {
      if (typeof window === "undefined") return;

      let bookings = [];
      const confirmedBookingsData = localStorage.getItem("confirmed_bookings");
      if (confirmedBookingsData) {
        let bookingsObject = JSON.parse(confirmedBookingsData);
        bookings = Array.isArray(bookingsObject)
          ? bookingsObject
          : Object.values(bookingsObject);
      }
      const now = new Date();
      const active = [];
      const history = [];

      // Cek staff_id untuk setiap active booking
      await Promise.all(
        bookings.map(async (booking) => {
          const bookingDate = new Date(booking.date);
          const [hours, minutes] = (booking.start || "00:00").split(":").map(Number);
          bookingDate.setHours(hours, minutes, 0, 0);

          if (bookingDate.getTime() >= now.getTime() && booking.staff_id) {
            const { data: staffData } = await fetchStaffById(booking.staff_id);
            if (!staffData) {
              booking.staff_id = null;
            }
          }

          if (bookingDate.getTime() < now.getTime()) {
            history.push(booking);
          } else {
            active.push(booking);
          }
        })
      );

      active.sort((a, b) => new Date(`${a.date}T${a.start}`) - new Date(`${b.date}T${b.start}`));
      history.sort((a, b) => new Date(`${b.date}T${b.start}`) - new Date(`${a.date}T${a.start}`));
      setActiveBookings(active);
      setHistoryBookings(history);
      setLoading(false);
    }

    processBookings();
  }, []);

  if (loading) return <LoadingComponent />

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <PageHeader
        title="Booking Saya"
        subtitle="Kelola dan lihat riwayat booking Anda"
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
        headerType="partner"
      />
    </div>
  );
}