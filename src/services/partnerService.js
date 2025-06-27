import { supabase } from "@/lib/supabase";

// Fungsi upload file ke storage
export const uploadImage = async (file, folder = "") => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from("images") // pastikan sudah buat bucket "images" di Supabase Storage
    .upload(fileName, file, { upsert: true });
  if (error) return { error };
  // Dapatkan public URL
  const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);
  return { url: urlData.publicUrl };
};

export const fetchProfile = async (userId) => {
  if (!userId) return { data: null, error: "No userId" };
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("user_id", userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId, data) => {
  const { error, data: updated } = await supabase
    .from("partners")
    .update(data)
    .eq("user_id", userId)
    .select();
  if (error) return { success: false, error: error.message };
  return { success: true, data: updated };
};

export const fetchPartnerByUsername = async (username) => {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("username", username)
    .single();
  return { data, error };
};

export const fetchPartners = async ({ city = "", search = "", type = "" } = {}) => {
  let query = supabase.from("partners").select("*");
  if (city) query = query.eq("city", city);
  if (type) query = query.eq("type", type);
  if (search) query = query.ilike("name", `%${search}%`);
  const { data, error } = await query;
  return { data, error };
};