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
          className="btn btn-ghost p-0 flex items-center gap-2"
          onClick={onBack ? onBack : () => router.back()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-1 text-neutral">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}