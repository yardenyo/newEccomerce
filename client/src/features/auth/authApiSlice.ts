import { apiSlice } from "@/api/apiSlice";
import { User } from "@/types";
import { setUser } from "@/features/auth/authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/auth/get-user",
        method: "GET",
      }),
      transformResponse: (response: { data: { user: User } }) => {
        return response.data.user;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data }));
        } catch (err) {
          console.log({ err });
        }
      },
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,
  useGetUserQuery,
} = authApiSlice;
