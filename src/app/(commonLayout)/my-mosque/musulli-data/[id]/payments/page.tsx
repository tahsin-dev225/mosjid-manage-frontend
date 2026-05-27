"use client"

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetSingleMusulliQuery, useCollectFeeMutation } from "@/redux/features/musulliSlice/musulliSlice";
import type { CollectFeePayload } from "@/types/musulliType";
import type { ApiError } from "@/types/errorType";
import {
  ArrowLeft,
  User,
  Phone,
  DollarSign,
  CheckCircle2,
  XCircle,
  Coins,
  Calendar,
  FileText,
  Save,
} from "lucide-react";

export default function MusulliPaymentsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: musulliData, isLoading: isLoadingMusulli, error: musulliError } = useGetSingleMusulliQuery(id);
  const [collectFee, { isLoading: isCollecting }] = useCollectFeeMutation();

  const [showCollectModal, setShowCollectModal] = useState(false);
  const [collectForm, setCollectForm] = useState<CollectFeePayload>({
    musulliId: id,
    amount: musulliData?.data?.monthlyFee || 0,
    paidMonth: new Date().toISOString().split('T')[0],
    note: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const musulli = musulliData?.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCollectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setCollectForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCollectFee = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await collectFee(collectForm).unwrap();
      setShowSuccess(true);
      setShowCollectModal(false);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: unknown) {
      const apiError = err as { data?: ApiError };
      setError(
        apiError.data?.message || "Failed to collect fee. Please try again.",
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

  if (musulliError || !musulli) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#2c2416] mb-2">Musulli Not Found</h2>
          <p className="text-gray-600 mb-6">
            The musulli you're trying to view doesn't exist or you don't have permission to access it.
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
    <div className="min-h-screen bg-[#f5f3ef] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/my-mosque/musulli-data">
              <Button variant="ghost" className="p-2 hover:bg-[#fdf8ed]">
                <ArrowLeft className="w-6 h-6 text-[#8a7340]" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-[#2c2416]">
                Payment Management
              </h1>
              <p className="text-gray-600 mt-2">Manage {musulli.name}'s payments</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setCollectForm({
                musulliId: id,
                amount: musulli.monthlyFee,
                paidMonth: new Date().toISOString().split('T')[0],
                note: "",
              });
              setShowCollectModal(true);
            }}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-5 shadow-xl shadow-green-500/25 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Coins className="w-5 h-5" />
            Collect Fee
          </Button>
        </div>

        {/* Success Banner */}
        {showSuccess && (
          <div className="mb-8 px-6 py-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-green-800 font-semibold text-lg">Fee collected successfully!</p>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-8 px-6 py-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 shadow-lg">
            <XCircle className="w-6 h-6 text-red-600" />
            <div>
              <p className="text-red-800 font-semibold text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Musulli Info Card */}
        <Card className="border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl mb-8 bg-gradient-to-br from-white to-[#fdf8ed]">
          <CardHeader className="px-8 pt-8 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8a7340] to-[#c8a84b] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {musulli.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-3xl text-[#2c2416] font-bold">
                  {musulli.name}
                </CardTitle>
                <p className="text-gray-500 text-lg flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {musulli.phone}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-xl border border-[#e8d99a] shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8a7340]/10 to-[#c8a84b]/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#8a7340]" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Monthly Fee</p>
                </div>
                <p className="text-[#2c2416] text-2xl font-bold">৳{musulli.monthlyFee}</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-green-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                    <Coins className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Total Paid</p>
                </div>
                <p className="text-green-700 text-2xl font-bold">৳{musulli.totalPaid}</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-orange-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Due Amount</p>
                </div>
                <p className={`text-2xl font-bold ${musulli.dueAmount > 0 ? "text-orange-700" : "text-green-700"}`}>
                  ৳{musulli.dueAmount}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Paid Months</p>
                </div>
                <p className="text-blue-700 text-2xl font-bold">
                  {musulli.paidMonths}/{musulli.totalMonths}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collect Fee Modal */}
        {showCollectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="border-none shadow-2xl rounded-2xl bg-white max-w-md w-full">
              <CardHeader className="px-8 pt-8 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-[#2c2416] font-bold flex items-center gap-2">
                    <Coins className="w-6 h-6 text-[#8a7340]" />
                    Collect Fee
                  </CardTitle>
                  <button
                    onClick={() => setShowCollectModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <form onSubmit={handleCollectFee}>
                <CardContent className="px-8 pb-8 space-y-5">
                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                      Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="amount"
                        value={collectForm.amount}
                        onChange={handleCollectChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
                      />
                    </div>
                  </div>

                  {/* Paid Month */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                      Paid Month
                    </label>
                    <input
                      type="date"
                      name="paidMonth"
                      value={collectForm.paidMonth}
                      onChange={handleCollectChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition"
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                      Note (Optional)
                    </label>
                    <textarea
                      name="note"
                      value={collectForm.note}
                      onChange={handleCollectChange}
                      rows={3}
                      placeholder="e.g. May monthly fee"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-[#2c2416] placeholder-gray-400 text-sm focus:outline-none focus:border-[#c8a84b] focus:ring-2 focus:ring-[#c8a84b]/20 transition resize-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowCollectModal(false)}
                      className="flex-1 py-3 hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isCollecting}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    >
                      {isCollecting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                          Collecting...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="w-4 h-4" />
                          Collect Fee
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
