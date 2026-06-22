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

          {/* Mobile menu button - hidden because we use the bottom MobileNavbar */}
          <div className="hidden flex items-center space-x-3">
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

      {/* Mobile Menu Overlay - hidden because we use the bottom MobileNavbar */}
      <div
        className={`hidden absolute w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 ease-in-out origin-top ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
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

import { ProfileDrawer } from "./profile-drawer";

export default Navbar;
