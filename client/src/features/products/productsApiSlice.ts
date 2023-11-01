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
        url: `${resource}/wishlist/add`,
        method: "PUT",
        body: payload,
      }),
    }),
    removeFromWishlist: builder.mutation({
      query: (payload) => ({
        url: `${resource}/wishlist/remove`,
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
  useRemoveFromWishlistMutation,
} = productsApiSlice;
