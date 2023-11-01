import { apiSlice } from "@/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: payload,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApiSlice;
