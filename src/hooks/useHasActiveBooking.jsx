'use client'
import { useEffect, useState } from "react";

export default function useHasActiveBooking() {
  const [hasActiveBooking, setHasActiveBooking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const data = localStorage.getItem("confirmed_bookings");
    if (!data) return setHasActiveBooking(false);

    let bookings = [];
    try {
      bookings = JSON.parse(data) || [];
    } catch {
      bookings = [];
    }

    if (!Array.isArray(bookings) || bookings.length === 0) {
      setHasActiveBooking(false);
      return;
    }

    const now = new Date();
    const active = bookings.some(({ date, start }) => {
      const [h = 0, m = 0] = (start || "00:00").split(":").map(Number);
      const bookingDate = new Date(date);
      bookingDate.setHours(h, m, 0, 0);
      return bookingDate >= now;
    });

    setHasActiveBooking(active);
  }, []);

  return hasActiveBooking;
}