import { supabase } from "@/lib/supabase";

export const register = async ({ email, password, username, type }) => {
  // Cek username dulu sebelum signUp
  const { data: existing, error: checkError } = await supabase
    .from("partners")
    .select("id")
    .eq("username", username)
    .single();

  if (existing) {
    return { success: false, error: "username telah digunakan" };
  }

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    let msg = error.message;
    if (
      msg.toLowerCase().includes("user already registered") ||
      (msg.toLowerCase().includes("email") && msg.toLowerCase().includes("exists"))
    ) {
      msg = "email telah terdaftar";
    }
    return { success: false, error: msg };
  }
  const user = data.user;
  if (user && username) {
    const { error: profileError } = await supabase
      .from("partners")
      .insert([{ user_id: user.id, username, type }]);
    if (profileError) {
      // Error lain (bukan duplicate username) jika ada
      return { success: false, error: profileError.message };
    }
  }
  return { success: true, data };
};

export const login = async ({ username, password }) => {
  let email = username;
  if (!username.includes("@")) {
    const { data, error } = await supabase
      .from("partners_with_email")
      .select("user_id, username, email")
      .ilike("username", username.trim())
      .single();
    if (error || !data?.email) return { success: false, error: "Username tidak ditemukan" };
    email = data.email;
  }
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
  if (loginError) return { success: false, error: loginError.message };
  return { success: true, data: loginData };
};

export const logout = async () => {
  await supabase.auth.signOut();
};


