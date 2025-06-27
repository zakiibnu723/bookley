"use client";
import ExploreListPage from "@/components/explore/ExploreListPage";
import { CITIES } from "@/data/dummy";

export default function SalonPage() {
  return (
    <ExploreListPage
      title="Cari Salon"
      tagline="Temukan dan booking salon terbaik di wilayah Yogyakarta"
      cities={CITIES}
      type={"salon"}
    />
  );
}