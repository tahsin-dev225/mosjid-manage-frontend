/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MosqueCard from "@/components/shared/mosque-card";
import { useGetAllMosquesQuery } from "@/redux/features/mosqueSlice/mosqueSlice";
import { Search, Plus } from "lucide-react";

export default function MosquePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetAllMosquesQuery({
    search: searchQuery || undefined,
    page: currentPage,
  });

  // Add type safety for the API response structure
  const apiData = data as { data?: { data?: unknown[], meta?: { totalPage?: number, total?: number } } } | undefined;
  const mosques = apiData?.data?.data || [];
  const meta = apiData?.data?.meta;
  const totalPages = meta?.totalPage || 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2c2416] mb-2">
              All Mosques
            </h1>
            <p className="text-gray-600">
              Discover and manage mosques in your community
              {meta && (
                <span className="text-[#8a7340] ml-1">
                  ({meta.total} total)
                </span>
              )}
            </p>
          </div>
          <Link href="/create-mosque">
            <Button className="bg-[#8a7340] hover:bg-[#7a6330] text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Mosque
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search mosques by name or address..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 h-12 bg-white border-gray-200 focus:border-[#c8a84b] focus:ring-[#c8a84b]/20"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-[#8a7340] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading mosques...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-xl border border-red-200">
            <p className="text-red-600 font-medium">
              Failed to load mosques. Please try again.
            </p>
          </div>
        ) : mosques.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No mosques found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {mosques.map((mosque: any) => (
                <MosqueCard key={mosque.id} mosque={mosque} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="border-[#c8a84b]/60 text-[#8a7340] hover:bg-[#fdf8ed]"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-[#8a7340] hover:bg-[#7a6330] text-white"
                          : "border-[#c8a84b]/60 text-[#8a7340] hover:bg-[#fdf8ed]"
                      }
                    >
                      {page}
                    </Button>
                  ),
                )}
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="border-[#c8a84b]/60 text-[#8a7340] hover:bg-[#fdf8ed]"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
