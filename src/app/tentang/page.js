
export default function TentangPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-lg w-full bg-base-100 rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">Tentang BookingAja</h1>
        <p className="mb-2 text-base text-gray-700">
          <span className="font-semibold">BookingAja</span> adalah platform pemesanan barbershop modern yang memudahkan pelanggan untuk mencari, memilih layanan, dan melakukan booking secara online dengan cepat dan mudah.
        </p>
        <p className="mb-2 text-base text-gray-700">
          Kami hadir untuk membantu barbershop mengelola jadwal, layanan, staf, dan pelanggan secara efisien, serta memberikan pengalaman terbaik bagi pengguna.
        </p>
        <ul className="list-disc ml-5 text-gray-700 mb-4">
          <li>Booking layanan barbershop secara online</li>
          <li>Kelola jadwal dan staf dengan mudah</li>
          <li>Notifikasi & pengingat otomatis</li>
          <li>Desain mobile-first, cepat, dan aman</li>
        </ul>
        <div className="text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} BookingAja. All rights reserved.
        </div>
      </div>
    </div>
  );
}