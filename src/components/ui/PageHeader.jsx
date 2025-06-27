import React from "react";
import { useRouter } from "next/navigation";

/**
 * Reusable PageHeader component
 * @param {string} title - Judul halaman
 * @param {string} subtitle - Subjudul/desk halaman
 * @param {boolean} showBack - Tampilkan tombol back
 * @param {function} onBack - Handler tombol back (opsional)
 * @param {React.ReactNode} right - Konten kanan (opsional)
 */
export default function PageHeader({ title, subtitle, showBack = true, onBack, right }) {
  const router = useRouter();

  return (
    <div className="mb-6 flex gap-4 items-center">
      {showBack && (
        <button
          className="btn btn-ghost btn-sm text-neutral h-9 w-9 p-0"
          onClick={onBack ? onBack : () => router.back()}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div>
        <h1 className="text-xl font-semibold text-neutral">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}