"use client";
import React, { use, useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "@/components/pages/[partnername]/slot/DatePicker";
import TimeSlotGrid from "@/components/pages/[partnername]/slot/TimeSlotGrid";
import ContinueButton from "@/components/pages/[partnername]/slot/ContinueButton";
import SelectedServiceInfo from "@/components/pages/[partnername]/slot/SelectedServiceInfo";
import { fetchPartnerByUsername } from "@/services/partnerService";
import { fetchServicesByPartner } from "@/services/serviceService";
import { fetchStaffsByPartner } from "@/services/staffService";
import { fetchBookingsByPartnerInDates } from "@/services/bookingService";
import { generateTimeSlots } from "@/utils/time";
import { getDayName, getNextDateStrings } from "@/utils/date";
import Error from "@/components/ui/Error";
import LoadingComponent from "@/components/ui/loading/LoadingComponent";
import PageHeader from "@/components/ui/PageHeader";

export default function SlotPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const servicesParam = searchParams.get("services"); // "uuid1,uuid2"
  const { partnername } = React.use(params);

  // State
  const [partner, setPartner] = useState(null);
  const [services, setServices] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  // Generate 7 hari ke depan (format YYYY-MM-DD) pakai util
  const next7Dates = useMemo(() => getNextDateStrings(7), []);

  // Fetch data dari Supabase
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data: partnerData } = await fetchPartnerByUsername(partnername);
      setPartner(partnerData);
      if (partnerData) {
        const [{ data: servicesData }, { data: staffsData }, { data: bookingsData }] = await Promise.all([
          fetchServicesByPartner(partnerData.id),
          fetchStaffsByPartner(partnerData.id),
          fetchBookingsByPartnerInDates(partnerData.id, next7Dates),
        ]);
        setServices(servicesData || []);
        setStaffs(staffsData || []);
        setBookings(bookingsData || []);
        console.log('bookings 7d: ', bookingsData)
      }
      setLoading(false);
    };
    loadData();
    // eslint-disable-next-line
  }, [partnername]);

  // Ambil id layanan dari query string
  const selectedIds = servicesParam ? servicesParam.split(",") : [];
  const selectedServices = services.filter((s) => selectedIds.includes(s.id));
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  // Filter bookings sesuai tanggal yang dipilih
  const filteredBookings = bookings.filter(b => b.date === selectedDate);

  const dayName = selectedDate ? getDayName(new Date(selectedDate)) : "";

  const slots = useMemo(() => {
    if (
      !partner?.opening_hours ||
      !staffs.length ||
      !totalDuration ||
      !dayName
    )
      return [];
    return generateTimeSlots(
      partner.opening_hours,
      staffs,
      dayName,
      totalDuration,
      filteredBookings
    );
  }, [partner?.opening_hours, staffs, totalDuration, filteredBookings, dayName]);
  
  if (loading) return <LoadingComponent />
  if (!partner) {
    return (
      <Error
        title="Barbershop/salon tidak ditemukan"
        message="Silakan kembali dan pilih yang tersedia."
        action={
          <button className="btn btn-primary mt-4" onClick={() => router.push("/")}>
            Kembali ke Beranda
          </button>
        }
      />
    );
  }

  if (selectedServices.length === 0) {
    return (
      <Error
        title="Layanan tidak ditemukan"
        message="Silakan kembali dan pilih layanan yang tersedia."
        action={
          <button className="btn btn-primary mt-4" onClick={() => router.push("/")}>
            Kembali ke Beranda
          </button>
        }
      />
    );
  }

  const handleContinue = () => {
    setLoading(true)
    const slotData = slots[selectedSlot];
    // Pilih staff random dari availableStaffs di slot yang dipilih
    const availableStaffs = slotData?.availableStaffs || [];
    const staff = availableStaffs.length > 0
      ? availableStaffs[Math.floor(Math.random() * availableStaffs.length)]
      : null;

    const bookingData = {
      services: selectedServices,
      date: selectedDate,
      slot: slotData,
      partner,
      staff,
    };
    localStorage.setItem("pending_booking", JSON.stringify(bookingData));
    router.push(`checkout`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4 md:p-6 pt-6 min-h-screen bg-base-100">
      <PageHeader
        title="Pilih Waktu"
        subtitle="Pilih slot waktu yang tersedia"
        showBack={true}
      />
      <SelectedServiceInfo 
        service={selectedServices} 
        totalDuration={totalDuration} 
      />
      <DatePicker 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        partner={partner}
      />
      <TimeSlotGrid
        slots={slots}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        partnerType={partner?.type}
      />
      <ContinueButton
        selectedSlot={selectedSlot}
        slots={slots}
        onContinue={handleContinue}
      />
    </div>
  );
}