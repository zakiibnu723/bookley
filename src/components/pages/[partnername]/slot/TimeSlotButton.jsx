export default function TimeSlotButton({ slot, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      disabled={!slot.available}
      className={`
        p-3 rounded-lg bg-base-100 border text-sm font-medium transition-all
        ${
          selected
            ? "border-primary text-primary border-1 scale-[0.95]"
            : slot.available
            ? "bg-base-100 border-gray-400 text-neutral hover:border-primary hover:text-primary"
            : "bg-base-300 border-gray-400 text-gray-400 cursor-not-allowed"
        }
      `}
    >
      <div className="text-center">
        <div className="font-medium">{slot.time}</div>
        <div className="text-xs opacity-70 mt-1">
          {slot.available ? `- ${slot.end}` : "Booked"}
        </div>
      </div>
    </button>
  );
}