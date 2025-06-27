import { useState, useEffect } from "react";
import * as partnerService from '@/services/partnerService';

// Helper untuk membandingkan value (array & primitif)
function isEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function useProfile(profile, updateProfile) {
  const [profileState, setProfileState] = useState(profile || {});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editing) setProfileState(profile || {});
    console.log(profile)
  }, [profile, editing]);

  const handleEditProfile = () => setEditing(true);
  const handleCancelEditProfile = () => { setProfileState(profile || {}); setEditing(false); };
  const handleProfileChange = (e) => {
    let { name, value } = e.target;
    if (name === "username") value = value.replace(/\s+/g, "");
    setProfileState({ ...profileState, [name]: value });
  };
  const handleSaveProfile = async () => {
    setLoading(true);
    const changedFields = {};
    for (const key in profileState) {
      if (!isEqual(profileState[key], profile[key])) {
        changedFields[key] = profileState[key];
      }
    }
    if (Object.keys(changedFields).length === 0) {
      setLoading(false);
      setEditing(false);
      return;
    }
    const result = await updateProfile(changedFields);
    setLoading(false);
    if (!result.success) {
      alert(result.error || "Gagal update profil");
    }
    setEditing(false);
  };

  // Upload foto profil
  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const { url, error } = await partnerService.uploadImage(file, "partner-photo");
    setLoading(false);
    if (error) {
      alert("Gagal upload foto");
      return;
    }
    setProfileState((prev) => ({ ...prev, photo: url }));
  };

  // Upload gambar sampul
  const handleAddCoverImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const { url, error } = await partnerService.uploadImage(file, "partner-cover");
    setLoading(false);
    if (error) {
      alert("Gagal upload gambar sampul");
      return;
    }
    setProfileState((prev) => ({
      ...prev,
      cover_images: [...(prev.cover_images || []), url],
    }));
  };

  // Hapus gambar sampul
  const handleRemoveCoverImage = (idx) => {
    setProfileState((prev) => ({
      ...prev,
      cover_images: (prev.cover_images || []).filter((_, i) => i !== idx),
    }));
  };

  // Update jam operasional
  const updateOpeningHour = (idx, field, value) => {
    setProfileState(prev => {
      const updated = (prev.opening_hours || []).map((hour, i) =>
        i === idx ? { ...hour, [field]: value } : hour
      );
      return { ...prev, opening_hours: updated };
    });
  };

  return {
    profileState,
    editing,
    loading,
    handleProfileChange,
    handleEditProfile,
    handleCancelEditProfile,
    handleSaveProfile,
    handleProfilePhotoChange,
    handleAddCoverImage,
    handleRemoveCoverImage,
    updateOpeningHour,
  };
}