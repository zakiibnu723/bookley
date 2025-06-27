import { supabase } from "@/lib/supabase";

export const fetchServicesByPartner = async (partner_id) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("partner_id", partner_id)
    .order("created_at", { ascending: false }); // urut terbaru di atas
  return { data, error };
};

export const addService = async (service) => {
  const { data, error } = await supabase
    .from("services")
    .insert([service])
    .select()
    .single();
  return { data, error };
};

export const updateService = async (id, update) => {
  const { data, error } = await supabase
    .from("services")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const deleteService = async (id) => {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);
  return { success: !error, error };
};