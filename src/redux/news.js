import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2" }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (name) =>
        `/everything?q=${name}&sortBy=popularity&apiKey=0702af4687e243808e5aa1b1181e2106&pageSize=5`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
