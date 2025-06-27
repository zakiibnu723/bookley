// Homepage.jsx
import React from "react";

export default function HomePage() {
  return (
    <div className="bg-base-200 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold text-primary mb-4">
          BookingAja
        </h1>
        <p className="text-lg md:text-xl text-neutral max-w-2xl mx-auto mb-6">
          Satu platform, semua bisa dipesan. Booking layanan favorit Anda secara cepat, mudah, dan tanpa ribet.
        </p>
        <a
          href="#layanan"
          className="btn btn-secondary btn-lg rounded-full"
        > 
          Cari Layanan
        </a>
      </section>

      {/* Kategori Layanan */}
      <section id="layanan" className="py-16 px-4">
        <h2 className="text-3xl text-neutral font-semibold text-center mb-10">
          Layanan Populer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Barbershop", desc: "Potong rambut tanpa antre. Booking tempat favoritmu sekarang!" },
            { title: "Klinik & Kesehatan", desc: "Jadwalkan pemeriksaan kesehatan Anda dalam hitungan detik." },
            { title: "Servis Rumah", desc: "Panggil teknisi profesional langsung ke rumah Anda dengan mudah." },
          ].map((item) => (
            <div key={item.title} className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-neutral">{item.title}</h3>
                <p className="text-secondary">{item.desc}</p>
                <div className="card-actions mt-4">
                  <button className="btn btn-accent rounded-full">
                    Booking Sekarang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
