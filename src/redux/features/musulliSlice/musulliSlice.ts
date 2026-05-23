/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from '../apiSlice/apiSlice';
import type { Musulli, CreateMusulliPayload } from '@/types/musulliType';

export const musulliApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    createMusulli: builder.mutation<{ success: boolean; message: string; data: Musulli }, CreateMusulliPayload>({
      query: (payload: CreateMusulliPayload) => ({
        url: '/musullis',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Musulli'],
    }),

    getMusullis: builder.query({
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
      query: ({ id, ...payload }: any) => ({
        url: `/musullis/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: (result: any, error: any, { id }: any) => [
        { type: 'Musulli', id },
        { type: 'Musulli', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateMusulliMutation,
  useGetMusullisQuery,
  useGetSingleMusulliQuery,
  useUpdateMusulliMutation,
} = musulliApi;
