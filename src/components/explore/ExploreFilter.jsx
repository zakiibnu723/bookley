import React from "react";
import { Search } from "lucide-react";

export default function ExploreFilter({ search, setSearch, city, setCity, cities }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Cari..."
          className="input input-bordered rounded-full w-full pl-10 bg-transparent"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>
      <div className="flex gap-2 w-full md:w-auto justify-center md:justify-start">
        <button
          className={`btn btn-sm rounded-full px-4 ${city === "" ? "btn-primary text-white" : "btn-ghost border border-base-300 text-neutral"}`}
          onClick={() => setCity("")}
          type="button"
        >
          Semua
        </button>
        {cities.map(opt => (
          <button
            key={opt.value}
            className={`btn btn-sm rounded-full px-4 ${city === opt.value ? "btn-primary text-white" : "btn-ghost border border-base-300 text-neutral"}`}
            onClick={() => setCity(opt.value)}
            type="button"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}