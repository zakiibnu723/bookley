import { supabase } from "@/lib/supabase";

export const fetchStaffsByPartner = async (partner_id) => {
  const { data, error } = await supabase
    .from("staffs")
    .select("*")
    .eq("partner_id", partner_id)
    .order("created_at", { ascending: false }); // urut terbaru di atas
  return { data, error };
};

export const addStaff = async (staff) => {
  const { data, error } = await supabase
    .from("staffs")
    .insert([staff])
    .select()
    .single();
  return { data, error };
};

export const updateStaff = async (id, update) => {
  const { data, error } = await supabase
    .from("staffs")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const deleteStaff = async (id) => {
  const { error } = await supabase
    .from("staffs")
    .delete()
    .eq("id", id);
  return { success: !error, error };
};

export const fetchStaffById = async (id) => {
  const { data, error } = await supabase
    .from("staffs")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};