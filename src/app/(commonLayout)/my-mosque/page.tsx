/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetMyMosqueQuery } from "@/redux/features/mosqueSlice/mosqueSlice";
import Image from "next/image";
import { 
  MapPin, Phone, Users, Plus, Building2, Calendar, Globe, UsersRound, ListTodo, ArrowRight } from "lucide-react";

export default function MyMosquePage() {
  const { data, isLoading, error } = useGetMyMosqueQuery();
  const mosque = (data as any)?.data;

  return (
    <div className="min-h-screen bg-[#f5f3ef] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="text-center py-32">
            <div className="animate-spin w-12 h-12 border-4 border-[#8a7340] border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 font-medium">Loading your mosque dashboard...</p>
          </div>
        ) : error ? (
          <div className="text-center py-32 bg-red-50 rounded-3xl border border-red-200 max-w-md mx-auto">
            <p className="text-red-600 font-semibold text-lg">
              Failed to load your mosque. Please try again.
            </p>
          </div>
        ) : !mosque ? (
          <div className="text-center py-32 bg-white rounded-3xl shadow-xl border border-[#e8d99a] max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-[#8a7340]/10 to-[#c8a84b]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Building2 className="w-12 h-12 text-[#8a7340]" />
            </div>
            <h2 className="text-3xl font-bold text-[#2c2416] mb-4">
              No Mosque Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven&apos;t created a mosque yet. Create one to start managing your community.
            </p>
            <Link href="/create-mosque">
              <Button className="bg-gradient-to-r from-[#8a7340] to-[#c8a84b] hover:from-[#7a6330] hover:to-[#b8983b] text-white px-8 py-6 text-lg shadow-xl shadow-[#8a7340]/25 hover:-translate-y-1 transition-all">
                <Building2 className="w-5 h-5 mr-2" />
                Create Mosque
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-[#2c2416]">Mosque Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage {mosque.name}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/create-musulli">
                  <Button className="bg-gradient-to-r from-[#8a7340] to-[#c8a84b] hover:from-[#7a6330] hover:to-[#b8983b] text-white px-6 py-5 shadow-xl shadow-[#8a7340]/25 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Musulli
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Total Musullis */}
              <Card className="overflow-hidden border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed] hover:shadow-2xl hover:-translate-y-1 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#8a7340] to-[#c8a84b] rounded-2xl flex items-center justify-center shadow-lg">
                        <UsersRound className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-[#2c2416]">
                        {mosque._count?.musullis || 0}
                      </p>
                      <p className="text-[#7a6330] font-medium mt-1">Total Musullis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="overflow-hidden border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed] hover:shadow-2xl hover:-translate-y-1 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#8a7340]/10 to-[#c8a84b]/10 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-[#8a7340]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#2c2416] font-semibold text-lg truncate">
                        {mosque.address}
                      </p>
                      <p className="text-[#7a6330] text-sm mt-1">Address</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="overflow-hidden border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed] hover:shadow-2xl hover:-translate-y-1 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#8a7340]/10 to-[#c8a84b]/10 rounded-2xl flex items-center justify-center">
                      <Phone className="w-7 h-7 text-[#8a7340]" />
                    </div>
                    <div>
                      <p className="text-[#2c2416] font-semibold text-lg">
                        {mosque.phone || "—"}
                      </p>
                      <p className="text-[#7a6330] text-sm mt-1">Phone</p>
                    </div>
                  </div>
                  </CardContent>
              </Card>

              {/* Slug */}
              <Card className="overflow-hidden border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed] hover:shadow-2xl hover:-translate-y-1 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#8a7340]/10 to-[#c8a84b]/10 rounded-2xl flex items-center justify-center">
                      <Globe className="w-7 h-7 text-[#8a7340]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#2c2416] font-semibold text-lg truncate">
                        /{mosque.slug}
                      </p>
                      <p className="text-[#7a6330] text-sm mt-1">Slug</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Manage Musullis */}
              <Link href="/my-mosque/musulli-data">
                <Card className="overflow-hidden border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed] hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#8a7340] to-[#c8a84b] rounded-2xl flex items-center justify-center shadow-lg">
                          <ListTodo className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#2c2416]">Musulli List</h3>
                          <p className="text-[#7a6330] mt-1">View all registered members</p>
                        </div>
                      </div>
                      <ArrowRight className="w-8 h-8 text-[#8a7340]" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Mosque Info */}
              <Card className="overflow-hidden border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed]">
                <CardHeader className="px-8 pt-8">
                  <CardTitle className="text-2xl text-[#2c2416] font-bold flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-[#8a7340]" />
                    Mosque Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-xl p-6 border border-[#e8d99a]">
                      <p className="text-xs font-semibold text-[#7a6330] uppercase tracking-widest mb-2">
                        Created At
                      </p>
                      <p className="text-[#2c2416] font-semibold text-lg">
                        {mosque.createdAt ? new Date(mosque.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) : "—"}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-[#e8d99a]">
                      <p className="text-xs font-semibold text-[#7a6330] uppercase tracking-widest mb-2">
                        Last Updated
                      </p>
                      <p className="text-[#2c2416] font-semibold text-lg">
                        {mosque.updatedAt ? new Date(mosque.updatedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) : "—"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
