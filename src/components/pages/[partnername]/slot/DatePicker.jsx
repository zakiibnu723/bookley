import React, { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { getNextDateStrings, formatDateID, getDayName } from "@/utils/date";

export default function DatePicker({ selectedDate, setSelectedDate, partner }) {
  const datesString = getNextDateStrings(7);
  const today = new Date(datesString[0]);

  // Set default selectedDate ke hari ini jika belum ada
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(datesString[0]);
    }
    // eslint-disable-next-line
  }, []);

  // Helper: cek apakah hari ini tutup
  function isClosed(d) {
    if (!partner?.opening_hours) return false;
    const dayName = getDayName(d); // gunakan utils
    const dayObj = partner.opening_hours.find((h) => h.day === dayName);
    return dayObj && !dayObj.is_open;
  }

  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function checkScroll() {
      setShowArrow(el.scrollWidth - el.scrollLeft - el.clientWidth > 8);
    }
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="mb-6 relative">
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 2v4M8 2v4M3 10h18"
          />
        </svg>
        <span className="text-sm font-medium text-neutral">
          {formatDateID(new Date(selectedDate), today)}
        </span>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto no-scrollbar p-1"
        >
          {datesString.map((date) => {
            const label = formatDateID(new Date(date), today);
            const closed = isClosed(new Date(date));
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`btn btn-sm rounded-full flex flex-col gap-0 leading-2.5 ${
                  selectedDate === date
                    ? "btn-primary text-white"
                    : closed
                    ? "btn-ghost text-gray-300 border border-base-300"
                    : "btn-ghost text-neutral border border-base-300"
                }`}
                disabled={closed}
                type="button"
              >
                {label}
                {closed && (
                  <span className="block text-[10px] text-grey-300 mt-1">(Tutup)</span>
                )}
              </button>
            );
          })}
        </div>
        {showArrow && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-2 pointer-events-none py-6 bg-base-200">
            <ChevronRight className="w-6 h-6 text-gray-400 " />
          </div>
        )}
      </div>
    </div>
  );
}