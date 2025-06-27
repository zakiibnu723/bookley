import TimeSlotButton from "./TimeSlotButton";
import SlotLegend from "./SlotLegend";

export default function TimeSlotGrid({ slots, selectedSlot, setSelectedSlot, partnerType }) {
  if (slots.length === 1 && slots[0].reason === "partner_closed") {
    let closedMsg = "Layanan tidak tersedia, karena sedang tutup.";
    if (partnerType === "barbershop") {
      closedMsg = "Slot tidak tersedia, karena barbershop sedang libur pada tanggal ini.";
    } else if (partnerType === "salon") {
      closedMsg = "Slot tidak tersedia, karena salon sedang libur pada tanggal ini.";
    }
    return (
      <p className="text-gray-400 mb-2">
        {closedMsg}
      </p>
    );
  }
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-400">Waktu Tersedia</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {slots.map((slot, idx) => (
          <TimeSlotButton
            key={slot.time}
            slot={slot}
            selected={selectedSlot === idx}
            onSelect={() => slot.available && setSelectedSlot(idx)}
          />
        ))}
      </div>
      <SlotLegend />
    </div>
  );
}