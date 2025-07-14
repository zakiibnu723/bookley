export default function ServicesInfo({ services, totalDuration, totalPrice }) {
  return (
    <div className="bg-base-100 rounded-lg border-1 border-gray-200 p-4 mb-6">
      <h3 className="font-medium text-neutral mb-2">Layanan dipilih:</h3>
      <ul className="mb-2">
        {services.map((s) => (
          <li key={s.id} className="flex justify-between text-neutral text-sm">
            <span>
              {s.name} <span className="text-gray-500">({s.duration} menit)</span>
            </span>
            <span className="font-medium text-neutral">Rp {s.price?.toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>Total durasi:</span>
        <span className="font-semibold text-neutral">{totalDuration} menit</span>
      </div>
      <div className="flex justify-between text-base font-semibold mt-2">
        <span className="text-neutral">Total harga:</span>
        <span className="text-primary">Rp {totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
}