/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateMusulliMutation } from "@/redux/features/musulliSlice/musulliSlice";
import { useGetMyMosqueQuery } from "@/redux/features/mosqueSlice/mosqueSlice";
import type { CreateMusulliPayload } from "@/types/musulliType";

export default function CreateMusulliPage() {
  const router = useRouter();
  const [createMusulli, { isLoading }] = useCreateMusulliMutation();
  const { data: mosqueData } = useGetMyMosqueQuery();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [form, setForm] = useState<CreateMusulliPayload>({
    mosqueId: "",
    name: "",
    phone: 0,
    monthlyFee: 0,
    startMonth: currentMonth,
    startYear: currentYear,
    paidTillMonth: 0,
    paidTillYear: currentYear,
    paymentDue: 0,
    isActive: true,
  });

  useEffect(() => {
    if (mosqueData?.data?.id) {
      setForm((prev) => ({ ...prev, mosqueId: mosqueData.data.id }));
    }
  }, [mosqueData]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
      await createMusulli(form).unwrap();

      setShowSuccess(true);

      setTimeout(() => router.push("/my-mosque"), 1500);
    } catch (err: any) {
      setError(
        err?.data?.message || "Failed to create musulli. Please try again.",
      );
    }
  };

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentYear + i - 1);

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
            Add New Musulli
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Register a new member to your mosque
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
              Musulli created successfully! Redirecting…
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
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Arif Rahman"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Phone Number
              </label>
              <input
                type="number"
                name="phone"
                value={form.phone === 0 ? "" : form.phone}
                onChange={handleChange}
                required
                placeholder="e.g. 1712345678"
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
                placeholder="e.g. 500"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Start Month */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Start Month
                </label>
                <select
                  name="startMonth"
                  value={form.startMonth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Year */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Start Year
                </label>
                <select
                  name="startYear"
                  value={form.startYear}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || showSuccess}
              className="w-full py-3.5 rounded-lg bg-[#8a7340] hover:bg-[#7a6330] text-white font-semibold text-sm tracking-wide shadow-lg shadow-[#8a7340]/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {isLoading ? (
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
                  Creating musulli…
                </span>
              ) : (
                "Add Musulli"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Back to My Mosque */}
          <Link
            href="/my-mosque"
            className="block text-center py-3 rounded-lg border border-[#c8a84b]/60 text-[#8a7340] font-semibold text-sm hover:bg-[#fdf8ed] transition"
          >
            Back to My Mosque
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
