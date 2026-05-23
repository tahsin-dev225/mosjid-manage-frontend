"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, User, X, LogOut, ShieldCheck, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useGetMeQuery } from "@/redux/features/authSlice/authSlice";
import { resetApiState } from "@/redux/features/apiSlice/apiSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetMeQuery();

  console.log(user);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Mosque", href: "/mosque" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full  bg-white/90  font-roboto  transition-colors shadow-sm">
      <div className="max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1700px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 rounded-lg flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                className="w-10 rounded-md "
                src="/img/logo.png"
                alt="Logo"
                width={200}
                height={200}
              />
            </Link>
            <div className="">
              <h1 className="text-2xl font-semibold text-[#7A6330]">
                Musulli{" "}
                <span className="text-blue-800 dark:text-green-700">Track</span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-sky-700">
                Digital Mosjid Management System
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-baseline space-x-2 lg:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              {user?.data?.role === "MOSQUE_ADMIN" && (
                <>
                  <Link
                    href="/my-mosque"
                    className="text-gray-700 hover:text-blue-600 dark:text-gray-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
                  >
                    My Mosque
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop: Login / Profile */}
          <div className="hidden md:flex items-center space-x-5">
            {user ? (
              <ProfileDrawer onLogout={() => setIsOpen(false)} />
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-[#8a7340] to-[#c8a84b] hover:from-[#7a6330] hover:to-[#b8983b] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-[#8a7340]/25 hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-green-400 hover:bg-blue-50 dark:hover:bg-white/10 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 ease-in-out origin-top ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-green-400 hover:bg-blue-50 dark:hover:bg-white/5 block px-4 py-3 rounded-xl text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-5 flex flex-col space-y-3 px-2 border-t border-gray-100 dark:border-gray-800 mt-2">
            {user ? (
              <ProfileDrawer onLogout={() => setIsOpen(false)} />
            ) : (
              <Link
                href="/login"
                className="w-full text-center bg-gradient-to-r from-[#8a7340] to-[#c8a84b] text-white hover:from-[#7a6330] hover:to-[#b8983b] px-4 py-3 rounded-xl font-semibold transition-colors shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProfileDrawer = ({ onLogout }: { onLogout: () => void }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMeQuery();
  const user = data?.data;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(resetApiState());
    onLogout();
    router.push("/login");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-full border-2 border-transparent hover:border-[#c8a84b]/40 bg-gradient-to-br from-[#fdf8ed] to-[#f5f0e0] shadow-md size-11 flex justify-center items-center transition-all cursor-pointer text-[#8a7340] hover:scale-105">
          <User className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-white dark:bg-[#0a0a0a] border-none text-gray-900 dark:text-white w-full sm:max-w-md p-0 shadow-2xl"
      >
        <div className="flex flex-col h-full h-[100dvh]">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-gray-100 dark:border-white/10 text-left bg-gray-50/50 dark:bg-black/20">
            <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              My Profile
            </SheetTitle>
            <SheetDescription className="text-gray-500 dark:text-gray-400">
              Manage your personal information and preferences.
            </SheetDescription>
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 mt-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <svg
                  className="animate-spin w-8 h-8 text-[#8a7340]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              </div>
            ) : (
              <>
                {/* Main Info */}
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8a7340] to-[#c8a84b] flex items-center justify-center text-3xl font-bold uppercase text-white shadow-xl shadow-[#8a7340]/20 ring-4 ring-white dark:ring-black">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide truncate">
                      {user?.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{user?.email}</span>
                    </div>
                    {user?.phone && (
                      <p className="text-xs text-gray-400 mt-1">
                        📞 {user.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Role Badge */}
                <div className="flex gap-3 pb-6 border-b border-gray-100 dark:border-white/5">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#fdf8ed] text-[#8a7340] uppercase tracking-wider border border-[#e8d99a]">
                    Role: {user?.role}
                  </span>
                </div>

                {/* Account Details */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Account Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border border-gray-100 dark:border-white/5 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">
                        Member Since
                      </span>
                      <span className="text-gray-900 dark:text-gray-200 font-semibold">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border border-gray-100 dark:border-white/5 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">
                        User ID
                      </span>
                      <span
                        className="text-gray-700 dark:text-gray-300 font-mono text-xs truncate max-w-[150px] bg-gray-200 dark:bg-black/40 px-2 py-1 rounded"
                        title={user?.id}
                      >
                        {user?.id}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer – Logout */}
          <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-black/20">
            <SheetClose asChild>
              <button
                onClick={handleLogout}
                className="w-full py-3.5 px-4 flex items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all font-bold border border-red-200 dark:border-red-500/20 hover:scale-[1.02] shadow-sm cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
