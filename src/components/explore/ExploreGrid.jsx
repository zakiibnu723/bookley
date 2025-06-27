import React from "react";
import { PartnerCard, PartnerCardSkeleton } from "./PartnerCard";

export default function ExploreGrid({ items, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <PartnerCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.length === 0 && (
        <div className="col-span-2 text-center text-gray-400">Tidak ada data ditemukan.</div>
      )}
      {items.map(item => (
        <PartnerCard key={item.id} item={item} />
      ))}
    </div>
  );
}