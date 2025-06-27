import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { fetchBookingsByPartner } from "@/services/bookingService";
import { Inbox } from "lucide-react";

export default function PartnerBookingNotifButton() {
  const { profile } = useUser();
  const router = useRouter();
  const [activeCount, setActiveCount] = useState(0);
  const [hasCanceled, setHasCanceled] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function fetchActive() {
      if (!profile?.id) return;
      const { data, error } = await fetchBookingsByPartner(profile.id);
      if (error) return;
      const now = new Date();
      const active = (data || []).filter((booking) => {
        const bookingDate = new Date(booking.date);
        const [hours, minutes] = (booking.start || "00:00").split(":").map(Number);
        bookingDate.setHours(hours, minutes, 0, 0);
        return bookingDate.getTime() >= now.getTime();
      });
      const canceled = (data || []).some((booking) => booking.staff_id == null);
      if (!ignore) {
        setActiveCount(active.length);
        setHasCanceled(canceled);
      }
    }
    fetchActive();
    return () => { ignore = true; };
  }, [profile?.id]);

  return (
    <button
      type="button"
      className="btn btn-link relative p-2"
      aria-label="Booking Masuk"
      onClick={() => router.push("/dashboard/mybookings")}
    >
      <Inbox className="w-6 h-6 text-neutral" />
      {activeCount > 0 && (
        <span className="absolute top-1 right-1 min-w-5 h-5 px-1 rounded-full bg-accent border-2 border-accent text-xs text-white flex items-center justify-center font-bold">
          {activeCount}
        </span>
      )}
      {hasCanceled && (
        <span className="absolute top-1 left-1 w-3 h-3 rounded-full bg-error border-2 border-base-100"></span>
      )}
    </button>
  );
}