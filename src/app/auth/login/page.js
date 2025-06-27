"use client"
import React from 'react';
import { useUser } from '@/context/UserContext';
import { useForm } from '@/hooks/useForm';
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login, loading } = useUser();
  const router = useRouter();

  const onSubmit = async (form) => {
    return await login(form);
  };

  const { form, handleChange, handleSubmit, error } = useForm(
    { username: '', password: '' },
    onSubmit
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-white px-4 py-8 mb-16">
      <div className="w-full max-w-md mx-auto -mt-24 md:-mt-6">
        <div className="bg-base-100 rounded-2xl shadow-2xl px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                <rect x="3" y="4" width="18" height="18" rx="4" strokeWidth={2} />
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth={2} />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-1 text-center"><span className='text-neutral'>Login Mitra </span>Bookley</h2>
            <p className="text-xs text-gray-500 text-center max-w-xs">
              <b>Halaman ini khusus untuk Mitra.</b><br />
              Pelanggan <b>tidak perlu login</b> untuk melakukan booking layanan.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label" htmlFor="username">
                <span className="label-text text-sm font-medium">Username</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Username/Email"
                className="input input-bordered input-md w-full"
                required
                autoFocus
                autoComplete="username"
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                <span className="label-text text-sm font-medium">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered input-md w-full"
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="alert alert-error py-2 px-4 text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-md w-full mt-2 shadow-md"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center mt-3">
              <span className="text-sm text-gray-500">
                Belum punya akun mitra?{' '}
                <button
                  type="button"
                  className="link link-hover text-primary font-semibold"
                  onClick={() => router.push("/auth/register")}
                >
                  Daftar Mitra
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;