import { apiSlice } from "@/api/apiSlice";

const resource = "categories";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (payload) => ({
        url: `/${resource}`,
        method: "POST",
        body: payload,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApiSlice;
