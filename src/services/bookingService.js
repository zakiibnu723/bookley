import { supabase } from "@/lib/supabase";

// Ambil semua booking berdasarkan partner_id (barbershop)
export const fetchBookingsByPartner = async (partner_id) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("partner_id", partner_id)
    .order("date", { ascending: true });
  return { data, error };
};

// Ambil semua booking berdasarkan staff_id
export const fetchBookingsByStaff = async (staff_id) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("staff_id", staff_id)
    .order("date", { ascending: true });
  return { data, error };
};

// Tambah booking baru
export const addBooking = async (booking) => {
  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select()
    .single();
  return { data, error };
};

// Update booking
export const updateBooking = async (id, update) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

// Hapus booking
export const deleteBooking = async (id) => {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);
  return { success: !error, error };
};

// // Tambah banyak layanan ke tabel booking_services
// export const addBookingServices = async (booking_id, services) => {
//   // services: array of service object (atau array of id)
//   const rows = services.map((s) => ({
//     booking_id,
//     service_id: s.id || s, // support jika s adalah object atau id langsung
//   }));

//   const { data, error } = await supabase
//     .from("booking_services")
//     .insert(rows);

//   return { data, error };
// };