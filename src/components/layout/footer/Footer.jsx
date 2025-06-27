import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-left p-8 bg-neutral text-neutral-content shadow-up-sm mt-auto">
      <div>
        <h2 className="text-xl font-semibold mb-2">#BookingAja Sekarang</h2>
        <p className="mb-2">Nikmati kemudahan layanan hanya dengan beberapa klik.</p>
        <p className="text-sm opacity-70">
          &copy; {new Date().getFullYear()} BookingAja. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
