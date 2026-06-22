"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Info, User, Landmark, ShieldCheck } from "lucide-react";
import { useGetMeQuery } from "@/redux/features/authSlice/authSlice";
import { ProfileDrawer } from "./profile-drawer";

const MobileNavbar = () => {
  const pathname = usePathname();
  const { data: user } = useGetMeQuery();

  const isRoleAdmin = user?.data?.role === "MOSQUE_ADMIN";

  // Dynamic Navigation Items
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: isRoleAdmin ? "My Mosque" : "About",
      href: isRoleAdmin ? "/my-mosque" : "/about",
      icon: isRoleAdmin ? ShieldCheck : Info,
    },
  ];

  const handleProfileClick = (e: React.MouseEvent) => {
    // If not logged in, we let the normal Link behavior happen (navigate to /login)
    if (!user) {
      return;
    }
    // If logged in, ProfileDrawer's trigger handles it, so we prevent default
    e.preventDefault();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 bg-[#7A6330] right-0 z-50 w-full">
      {/* Full-width, premium bottom navbar */}
      <div className="bg-[#7A6330]  px-4 py-3 flex items-center justify-between">
        {/* Navigation Items */}
        <div className="flex items-center justify-around w-full gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-2 py-2.5 px-4 rounded-xl transition-all duration-300 ease-out select-none ${
                  isActive
                    ? "bg-zinc-100 text-black font-semibold"
                    : "text-zinc-200 hover:text-black"
                }`}
              >
                <Icon className={`w-7 h-7 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
                {isActive && (
                  <span className="text-sm tracking-wide transition-opacity duration-300 whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Profile Item (reusing ProfileDrawer if logged in, else Link to login) */}
          {user ? (
            <ProfileDrawer
              trigger={
                <button
                  className={`relative flex items-center gap-2 py-2.5 px-4 rounded-xl transition-all duration-300 ease-out select-none ${
                    pathname === "/profile"
                      ? "bg-zinc-100 text-black font-semibold"
                      : "text-zinc-200 hover:text-black"
                  }`}
                >
                  <User className="w-7 h-7" />
                </button>
              }
            />
          ) : (
            <Link
              href="/login"
              onClick={handleProfileClick}
              className={`relative flex items-center gap-2 py-2.5 px-4 rounded-xl transition-all duration-300 ease-out select-none ${
                pathname === "/login"
                  ? "bg-zinc-100 text-black font-semibold"
                  : "text-zinc-200 hover:text-black"
              }`}
            >
              <User className="w-7 h-7" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
