/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from '../apiSlice/apiSlice';
import type { 
  Musulli, 
  CreateMusulliPayload,
  UpdateMusulliPayload,
  CreateMonthlyPaymentPayload,
  CollectFeePayload
} from '@/types/musulliType';

interface GetMusullisResponse {
  success: boolean;
  message: string;
  data: Musulli[];
}

export const musulliApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMusulli: builder.mutation({
      query: (payload: CreateMusulliPayload) => ({
        url: '/musullis',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Musulli'],
    }),

    getMusullis: builder.query<GetMusullisResponse, void>({
      query: () => ({
        url: '/musullis',
        method: 'GET',
      }),
      providesTags: (result: any) =>
        result?.data
          ? [
            ...result.data.map(({ id }: { id: string }) => ({ type: 'Musulli' as const, id })),
            { type: 'Musulli', id: 'LIST' },
          ]
          : [{ type: 'Musulli', id: 'LIST' }],
    }),

    getSingleMusulli: builder.query({
      query: (id: string) => ({
        url: `/musullis/${id}`,
        method: 'GET',
      }),
      providesTags: (result: any, error: any, id: string) => [{ type: 'Musulli', id }],
    }),

    updateMusulli: builder.mutation({
      query: ({ id, ...payload }: { id: string } & UpdateMusulliPayload) => ({
        url: `/musullis/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: (result: any, error: any, { id }: any) => [
        { type: 'Musulli', id },
        { type: 'Musulli', id: 'LIST' },
      ],
    }),

    createMonthlyPayment: builder.mutation({
      query: ({ musulliId, ...payload }: { musulliId: string } & CreateMonthlyPaymentPayload) => ({
        url: `/musullis/${musulliId}/monthly-payment`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (result: any, error: any, { musulliId }: any) => [
        { type: 'Musulli', id: musulliId },
        { type: 'Musulli', id: 'LIST' },
      ],
    }),

    getMusulliPaymentSummary: builder.query({
      query: (musulliId: string) => ({
        url: `/musullis/${musulliId}/payment-summary`,
        method: 'GET',
      }),
      providesTags: (result: any, error: any, musulliId: string) => [{ type: 'Musulli', id: musulliId }],
    }),

    getMosquePaymentStats: builder.query({
      query: () => ({
        url: '/musullis/stats',
        method: 'GET',
      }),
      providesTags: [{ type: 'Musulli', id: 'LIST' }],
    }),

    collectFee: builder.mutation({
      query: (payload: CollectFeePayload) => ({
        url: '/payments/collect',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Musulli'],
    }),

    getPaymentLogs: builder.query({
      query: () => ({
        url: '/paymentLogs',
        method: 'GET',
      }),
      providesTags: [{ type: 'Musulli', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateMusulliMutation,
  useGetMusullisQuery,
  useGetSingleMusulliQuery,
  useUpdateMusulliMutation,
  useCreateMonthlyPaymentMutation,
  useGetMusulliPaymentSummaryQuery,
  useGetMosquePaymentStatsQuery,
  useCollectFeeMutation,
  useGetPaymentLogsQuery,
} = musulliApi;
