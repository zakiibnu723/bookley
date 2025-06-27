export default function Error({ title = "Terjadi Kesalahan", message = "Silakan coba lagi.", action }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-500">{message}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}