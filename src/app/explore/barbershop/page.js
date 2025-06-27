"use client";
import ExploreListPage from "@/components/explore/ExploreListPage";
import { CITIES } from "@/data/dummy";

export default function BarbershopPage() {
  return (
    <ExploreListPage
      title="Cari Barbershop"
      tagline="Temukan dan booking barbershop terbaik di wilayah Yogyakarta"
      cities={CITIES}
      type="barbershop"
    />
  );
}