"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as authService from "@/services/authService"
import * as partnerService from "@/services/partnerService"

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Ambil profile partner dari Supabase
  const fetchProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }
    const { data, error } = await partnerService.fetchProfile(userId);
    setProfile(error ? null : data);
  };

  // Cek user login saat mount
  const checkAuth = async () => {
    setLoading(true);
    const { data, error } = await import("@/lib/supabase").then(m => m.supabase.auth.getUser());
    if (error || !data?.user) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      // console.log("Auth error:", error);
      return;
    }
    setUser(data?.user || null);
    await fetchProfile(data?.user?.id || null);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async ({ username, password }) => {
    setLoading(true);
    const result = await authService.login({ username, password });
    if (result.success) {
      setUser(result.data.user || null);
      await fetchProfile(result.data.user?.id || null);
      setLoading(false);
      router.push(`/dashboard`);
    } 
    setLoading(false);
    return result;
  };

  const register = async ({ email, password, username, type }) => {
    setLoading(true);
    const result = await authService.register({ email, password, username, type });
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true)
    await authService.logout();
    setUser(null);
    setProfile(null);
    router.push("/auth/login");
    setLoading(false)
  };

  const updateProfile = async (data) => {
    const result = await partnerService.updateProfile(user.id, data);
    if (result.success) {
      await fetchProfile(user.id);
    }
    return result;
  };

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};