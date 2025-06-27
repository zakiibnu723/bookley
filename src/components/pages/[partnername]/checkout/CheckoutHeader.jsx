export default function CheckoutHeader({ onBack }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <button className="btn btn-ghost btn-sm text-neutral h-9 w-9 p-0" onClick={onBack}>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div>
        <h1 className="text-xl font-semibold text-neutral">Konfirmasi Booking</h1>
        <p className="text-sm text-gray-400">Periksa kembali detail booking Anda</p>
      </div>
    </div>
  );
}
