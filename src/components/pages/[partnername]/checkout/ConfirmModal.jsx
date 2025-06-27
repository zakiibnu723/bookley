export default function ConfirmModal({ open, onClose, onConfirm, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
      <div className="bg-base-100 rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-2 text-neutral">Konfirmasi Booking</h2>
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          Pastikan semua data sudah benar sebelum melanjutkan. Booking yang sudah dikonfirmasi tidak dapat diubah.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-primary btn-outline flex-1 sm:w-auto"
            onClick={onClose}
            disabled={loading}
          >
            Cek Lagi
          </button>
          <button
            className="btn btn-primary flex-1 sm:w-auto"
            onClick={onConfirm}
            disabled={loading}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}