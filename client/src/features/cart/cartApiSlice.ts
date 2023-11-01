import { apiSlice } from "@/api/apiSlice";

const resource = "cart";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProductToCart: builder.mutation({
      query: (payload) => ({
        url: `${resource}/add`,
        method: "PUT",
        body: payload,
      }),
    }),
    removeProductFromCart: builder.mutation({
      query: (payload) => ({
        url: `${resource}/remove`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useAddProductToCartMutation, useRemoveProductFromCartMutation } =
  cartApiSlice;
