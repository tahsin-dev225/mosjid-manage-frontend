/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from '../apiSlice/apiSlice';

interface Mosque {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  address: string;
  phone?: string | null;
  logo?: string | null;
  createdAt: string;
  updatedAt: string;
  prayerTime?: any;
  _count?: { musullis: number };
}

interface GetAllMosquesResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: Mosque[];
  };
}

interface CreateMosquePayload {
  name: string;
  slug: string;
  address: string;
  phone?: string;
  logo?: string;
}

export const mosqueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createMosque: builder.mutation({
      query: (payload: CreateMosquePayload) => ({
        url: '/mosques',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Mosque', 'User'],
    }),

    getMyMosque: builder.query<Mosque, void>({
      query: () => ({
        url: '/mosques/my-mosque',
        method: 'GET',
      }),
      providesTags: ['Mosque'],
    }),

    getAllMosques: builder.query({
      query: (params: any) => {
        const queryParams = new (URLSearchParams as any)();
        if (params?.search) queryParams.append('search', params.search);
        if (params?.page) queryParams.append('page', params.page.toString());
        
        return {
          url: `/mosques?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Mosque'],
    }),

    updatePrayerTimes: builder.mutation({
      query: (payload: any) => ({
        url: '/mosques/prayer-times',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Mosque'],
    }),
  }),
});

export const {
  useCreateMosqueMutation,
  useGetMyMosqueQuery,
  useGetAllMosquesQuery,
  useUpdatePrayerTimesMutation,
} = mosqueApi;
