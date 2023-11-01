/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { AuthState } from "@/types/auth";
import { setAccessToken, logout } from "@/features/auth/authSlice";

const baseUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const authState = getState() as AuthState;
    const accessToken = authState.auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult: any = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      api.dispatch(setAccessToken({ ...refreshResult.data.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      window.location.href = "/auth/sign-in";
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
