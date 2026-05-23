"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateMosqueMutation } from "@/redux/features/mosqueSlice/mosqueSlice";
import { Upload } from "lucide-react";

interface ICreateMosquePayload {
  name: string;
  slug: string;
  address: string;
  phone?: string;
  logo?: string;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function CreateMosquePage() {
  const router = useRouter();
  const [createMosque, { isLoading }] = useCreateMosqueMutation();

  const [form, setForm] = useState<ICreateMosquePayload>({
    name: "",
    slug: "",
    address: "",
    phone: "",
    logo: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files?.[0] || null;
      setLogoFile(file);
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setLogoPreview(previewUrl);
      } else {
        setLogoPreview(null);
      }
    } else {
      setForm((prev) => {
        const newForm = { ...prev, [name]: value };
        if (name === "name") {
          newForm.slug = generateSlug(value);
        }
        return newForm;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let base64Logo = form.logo;
      if (logoFile) {
        base64Logo = await fileToBase64(logoFile);
      }

      await createMosque({ ...form, logo: base64Logo }).unwrap();
      setSuccess(true);
      setTimeout(() => router.push("/mosque"), 1500);
    } catch (err: any) {
      setError(
        err?.data?.message || "Failed to create mosque. Please try again.",
      );
    }
  };

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
            Create Your Mosque
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Register your mosque and start managing your community.
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
              Mosque created successfully! Redirecting…
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
            {/* Mosque Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Mosque Name
              </label>
              <input
                id="mosque-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Al-Masjid an-Nabawi"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Slug (Auto-generated)
              </label>
              <input
                id="mosque-slug"
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                placeholder="e.g. al-masjid-an-nabawi"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Address
              </label>
              <input
                id="mosque-address"
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="e.g. 123 Islamic Street, Dhaka"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                id="mosque-phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 01700000000"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fafaf8] text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>

            {/* Logo File (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Logo (Optional)
              </label>
              <div className="relative">
                <input
                  id="mosque-logo"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="mosque-logo"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-[#fafaf8] hover:border-[#c8a84b] hover:bg-[#fdf8ed] cursor-pointer transition"
                >
                  {logoPreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              id="create-mosque-submit"
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
                  Creating mosque…
                </span>
              ) : (
                "Create Mosque"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Back to Mosques */}
          <Link
            href="/mosque"
            className="block text-center py-3 rounded-lg border border-[#c8a84b]/60 text-[#8a7340] font-semibold text-sm hover:bg-[#fdf8ed] transition"
          >
            Back to Mosques
          </Link>

          {/* Info note */}
          <div className="flex items-start gap-2 mt-6 bg-[#fdf8ed] border border-[#e8d99a] rounded-lg px-3 py-2.5">
            <svg
              className="w-4 h-4 text-[#c8a84b] mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-[#7a6330] leading-relaxed">
              <span className="font-semibold">Tip.</span> The slug will be used
              in your mosque&apos;s URL.
            </p>
          </div>
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
              &ldquo;The mosque is a place of peace and remembrance.&rdquo;
            </p>
            <footer className="text-sm text-white/70 font-medium tracking-wide">
              — Islamic Wisdom
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
