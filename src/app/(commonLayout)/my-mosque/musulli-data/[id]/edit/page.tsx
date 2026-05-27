"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleMusulliQuery,
  useUpdateMusulliMutation,
} from "@/redux/features/musulliSlice/musulliSlice";
import type { UpdateMusulliPayload } from "@/types/musulliType";
import type { ApiError } from "@/types/errorType";

export default function EditMusulliPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    data: musulliData,
    isLoading: isLoadingMusulli,
    error: musulliError,
  } = useGetSingleMusulliQuery(id);
  const [updateMusulli, { isLoading: isUpdating }] = useUpdateMusulliMutation();

  const [form, setForm] = useState<UpdateMusulliPayload>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (musulliData?.data) {
      const data = musulliData.data;
      setForm({
        name: data.name,
        phone: data.phone,
        address: data.address,
        monthlyFee: data.monthlyFee,
        joinedAt: data.joinedAt.split("T")[0],
      });
    }
  }, [musulliData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await updateMusulli({ id, ...form }).unwrap();
      setShowSuccess(true);
      setTimeout(() => router.push("/my-mosque/musulli-data"), 1500);
    } catch (err: unknown) {
      const apiError = err as { data?: ApiError };
      setError(
        apiError.data?.message || "Failed to update musulli. Please try again.",
      );
    }
  };

  if (isLoadingMusulli) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#8a7340] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading musulli data...</p>
        </div>
      </div>
    );
  }

  if (musulliError || !musulliData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#2c2416] mb-2">
            Musulli Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The musulli youre trying to edit doesnt exist or you dont have
            permission to access it.
          </p>
          <Link href="/my-mosque/musulli-data">
            <button className="bg-[#8a7340] hover:bg-[#7a6330] text-white px-6 py-3 rounded-lg font-semibold">
              Back to Musulli List
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f5f3ef]">
      {/* Left: Form Panel */}
      <div className="w-full md:w-[48%] flex items-center justify-center px-8 py-12 bg-white shadow-2xl z-10">
        <div className="w-full max-w-[400px]">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 my-5 rounded-lg flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                className="w-10 rounded-md"
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

          {/* Heading */}
          <h1 className="text-[2rem] font-bold text-[#2c2416] leading-tight mb-1">
            Edit Musulli
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Update {form.name}&apos; information
          </p>

          {/* Success Banner */}
          {showSuccess && (
            <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Musulli updated successfully! Redirecting…
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                required
                placeholder="e.g. Abdul Karim"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                required
                placeholder="e.g. 01712345678"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address || ""}
                onChange={handleChange}
                required
                placeholder="e.g. Dhaka"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Monthly Fee */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Monthly Fee
              </label>
              <input
                type="number"
                name="monthlyFee"
                value={form.monthlyFee === 0 ? "" : form.monthlyFee}
                onChange={handleChange}
                required
                placeholder="e.g. 300"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Joined At */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Joined At
              </label>
              <input
                type="date"
                name="joinedAt"
                value={form.joinedAt || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isUpdating || showSuccess}
              className="w-full py-3.5 rounded-lg bg-[#8a7340] hover:bg-[#7a6330] text-white font-semibold text-sm tracking-wide shadow-lg shadow-[#8a7340]/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {isUpdating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
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
                  Updating musulli…
                </span>
              ) : (
                "Update Musulli"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Back to Musulli List */}
          <Link
            href="/my-mosque/musulli-data"
            className="block text-center py-3 rounded-lg border border-[#c8a84b]/60 text-[#8a7340] font-semibold text-sm hover:bg-[#fdf8ed] transition"
          >
            Back to Musulli List
          </Link>
        </div>
      </div>

      {/* Right: Mosque Image Panel */}
      <div className="hidden md:flex md:w-[52%] relative overflow-hidden">
        <Image
          src="/mosque-bg.png"
          alt="Mosque"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Quote */}
        <div className="absolute bottom-0 left-0 right-0 px-10 pb-12">
          <blockquote className="text-white">
            <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-3 drop-shadow-lg">
              &ldquo;The Muslim community is like one body; if one part suffers,
              all parts suffer.&rdquo;
            </p>
            <footer className="text-sm text-white/70 font-medium tracking-wide">
              — Prophet Muhammad (PBUH)
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
