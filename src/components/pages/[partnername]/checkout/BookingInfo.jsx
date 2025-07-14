import { Calendar, Clock, User } from "lucide-react";

export default function BookingInfo({ date, slot, staff }) {
  return (
    <div className="bg-base-100 rounded-lg text-neutral border-1 border-gray-200 p-4 mb-6">
      <div className="flex flex-col gap-2">
        {/* Tanggal */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div className="flex flex-col items-left text-neutral">
            <div className="text-xs text-gray-500">Tanggal:</div>
            <span className="text-sm font-medium">
              {date
                ? new Date(date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </div>
        {/* Jam */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <div className="flex flex-col items-left text-neutral">
            <div className="text-xs text-gray-500">Waktu:</div>
            <span className="text-sm">
              {slot?.time || "-"} - {slot?.end || "-"}
            </span>
          </div>
        </div>
        {/* Staff */}
        {staff && (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <div className="flex flex-col items-left text-neutral">
              <div className="text-xs text-gray-500">Staff</div>
              <span className="text-sm">{staff.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}