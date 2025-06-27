"use client"
import { useEffect, useState } from "react";
import useHasActiveBooking from "./useHasActiveBooking";

export default function useShowMyBookingNotif() {
  const [showNotif, setShowNotif] = useState(false);
  const hasActiveBooking = useHasActiveBooking();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("mybookings_notif_seen");
    let timer;
    if (hasActiveBooking && !seen) {
      timer = setTimeout(() => {
        setShowNotif(true);
      }, 5000); // delay 4 detik
    }
    return () => clearTimeout(timer);
  }, [hasActiveBooking]);

  const hideNotif = () => {
    setShowNotif(false);
    localStorage.setItem("mybookings_notif_seen", "true");
  };

  return [showNotif, hideNotif];
}