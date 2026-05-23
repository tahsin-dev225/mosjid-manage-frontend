
import { baseApi } from '../apiSlice/apiSlice';

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    collectFee: builder.mutation({
      query: (payload: any) => ({
        url: '/transactions/collect',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Transaction', 'Musulli'],
    }),

    getTransactions: builder.query({
      query: () => ({
        url: '/transactions',
        method: 'GET',
      }),
      providesTags: ['Transaction'],
    }),
  }),
});

export const {
  useCollectFeeMutation,
  useGetTransactionsQuery,
} = transactionApi;
