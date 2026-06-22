"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { User, Mail, LogOut } from "lucide-react";
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

interface ProfileDrawerProps {
  onLogout?: () => void;
  trigger?: React.ReactNode;
}

export const ProfileDrawer = ({ onLogout, trigger }: ProfileDrawerProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMeQuery();
  const user = data?.data;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(resetApiState());
    if (onLogout) onLogout();
    router.push("/login");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button className="rounded-full border-2 border-transparent hover:border-[#c8a84b]/40 bg-gradient-to-br from-[#fdf8ed] to-[#f5f0e0] shadow-md size-11 flex justify-center items-center transition-all cursor-pointer text-[#8a7340] hover:scale-105">
            <User className="w-5 h-5" />
          </button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-white dark:bg-[#0a0a0a] border-none text-gray-900 dark:text-white w-full sm:max-w-md p-0 shadow-2xl z-[100]"
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
