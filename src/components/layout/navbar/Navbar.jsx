"use client"
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import useHasActiveBooking from "@/hooks/useHasActiveBooking";
import useShowMyBookingNotif from "@/hooks/useShowMyBookingNotif";
import PartnerBookingNotifButton from "./PartnerBookingNotifButton";
import { Menu, Search, LogIn, UserPlus, LogOut, Book, Info, X, CalendarCheck } from "lucide-react";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&background=random";

export default function Navbar() {
  const { user, profile, isAuthenticated, logout, loading } = useUser();
  const router = useRouter();
  const hasActiveBooking = useHasActiveBooking();
  const [showNotif, hideNotif] = useShowMyBookingNotif();

  const handleLogout = async () => {
    await logout();
  };

  const handleNav = (path) => {
    router.push(path);
  };

  return (
    <div className="navbar bg-base-100 py-4 shadow-sm sticky top-0 z-40">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden text-neutral"
            aria-label="menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content text-neutral bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button type="button" onClick={() => handleNav("/explore/barbershop")}>
                <Search className="w-4 h-4 text-primary" />
                Barbershop
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav("/explore/salon")}>
                <Search className="w-4 h-4 text-primary" />
                Salon
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav("/tentang")}>
                <Info className="w-4 h-4 text-primary" />
                Tentang
              </button>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <button
                    type="button"
                    className="btn btn-outline btn-primary mt-2"
                    onClick={() => handleNav("/auth/login")}
                  >
                    <LogIn className="w-4 h-4" />
                    Masuk
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={() => handleNav("/auth/register")}
                  >
                    <UserPlus className="w-4 h-4" />
                    Daftar
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        <button
          type="button"
          className="btn btn-link no-underline p-0 md:px-6 normal-case text-2xl text-primary font-bold"
          onClick={() => handleNav("/")}
        >
          Bookley
        </button>
      </div>
      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="btn bg-transparent shadow-none border-none px-3 text-neutral hover:text-primary"
            onClick={() => handleNav("/explore/barbershop")}
          >
            <Search className="w-4 h-4 text-primary" />
            Barbershop
          </button>
          <button
            type="button"
            className="btn bg-transparent shadow-none border-none px-3 text-neutral hover:text-primary"
            onClick={() => handleNav("/explore/salon")}
          >
            <Search className="w-4 h-4 text-primary" />
            Salon
          </button>
          <button
            type="button"
            className="btn bg-transparent shadow-none border-none px-3 text-neutral hover:text-primary"
            onClick={() => handleNav("/tentang")}
          >
            Tentang
          </button>
        </div>
      </div>
      {/* Navbar End */}
      <div className="navbar-end">
        {/* Jangan render apapun sebelum loading selesai */}
        {loading && isAuthenticated ? (
          <div className="flex items-center gap-2 ml-2">
            <div className="skeleton w-8 h-8 rounded-full"></div>
            <div className="skeleton h-4 w-20 rounded"></div>
          </div>
        ) : (
          <>
            {/* Tombol Booking Customer */}
            {!isAuthenticated && !loading && (
              <>
                <div className="relative overflow-visible">
                  <button
                    type="button"
                    className="btn btn-link relative"
                    onClick={() => {
                      handleNav("/mybookings");
                      hideNotif();
                    }}
                    aria-label="My Booking"
                  >
                    <CalendarCheck className="w-6 h-6 text-neutral" />
                    {hasActiveBooking && (
                      <span className="absolute top-1 right-3 w-3 h-3 rounded-full bg-accent border-2 border-accent"></span>
                    )}
                  </button>

                  {/* Tooltip */}
                  {showNotif && (
                    <div className="absolute left-1/2 z-10 mt-2 flex flex-col items-center px-2 sm:px-0 w-screen max-w-[170px] md:max-w-[200px]" style={{ transform: "translateX(-50%)" }}>
                      {/* Arrow */}
                      <div className="w-4 h-4 -mb-2">
                        <div className="w-4 h-4 bg-accent rotate-45 mx-auto shadow" />
                      </div>

                      <div className="relative w-full alert alert-info bg-accent text-accent-content pr-7 p-4 border-none -translate-x-12 flex items-center px-4 py-2 rounded-box animate-fade-in">
                        <span className="text-sm">
                          lihat booking yang sudah dipesan di sini.
                        </span>
                        <button
                          className="absolute top-1 right-1 btn btn-xs btn-circle btn-ghost text-accent-content hover:bg-accent/70"
                          onClick={hideNotif}
                          aria-label="Tutup"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-outline btn-primary ml-2 hidden h-9 lg:flex"
                  onClick={() => handleNav("/auth/login")}
                >
                  <LogIn className="w-4 h-4" />
                  Masuk
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-2 hidden h-9 lg:flex"
                  onClick={() => handleNav("/auth/register")}
                >
                  <UserPlus className="w-4 h-4" />
                  Daftar
                </button>
              </>
            )}

            {/* Tombol Booking Masuk untuk Mitra/Partner */}
            {isAuthenticated && !loading && (
              <PartnerBookingNotifButton />
            )}

            {/* Profile/Logout */}
            {isAuthenticated && (
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle mx-3 ml-2 avatar" aria-label="Profile">
                  <div className="w-10 rounded-full">
                    <img
                      src={profile?.photo || DEFAULT_AVATAR}
                      alt="Profile"
                      className="object-cover"
                    />
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44"
                >
                  <li className="mb-1 px-2 py-1 font-semibold text-neutral border-b border-base-200">
                    {/* <User className="w-4 h-4 mr-2" /> */}
                    {profile?.username || user?.email}
                  </li>
                  <li>
                    <button
                      className="text-neutral text-left"
                      onClick={() => handleNav("/dashboard")}
                    >
                      <Book className="w-4 h-4 mr-2" />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-neutral text-left"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
