import { apiSlice } from "@/api/apiSlice";

const resource = "products";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (payload) => ({
        url: `/${resource}`,
        method: "POST",
        body: payload,
      }),
      keepUnusedDataFor: 5,
    }),
    addToCart: builder.mutation({
      query: (payload) => ({
        url: `${resource}/cart`,
        method: "PUT",
        body: payload,
      }),
    }),
    addToWishlist: builder.mutation({
      query: (payload) => ({
        url: `${resource}/wishlist`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddToCartMutation,
  useAddToWishlistMutation,
} = productsApiSlice;
