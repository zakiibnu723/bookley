export default function SelectedServiceInfo({ service, totalDuration }) {

  return (
    <>
      <div className="bg-base-100 rounded-lg border border-gray-400 p-4 mb-6">
        <h3 className="font-medium text-neutral mb-2">Layanan dipilih:</h3>
        <ul className="mb-2">
          {service.map((s) => (
            <li key={s.id} className="text-neutral text-sm">
              {s.name} <span className="text-gray-500">({s.duration} menit)</span>
            </li>
          ))}
        </ul>
        <div className="text-sm text-gray-600">
          Total durasi: <span className="font-semibold text-neutral">{totalDuration} menit</span>
        </div>
      </div>
      {/* <div className="flex flex-col gap-0">
        {services.map((s, idx) => (
          <div key={s.name} className="bg-base-100 rounded-lg border border-base-300 p-4 mb-2">
            <h3 className="font-medium text-neutral">{s.name}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <div className="flex items-center gap-1">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />
                </svg>
                <span>{s.duration} menit</span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="font-medium text-neutral">{s.price}</span>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}