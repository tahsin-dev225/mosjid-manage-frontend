"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetMusullisQuery } from "@/redux/features/musulliSlice/musulliSlice";
import {
  Plus,
  Search,
  ArrowLeft,
  User,
  Phone,
  DollarSign,
  Calendar,
  Edit,
  CreditCard,
  MapPin,
} from "lucide-react";
import type { Musulli } from "@/types/musulliType";

export default function MusulliDataPage() {
  const { data, isLoading, error } = useGetMusullisQuery();
  const [searchQuery, setSearchQuery] = useState("");
  console.log(data);

  const musullis: Musulli[] = data?.data || [];

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

  return (
    <div className="min-h-screen bg-[#f5f3ef] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/my-mosque">
              <Button variant="ghost" className="p-2 hover:bg-[#fdf8ed]">
                <ArrowLeft className="w-6 h-6 text-[#8a7340]" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-[#2c2416]">
                Musulli List
              </h1>
              <p className="text-gray-600 mt-2">Manage your mosque members</p>
            </div>
          </div>
          <Link href="/create-musulli">
            <Button className="bg-gradient-to-r from-[#8a7340] to-[#c8a84b] hover:from-[#7a6330] hover:to-[#b8983b] text-white px-6 py-5 shadow-xl shadow-[#8a7340]/25 hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Musulli
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl mb-8 bg-gradient-to-br from-white to-[#fdf8ed]">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#e8d99a] bg-white text-[#2c2416] placeholder-gray-400 text-lg focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed] overflow-hidden">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-2xl text-[#2c2416] font-bold flex items-center gap-3">
              <User className="w-6 h-6 text-[#8a7340]" />
              Members ({filteredMusullis.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-10 h-10 border-4 border-[#8a7340] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading musullis...</p>
              </div>
            ) : error ? (
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#fdf8ed] border-b border-[#e8d99a]">
                      <th className="px-8 py-4 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                        Monthly Fee
                      </th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                        Due Amount
                      </th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                        Paid Months
                      </th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                        Joined At
                      </th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
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
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8a7340] to-[#c8a84b] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {musulli.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-[#2c2416] font-semibold text-lg">
                                {musulli.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#8a7340]" />
                            <span className="text-[#2c2416] font-medium">
                              {musulli.phone}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#8a7340]" />
                            <span className="text-[#2c2416] font-medium">
                              {musulli.address}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-[#8a7340]" />
                            <span className="text-[#2c2416] font-semibold text-lg">
                              ৳{musulli.monthlyFee}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-orange-500" />
                            <span
                              className={`font-semibold text-lg ${musulli.dueAmount > 0 ? "text-orange-600" : "text-green-600"}`}
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
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#8a7340]" />
                            <span className="text-[#2c2416] font-medium">
                              {formatDate(musulli.joinedAt)}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
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
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
