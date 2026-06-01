"use client"

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetSingleMusulliQuery, useCollectFeeMutation } from "@/redux/features/musulliSlice/musulliSlice";
import type { CollectFeePayload } from "@/types/musulliType";
import type { ApiError } from "@/types/errorType";
import {
  ArrowLeft,
  Phone,
  DollarSign,
  CheckCircle2,
  XCircle,
  Coins,
  Calendar,
  Save,
  Clock,
  FileText,
} from "lucide-react";

export default function MusulliPaymentsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: musulliData, isLoading: isLoadingMusulli, error: musulliError, refetch } = useGetSingleMusulliQuery(id);
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

  const formatMonthYear = (monthYear: string) => {
    const [year, month] = monthYear.split("-");
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
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
      await refetch();
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
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Musulli Info & Stats */}
          <div className="lg:col-span-1 space-y-8">
            {/* Musulli Info Card */}
            <Card className="border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed]">
              <CardHeader className="px-8 pt-8 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8a7340] to-[#c8a84b] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {musulli.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-[#2c2416] font-bold">
                      {musulli.name}
                    </CardTitle>
                    <p className="text-gray-500 text-lg flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {musulli.phone}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-[#e8d99a]">
                    <p className="text-gray-500 text-sm font-medium">Monthly Fee</p>
                    <p className="text-[#2c2416] text-xl font-bold">৳{musulli.monthlyFee}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-green-200">
                    <p className="text-gray-500 text-sm font-medium">Total Paid</p>
                    <p className="text-green-700 text-xl font-bold">৳{musulli.totalPaid}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-orange-200">
                    <p className="text-gray-500 text-sm font-medium">Due Amount</p>
                    <p className={`text-xl font-bold ${musulli.dueAmount > 0 ? "text-orange-700" : "text-green-700"}`}>
                      ৳{musulli.dueAmount}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-blue-200">
                    <p className="text-gray-500 text-sm font-medium">Paid Months</p>
                    <p className="text-blue-700 text-xl font-bold">
                      {musulli.paidMonths}/{musulli.totalMonths}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Due Months Card */}
            <Card className="border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed]">
              <CardHeader className="px-8 pt-8 pb-4">
                <CardTitle className="text-xl text-[#2c2416] font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Due Months ({musulli.dueMonths.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {musulli.dueMonths.length === 0 ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-600">All payments up to date!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {musulli.dueMonths.map((month, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span className="text-orange-800 font-medium">{formatMonthYear(month)}</span>
                        </div>
                        <span className="text-orange-600 font-bold">৳{musulli.monthlyFee}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Logs */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl shadow-[#8a7340]/5 rounded-2xl bg-gradient-to-br from-white to-[#fdf8ed] overflow-hidden">
              <CardHeader className="px-8 pt-8 pb-4">
                <CardTitle className="text-2xl text-[#2c2416] font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#8a7340]" />
                  Payment History ({musulli.paymentLogs.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {musulli.paymentLogs.length === 0 ? (
                  <div className="text-center py-10">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No payment records yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#fdf8ed] border-b border-[#e8d99a]">
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                            Paid Month
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                            Payment Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#7a6330] uppercase tracking-wider">
                            Note
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e8d99a]">
                        {[...musulli.paymentLogs].reverse().map((log) => (
                          <tr key={log.id} className="hover:bg-[#fdf8ed]/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-green-500" />
                                <span className="text-[#2c2416] font-medium">
                                  {formatMonthYear(log.paidMonth.split('T')[0])}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-green-700 font-bold text-lg">
                                ৳{log.amount}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-600">
                                {formatDate(log.paymentDate)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-500 text-sm">
                                {log.note || "-"}
                              </span>
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
