// useForm.js
"use client"
import { useState } from 'react';

export function useForm(initialState, onSubmit) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    let { name, value } = e.target;
    // hapus semua spasi pada input username
    if (name === "username") value = value.replace(/\s+/g, ""); 
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await onSubmit(form);
    if (res && !res.success) {
      setError(res.error)
    }

  };

  return { 
    form, 
    error, 
    setForm,
    setError, 
    handleChange, 
    handleSubmit, 
  };
}