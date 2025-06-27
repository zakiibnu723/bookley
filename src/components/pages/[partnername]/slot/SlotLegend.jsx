
export default function SlotLegend() {
  return (
    <div className="mt-8 pt-6 pb-24 border-t w-full border-base-300">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-base-100 border-2 border-base-300 rounded"></div>
          <span>Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 bg-base-100 rounded"></div>
          <span>Dipilih</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-base-300 border-2 border-base-300 rounded"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}