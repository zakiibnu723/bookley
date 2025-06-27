import React, { useEffect, useState } from "react";
import ExploreHeader from "./ExploreHeader";
import ExploreFilter from "./ExploreFilter";
import ExploreGrid from "./ExploreGrid";
import { fetchPartners } from "@/services/partnerService";

export default function ExploreListPage({
  title,
  tagline,
  cities,
  type, // tambahkan props type
}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, [city, search, type]);

  async function fetchItems() {
    setLoading(true);
    const { data } = await fetchPartners({ city, search, type });
    setItems(data || []);
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 min-h-[700px]">
      <ExploreHeader title={title} tagline={tagline} />
      <ExploreFilter
        search={search}
        setSearch={setSearch}
        city={city}
        setCity={setCity}
        cities={cities}
      />
      <ExploreGrid items={items} loading={loading} />
    </div>
  );
}