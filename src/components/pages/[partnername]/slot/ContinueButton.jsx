export default function ContinueButton({ selectedSlot, slots, onContinue }) {
  if (selectedSlot === null) return null;
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-2 sm:px-4 md:px-6">
      <button className="btn btn-primary w-full h-12 text-base font-medium" onClick={onContinue}>
        Lanjutkan {slots[selectedSlot].time} - {slots[selectedSlot].end}
      </button>
    </div>
  );
}