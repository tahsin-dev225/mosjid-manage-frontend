"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetMyMosqueQuery } from "@/redux/features/mosqueSlice/mosqueSlice";
import { useGetMusullisQuery } from "@/redux/features/musulliSlice/musulliSlice";
import {
  MapPin,
  Phone,
  Building2,
  Plus,
  Search,
  User,
  DollarSign,
  Calendar,
  Edit,
  CreditCard,
} from "lucide-react";
import type { Musulli } from "@/types/musulliType";

export default function MyMosquePage() {
  const {
    data: mosqueData,
    isLoading: mosqueLoading,
    error: mosqueError,
  } = useGetMyMosqueQuery();
  const {
    data: musullisData,
    isLoading: musullisLoading,
    error: musullisError,
  } = useGetMusullisQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const mosque = mosqueData?.data;
  const musullis: Musulli[] = musullisData?.data || [];

  const filteredMusullis = musullis.filter(
    (musulli) =>
      musulli.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      musulli.phone.includes(searchQuery) ||
      (musulli.address &&
        musulli.address.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (mosqueLoading) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
        <div className="text-center py-32">
          <div className="animate-spin w-12 h-12 border-4 border-[#8a7340] border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 font-medium">
            Loading your mosque dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (mosqueError) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
        <div className="text-center py-32 bg-red-50 rounded-3xl border border-red-200 max-w-md mx-auto">
          <p className="text-red-600 font-semibold text-lg">
            Failed to load your mosque. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!mosque) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
        <div className="text-center py-32 bg-white rounded-3xl shadow-xl border border-[#e8d99a] max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-[#8a7340]/10 to-[#c8a84b]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Building2 className="w-12 h-12 text-[#8a7340]" />
          </div>
          <h2 className="text-3xl font-bold text-[#2c2416] mb-4">
            No Mosque Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven&apos;t created a mosque yet. Create one to start managing
            your community.
          </p>
          <Link href="/create-mosque">
            <Button className="bg-gradient-to-r from-[#8a7340] to-[#c8a84b] hover:from-[#7a6330] hover:to-[#b8983b] text-white px-8 py-6 text-lg shadow-xl shadow-[#8a7340]/25 hover:-translate-y-1 transition-all">
              <Building2 className="w-5 h-5 mr-2" />
              Create Mosque
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] py-6 pb-10 md:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-28 h-28 rounded-2xl overflow-hidden">
              {mosque.logo && (
                <Image
                  src={mosque.logo}
                  alt="Mosque"
                  width={100}
                  height={100}
                  className="w-28 h-28"
                  priority
                />
              )}
            </div>
            <div>
              <h1 className="text-xl md:text-4xl font-bold text-[#2c2416]">
                Mosque Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage {mosque.name}</p>
            </div>
          </div>

          <div className="flex  flex-col justify-end flex-row gap-3">
            <Link href="/create-musulli">
              <Button className="bg-gradient-to-r from-[#8a7340] to-[#c8a84b] hover:from-[#7a6330] hover:to-[#b8983b] text-white text-sm md:text-base  px-3 py-3 md:px-6 md:py-5 shadow-xl shadow-[#8a7340]/25 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Plus className="w-3 h-3 md:w-5 md:h-5" />
                Add Musulli
              </Button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[400px]  pl-10 pr-3 py-3 rounded-lg border border-[#e8d99a] bg-white text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
          />
        </div>

        {/* Musulli Table */}
        <Card className="border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed] overflow-hidden">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-2xl text-[#2c2416] font-bold flex items-center gap-3">
              <User className="w-6 h-6 text-[#8a7340]" />
              Members ({filteredMusullis.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {musullisLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-10 h-10 border-4 border-[#8a7340] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading musullis...</p>
              </div>
            ) : musullisError ? (
              <div className="text-center py-20 bg-red-50 mx-8 rounded-xl border border-red-200">
                <p className="text-red-600 font-medium">
                  Failed to load musullis. Please try again.
                </p>
              </div>
            ) : filteredMusullis.length === 0 ? (
              <div className="text-center py-20">
                <User className="w-16 h-16 text-[#8a7340] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#2c2416] mb-2">
                  No Musullis Found
                </h2>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? "No members match your search"
                    : "You haven't added any musullis yet"}
                </p>
                {!searchQuery && (
                  <Link href="/create-musulli">
                    <Button className="bg-[#8a7340] hover:bg-[#7a6330] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Musulli
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#fdf8ed] border-b border-[#e8d99a] text-[11px]  md:text-xs md:font-semibold md:uppercase">
                        <th className="px-2 py-3 md:px-8 md:py-6 text-left text-[#7a6330]  tracking-wider">
                          Member
                        </th>
                        <th className="px-8 py-4 text-left text-[#7a6330]  tracking-wider">
                          Phone
                        </th>
                        <th className="px-8 py-4  text-left text-[#7a6330]  tracking-wider">
                          Address
                        </th>
                        <th className="px-2 py-3 md:px-8 md:py-6 text-left text-[#7a6330]  tracking-wider">
                          Monthly Fee
                        </th>
                        <th className="px-2 py-3 md:px-8 md:py-6 text-left text-[#7a6330]  tracking-wider">
                          Due Amount
                        </th>
                        <th className="px-8 py-4 text-left text-[#7a6330]  tracking-wider">
                          Paid Months
                        </th>
                        <th className="px-8 py-4  text-left text-[#7a6330]  tracking-wider">
                          Joined At
                        </th>
                        <th className="px-2 py-3 md:px-8 md:py-6 text-left text-[#7a6330]  tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e8d99a]">
                      {filteredMusullis.map((musulli) => (
                        <tr
                          key={musulli.id}
                          className="hover:bg-[#fdf8ed]/50 transition-colors"
                        >
                          <td className="px-2 py-3 md:px-8 md:py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8a7340] to-[#c8a84b] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {musulli.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-[#2c2416] font-semibold text-[11px] md:text-lg">
                                  {musulli.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 ">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#8a7340]" />
                              <span className="text-[#2c2416] font-medium">
                                {musulli.phone}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6 ">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#8a7340]" />
                              <span className="text-[#2c2416] font-medium">
                                {musulli.address}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-2 md:px-8 md:py-6">
                            <div className="flex items-center gap-2">
                              <span className="text-[#2c2416] font-semibold  text-xs md:text-lg">
                                ৳{musulli.monthlyFee}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-2 md:px-8 md:py-6">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-semibold  text-xs md:text-lg ${
                                  musulli.dueAmount > 0
                                    ? "text-orange-600"
                                    : "text-green-600"
                                }`}
                              >
                                ৳{musulli.dueAmount}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#8a7340]" />
                              <span className="text-[#2c2416] font-semibold">
                                {musulli.paidMonths}/{musulli.totalMonths}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6 ">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#8a7340]" />
                              <span className="text-[#2c2416] font-medium">
                                {formatDate(musulli.joinedAt)}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-2 md:px-8 md:py-6">
                            <div className="flex flex-col md:flex-row items-center gap-2">
                              <Link
                                href={`/my-mosque/musulli-data/${musulli.id}/payments`}
                              >
                                <Button
                                  variant="ghost"
                                  className="p-2 hover:bg-[#fdf8ed] text-[#8a7340]"
                                >
                                  <CreditCard className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Link
                                href={`/my-mosque/musulli-data/${musulli.id}/edit`}
                              >
                                <Button
                                  variant="ghost"
                                  className="p-2 hover:bg-[#fdf8ed] text-[#8a7340]"
                                >
                                  <Edit className="w-4 h-4  " />
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card List View */}
                <div className="block md:hidden space-y-4 px-4 pb-6">
                  {filteredMusullis.map((musulli) => (
                    <div
                      key={musulli.id}
                      className="bg-white rounded-xl border border-[#e8d99a] p-4 shadow-sm space-y-4"
                    >
                      {/* Top Row: Name and Avatar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8a7340] to-[#c8a84b] flex items-center justify-center text-white font-bold text-base shadow-sm">
                            {musulli.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-[#2c2416] font-semibold text-base">
                              {musulli.name}
                            </h3>
                            {musulli.phone && (
                              <a
                                href={`tel:${musulli.phone}`}
                                className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"
                              >
                                <Phone className="w-3 h-3 text-[#8a7340]" />
                                {musulli.phone}
                              </a>
                            )}
                          </div>
                        </div>
                        {/* Due/Status Badge */}
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            musulli.dueAmount > 0
                              ? "bg-orange-50 text-orange-600 border border-orange-200"
                              : "bg-green-50 text-green-600 border border-green-200"
                          }`}
                        >
                          {musulli.dueAmount > 0 ? `Due: ৳${musulli.dueAmount}` : "Paid"}
                        </span>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#e8d99a]/40 text-xs">
                        <div>
                          <p className="text-gray-500 font-medium">Monthly Fee</p>
                          <p className="text-[#2c2416] font-semibold mt-0.5">
                            ৳{musulli.monthlyFee}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-medium">Paid Months</p>
                          <p className="text-[#2c2416] font-semibold mt-0.5">
                            {musulli.paidMonths} / {musulli.totalMonths}
                          </p>
                        </div>
                        {musulli.address && (
                          <div className="col-span-2">
                            <p className="text-gray-500 font-medium">Address</p>
                            <p className="text-[#2c2416] mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#8a7340]" />
                              {musulli.address}
                            </p>
                          </div>
                        )}
                        <div className="col-span-2">
                          <p className="text-gray-500 font-medium">Joined At</p>
                          <p className="text-[#2c2416] mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#8a7340]" />
                            {formatDate(musulli.joinedAt)}
                          </p>
                        </div>
                      </div>

                      {/* Actions Row */}
                      <div className="flex gap-2">
                        <Link
                          href={`/my-mosque/musulli-data/${musulli.id}/payments`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            className="w-full border-[#8a7340]/30 hover:bg-[#fdf8ed] text-[#8a7340] text-xs h-9"
                          >
                            <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                            Pay Fee
                          </Button>
                        </Link>
                        <Link
                          href={`/my-mosque/musulli-data/${musulli.id}/edit`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            className="w-full border-[#8a7340]/30 hover:bg-[#fdf8ed] text-[#8a7340] text-xs h-9"
                          >
                            <Edit className="w-3.5 h-3.5 mr-1.5" />
                            Edit Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
