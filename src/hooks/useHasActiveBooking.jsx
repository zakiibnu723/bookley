'use client'
import { useEffect, useState } from "react";

export default function useBookingStatus() {
  const [hasActiveBooking, setHasActiveBooking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const confirmedBookingsData = localStorage.getItem("confirmed_bookings");
      if (confirmedBookingsData) {
        const bookingsObject = JSON.parse(confirmedBookingsData);
        const bookings = Array.isArray(bookingsObject)
          ? bookingsObject
          : Object.values(bookingsObject);
        const now = new Date();

        const foundActive = bookings.some((booking) => {
          const bookingDate = new Date(booking.date);
          const [hours, minutes] = booking.start.split(":").map(Number);
          bookingDate.setHours(hours, minutes, 0, 0);
          return bookingDate.getTime() >= now.getTime();
        });


        setHasActiveBooking(foundActive);
      } else {
        setHasActiveBooking(false);
      }
    } catch {
      setHasActiveBooking(false);
    }
  }, []);

  return { hasActiveBooking };
}