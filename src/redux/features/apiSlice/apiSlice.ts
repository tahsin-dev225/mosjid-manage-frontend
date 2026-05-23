import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
      // If storing token in localStorage, retrieve and append it here:
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Mosque', 'Musulli', 'Transaction'],
  endpoints: () => ({}),
});

export const { resetApiState } = baseApi.util;



// 7. Expected Request Payloads

// To guarantee successful backend validations (via Zod), supply payloads matching these formats:


// {
//   "musulliId": "musulli-uuid-string",
//   "month": 5, // (1 to 12)
//   "year": 2026,
//   "amount": 500, // Number >= 1
//   "paymentDate": "2026-05-20T16:00:00Z", // ISO Date String
//   "note": "Optional comment"
// }

// `createMusulli` Payload

// {
//   "name": "Musulli Name",
//   "phone": "01700000000",
//   "image": "https://example.com/avatar.jpg", // Optional URL
//   "monthlyFee": 500, // Number >= 0
//   "startMonth": 5, // (1 to 12)
//   "startYear": 2026,
//   "paidTillMonth": 5, // Optional (1 to 12)
//   "paidTillYear": 2026 // Optional
// }

// `updatePrayerTimes` Payload

// {
//   "fajr": "04:30 AM",
//   "zuhr": "01:30 PM",
//   "asr": "04:45 PM",
//   "maghrib": "06:40 PM",
//   "isha": "08:15 PM",
//   "jummah": "01:30 PM" // Optional
// }
