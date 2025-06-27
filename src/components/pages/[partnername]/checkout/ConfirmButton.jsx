export default function ConfirmButton({ onClick, loading, disabled }) {
  return (
    <button
      className="btn btn-primary w-full h-12 text-base font-medium mt-2"
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? "Memproses..." : "Konfirmasi dan Booking"}
    </button>
  );
}