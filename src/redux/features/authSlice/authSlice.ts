/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../apiSlice/apiSlice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload: any) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    login: builder.mutation({
      query: (payload: any) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    getMe: builder.query<any, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
} = authApi;

