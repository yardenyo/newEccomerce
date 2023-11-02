/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { AuthState } from "@/types/auth";
import { setAccessToken, logout } from "@/features/auth/authSlice";
import { Mutex } from "async-mutex";

const baseUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api";
const mutex = new Mutex();

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

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult: any = await baseQuery(
          "/auth/refresh-token",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(setAccessToken({ ...refreshResult.data.data }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          window.location.href = "/auth/sign-in";
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
