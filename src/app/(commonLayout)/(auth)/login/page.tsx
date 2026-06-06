/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/features/authSlice/authSlice";
import { baseApi } from "@/redux/features/apiSlice/apiSlice";
import type { ApiError } from "@/types/errorType";

interface ILoginPayload {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState<ILoginPayload>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    try {
      const res = await login(form).unwrap();

      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch(baseApi.util.invalidateTags(["User"]));

      setSuccess(true);
      console.log("dkf", res.data.role);
      if (res.data.role === "MOSQUE_ADMIN") {
        return router.push("/my-mosque");
      }

      router.push("/mosque");
    } catch (err: unknown) {
      const apiError = err as { data?: ApiError };
      setError(
        apiError.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f3ef]">
      {/* ── Left: Mosque Image Panel ── */}
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
              &ldquo;Verily, the mosques of Allah are only
              <br />
              maintained by those who believe.&rdquo;
            </p>
            <footer className="text-sm text-white/70 font-medium tracking-wide">
              — Quran 9:18
            </footer>
          </blockquote>
        </div>
      </div>

      {/* ── Right: Form Panel ── */}
      <div className="w-full md:w-[48%] flex items-center justify-center px-8 py-12 bg-white shadow-2xl z-10">
        <div className="w-full max-w-[400px]">
          {/* Logo / Brand */}
          {/* Logo */}
          <div className="flex-shrink-0 my-5 rounded-lg flex items-center gap-4">
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

          {/* Heading */}
          <h1 className="text-[2rem] font-bold text-[#2c2416] leading-tight mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Sign in to continue to your mosque community.
          </p>

          {/* Success Banner */}
          {success && (
            <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Login successful! Redirecting…
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
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#8a7340] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Your password"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8a7340] transition"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.26 0 2.46.24 3.55.67M15 12a3 3 0 01-3 3m6.364-5.636A8.965 8.965 0 0121 12c0 3-4 7-9 7a9.06 9.06 0 01-2.825-.457M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading || success}
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
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">
              Don&apos;t have an account?
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Register Link */}
          <Link
            href="/register"
            className="block text-center py-3 rounded-lg border border-[#c8a84b]/60 text-[#8a7340] font-semibold text-sm hover:bg-[#fdf8ed] transition"
          >
            Create Account
          </Link>

          {/* Security note */}
          <div className="flex items-start gap-2 mt-6 bg-[#fdf8ed] border border-[#e8d99a] rounded-lg px-3 py-2.5">
            <svg
              className="w-4 h-4 text-[#c8a84b] mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-[#7a6330] leading-relaxed">
              <span className="font-semibold">Secure &amp; Private.</span> Your
              credentials are encrypted and never stored in plain text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
