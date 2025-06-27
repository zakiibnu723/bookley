import React from "react";
import { Clock, Star } from "lucide-react";

export default function TabSelector({ tab, setTab, activeCount, historyCount }) {
  return (
    <div role="tablist" className="tabs text-sm tabs-boxed rounded-lg bg-base-100 p-2 mb-4">
      <button
        role="tab"
        className={`tab flex-1 rounded-lg ${tab === "active" ? "tab-active bg-base-300" : ""}`}
        onClick={() => setTab("active")}
      >
        <Clock className="w-4 h-4 mr-1" />
        Aktif ({activeCount})
      </button>
      <button
        role="tab"
        className={`tab flex-1 rounded-lg ${tab === "history" ? "tab-active bg-base-300" : ""}`}
        onClick={() => setTab("history")}
      >
        <Star className="w-4 h-4 mr-1" />
        Riwayat ({historyCount})
      </button>
    </div>
  );
}